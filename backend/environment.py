import logging
import math
import creatures.genome
import creatures.decision_network
import creatures.species_manager
import registry
from enum import Enum
import creatures.creature
import resources
import topography
import random
import datetime
import copy


logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


UNIT = 20


class EnvironmentInfo:
    def __init__(
            self,
            perceivableResources,
            perceivableMates,
            perceivablePredators,
            perceivablePrey,
            perceivableCompetitors,
            perceivableAllies,
            perceivableDefenders,
            perceivableDefendees,
            perceivableParasites,
            perceivableHosts,
            perceivableNurturers,
            perceivableNurturees,
            regionTopography,
            lightVisibility):
        self.perceivableResources = perceivableResources
        self.perceivableMates = perceivableMates
        self.perceivablePredators = perceivablePredators
        self.perceivablePrey = perceivablePrey
        self.perceivableCompetitors = perceivableCompetitors
        self.perceivableAllies = perceivableAllies
        self.perceivableDefenders = perceivableDefenders
        self.perceivableDefendees = perceivableDefendees
        self.perceivableParasites = perceivableParasites
        self.perceivableHosts = perceivableHosts
        self.perceivableNurturers = perceivableNurturers
        self.perceivableNurturees = perceivableNurturees
        self.regionTopography = regionTopography
        self.lightVisibility = lightVisibility


class Environment:
    def __init__(
            self,
            widthInPx,
            heightInPx,
            columnCount,
            rowCount,
            loadExistingSave=False,
            saveData=None):
        if not loadExistingSave:
            logging.info(
                f"Creating new environment of width {widthInPx} and height {heightInPx}")
            self.creatureRegistry = registry.Registry()
            self.resourceRegistry = []

            self.topographyRegistry = []
            for row in range(rowCount):
                rowList = []
                for column in range(columnCount):
                    topographyId = f"topography_column{column}_row{row}"
                    rowList.append(
                        topography.Topography(
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            topographyId,
                            column,
                            row,
                            topography.TemplateTopography.UNSELECTED,
                            self))
                self.topographyRegistry.append(rowList)

            self.lightVisibility = 1.0
            self.width = widthInPx
            self.height = heightInPx
            self.columnCount = columnCount
            self.rowCount = rowCount
            self.timeOfSimulation = 201
            self.daysElapsed = 0
        else:
            logging.info("Loading existing environment")
            self.creatureRegistry = registry.Registry()
            # Load resources
            self.resourceRegistry = []
            for resource in saveData['resourceRegistry']:
                resources.Resource(
                    resource['id'],
                    resource['replenishment'],
                    resource['xCoordinate'],
                    resource['yCoordinate'],
                    resource['color'],
                    resource['shape'],
                    self)
            # Load topography
            currentIndex = 0
            self.topographyRegistry = []
            for row in range(saveData['rowCount']):
                topographyRow = []
                for column in range(saveData['columnCount']):
                    topographyRow.append(topography.Topography(
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        self,
                        loadExistingSave=True,
                        saveData=saveData['topographyRegistry'][currentIndex]))
                    currentIndex += 1
                self.topographyRegistry.append(topographyRow)

            self.lightVisibility = []
            # Load dimensions
            self.width = saveData['width']
            self.height = saveData['height']
            self.columnCount = saveData['columnCount']
            self.rowCount = saveData['rowCount']
            self.timeOfSimulation = saveData['timeOfSimulation']
            self.daysElapsed = saveData['daysElapsed']

    def save(self):
        logging.info("Saving current state of the environment")

        resourceList = []
        for resource in self.resourceRegistry:
            resourceList.append(resource.save())

        topographyList = []
        for topographyRow in self.topographyRegistry:
            for topography in topographyRow:
                topographyList.append(topography.save())

        return {
            'resourceRegistry': resourceList,
            'topographyRegistry': topographyList,
            'width': self.width,
            'height': self.height,
            'columnCount': self.columnCount,
            'rowCount': self.rowCount,
            'timeOfSimulation': self.timeOfSimulation,
            'daysElapsed': self.daysElapsed,
        }

    def resize(self, newWidth, newHeight, scalingFactors):
        self.width = newWidth
        self.height = newHeight

        for creature in self.creatureRegistry.registry:
            creature.xCoordinate = creature.xCoordinate * scalingFactors[0]
            creature.yCoordinate = creature.yCoordinate * scalingFactors[1]

        for resource in self.resourceRegistry:
            resource.xCoordinate = resource.xCoordinate * scalingFactors[0]
            resource.yCoordinate = resource.yCoordinate * scalingFactors[1]

    def addToCreatureRegistry(self, newCreature):
        logging.info(
            f"Registering new creature with id: {newCreature.id} to the environment")
        self.creatureRegistry.registerNewCreature(newCreature)

    def removeFromCreatureRegistry(self, creature):
        logging.info(
            f"Removing creature with id: {creature.id} from the environment")
        self.creatureRegistry.unregisterCreature(creature)

    def addToResourceRegistry(self, newResource):
        logging.info(
            f"Adding new resource with id {newResource.id} to the environment")
        self.resourceRegistry.append(newResource)

    def removeFromResourceRegistry(self, resourceToRemove):
        logging.info(
            f"Removing depleted resource with id {resourceToRemove.id} from the environment")
        self.resourceRegistry.remove(resourceToRemove)

    def addToTopographyRegistry(self, newTopography):
        logging.info(
            f"Adding new topography with id {newTopography.id} to the environment")
        # self.topographyRegistry.append(newTopography)

        self.topographyRegistry[newTopography.row][newTopography.column] = newTopography

    def removeFromTopographyRegistry(self, topographyToRemove):
        logging.info(
            f"Removing topography with id {topographyToRemove.id} from the environment")
        self.topographyRegistry.remove(topographyToRemove)

    def removeTopography(self, column, row):
        logging.info(f"Removing topography from column: {column}, row: {row}")
        self.topographyRegistry[column][row] = topography.Topography(
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            None,
            column,
            row,
            topography.TemplateTopography.UNSELECTED,
            self)

    def _getVisionPerceivableCreatures(
            self, creatureOfInterest, perceivableCreatures):
        # Multiplying by lightVisibility to get the creatures VISION based on
        # time of day)
        radiusOfSightPerception = int(
            creatureOfInterest.genome.sightRange * (10 * UNIT))

        for creature in self.creatureRegistry.registry:
            distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                   creatureOfInterest.xCoordinate) ** 2) +
                                              (abs(creature.yCoordinate -
                                                   creatureOfInterest.yCoordinate) ** 2)))

            if ((distanceFromCreature <= radiusOfSightPerception and creature != creatureOfInterest) and (
                    creatureOfInterest.genome.sightAbility >= (1 - creature.genome.visibility))
                    and (creature not in perceivableCreatures)):

                logging.info(
                    f"{creature.id} within the {radiusOfSightPerception} sight range of {creatureOfInterest.id}")
                perceivableCreatures.append(creature)

    def _getSmellPerceivableCreatures(
            self,
            creatureOfInterest,
            perceivableCreatures):
        radiusOfSmellPerception = int(
            creatureOfInterest.genome.smellRange * (10 * UNIT))

        for creature in self.creatureRegistry.registry:
            distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                   creatureOfInterest.xCoordinate) ** 2) +
                                              (abs(creature.yCoordinate -
                                                   creatureOfInterest.yCoordinate) ** 2)))

            if ((distanceFromCreature <= radiusOfSmellPerception and creature != creatureOfInterest)
                and (creatureOfInterest.genome.smellAbility >= (1 - creature.genome.scent))
                    and (creature not in perceivableCreatures)):

                logging.info(
                    f"{creature.id} within the {radiusOfSmellPerception} smell range of {creatureOfInterest.id}")
                perceivableCreatures.append(creature)

    def _getAuditoryPerceivableCreatures(
            self, creatureOfInterest, perceivableCreatures):
        radiusOfHearingPerception = int(
            creatureOfInterest.genome.hearingRange * (10 * UNIT))

        for creature in self.creatureRegistry.registry:
            distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                   creatureOfInterest.xCoordinate) ** 2) +
                                              (abs(creature.yCoordinate -
                                                   creatureOfInterest.yCoordinate) ** 2)))

            if ((distanceFromCreature <= radiusOfHearingPerception and creature != creatureOfInterest)
                and (creatureOfInterest.genome.hearingAbility >= creature.genome.stealth)
                    and (creature not in perceivableCreatures)):

                logging.info(
                    f"{creature.id} within the {radiusOfHearingPerception} hearing range of {creatureOfInterest.id}")
                perceivableCreatures.append(creature)

    def _getVisionPerceivableResources(
            self, creatureOfInterest, perceivableResources):
        # Multiplying by lightVisibility to get the creatures VISION based on
        # time of day
        radiusOfSightPerception = int(
            creatureOfInterest.genome.sightRange * (10 * UNIT))

        for resource in self.resourceRegistry:
            distanceFromCreature = (math.sqrt((abs(resource.xCoordinate -
                                                   creatureOfInterest.xCoordinate) ** 2) +
                                              (abs(resource.yCoordinate -
                                                   creatureOfInterest.yCoordinate) ** 2)))

            if (distanceFromCreature <= radiusOfSightPerception) and (
                    resource not in perceivableResources):
                logging.info(
                    f"{resource.id} within the {radiusOfSightPerception} sight range of {creatureOfInterest.id}")
            perceivableResources.append(resource)

    def _getSmellPerceivableResources(
            self,
            creatureOfInterest,
            perceivableResources):
        radiusOfSmellPerception = int(
            creatureOfInterest.genome.smellRange * (10 * UNIT))

        for resource in self.resourceRegistry:
            distanceFromCreature = (math.sqrt((abs(resource.xCoordinate -
                                                   creatureOfInterest.xCoordinate) ** 2) +
                                              (abs(resource.yCoordinate -
                                                   creatureOfInterest.yCoordinate) ** 2)))

            if (distanceFromCreature <= radiusOfSmellPerception) and (
                    resource not in perceivableResources):
                logging.info(
                    f"{resource.id} within the {radiusOfSmellPerception} smell range of {creatureOfInterest.id}")
            perceivableResources.append(resource)

    def _getAuditoryPerceivableResources(
            self, creatureOfInterest, perceivableResources):
        radiusOfHearingPerception = int(
            creatureOfInterest.genome.hearingRange * (10 * UNIT))

        for resource in self.resourceRegistry:
            distanceFromCreature = (math.sqrt((abs(resource.xCoordinate -
                                                   creatureOfInterest.xCoordinate) ** 2) +
                                              (abs(resource.yCoordinate -
                                                   creatureOfInterest.yCoordinate) ** 2)))

            if (distanceFromCreature <= radiusOfHearingPerception) and (
                    resource not in perceivableResources):
                logging.info(
                    f"{resource.id} within the {radiusOfHearingPerception} smell range of {creatureOfInterest.id}")
            perceivableResources.append(resource)

    def returnCreaturesPerceivableEnvironment(self, creatureOfInterest):
        logging.info(
            f"Fetching perceivable environment for {creatureOfInterest.id}")
        perceivableResources = []
        perceivableCreatures = []
        lightVisibility = self.getLightVisibility()

        if creatures.genome.Receptors.VISION in creatureOfInterest.genome.receptors:
            self._getVisionPerceivableCreatures(
                creatureOfInterest, perceivableCreatures)
            self._getVisionPerceivableResources(
                creatureOfInterest, perceivableResources)

        if creatures.genome.Receptors.SMELL in creatureOfInterest.genome.receptors:
            self._getSmellPerceivableCreatures(
                creatureOfInterest, perceivableCreatures)
            self._getSmellPerceivableResources(
                creatureOfInterest, perceivableResources)

        if creatures.genome.Receptors.HEAR in creatureOfInterest.genome.receptors:
            self._getAuditoryPerceivableCreatures(
                creatureOfInterest, perceivableCreatures)
            self._getAuditoryPerceivableResources(
                creatureOfInterest, perceivableResources)

        # Filter the info
        perceivableMates = []
        perceivablePredators = []
        perceivablePrey = []
        perceivableCompetitors = []
        perceivableAllies = []
        perceivableDefenders = []
        perceivableDefendees = []
        perceivableParasites = []
        perceivableHosts = []
        perceivableNurturers = []
        perceivableNurturees = []

        for creature in perceivableCreatures:
            if (creatureOfInterest.species == creature.species) \
                    and (creature.canReproduce()):
                perceivableMates.append(creature)
            elif (creatureOfInterest.species == creature.species):
                perceivableAllies.append(creature)
            else:
                relationship = creatureOfInterest.speciesRelationship(
                    creature.species)

                if relationship == creatures.species_manager.SpeciesRelationship.IS_HUNTED_BY:
                    perceivablePredators.append(creature)
                elif relationship == creatures.species_manager.SpeciesRelationship.HUNTS:
                    perceivablePrey.append(creature)
                elif relationship == creatures.species_manager.SpeciesRelationship.COMPETES_WITH:
                    perceivableCompetitors.append(creature)
                elif relationship == creatures.species_manager.SpeciesRelationship.DEFENDED_BY:
                    perceivableDefenders.append(creature)
                elif relationship == creatures.species_manager.SpeciesRelationship.PROTECTS:
                    perceivableDefendees.append(creature)
                elif relationship == creatures.species_manager.SpeciesRelationship.LEECHED_OFF_OF:
                    perceivableParasites.append(creature)
                elif relationship == creatures.species_manager.SpeciesRelationship.LEECHES:
                    perceivableHosts.append(creature)
                elif relationship == creatures.species_manager.SpeciesRelationship.NURTURED_BY:
                    perceivableNurturers.append(creature)
                elif relationship == creatures.species_manager.SpeciesRelationship.NURTURES:
                    perceivableNurturees.append(creature)

        return EnvironmentInfo(
            perceivableResources,
            perceivableMates,
            perceivablePredators,
            perceivablePrey,
            perceivableCompetitors,
            perceivableAllies,
            perceivableDefenders,
            perceivableDefendees,
            perceivableParasites,
            perceivableHosts,
            perceivableNurturers,
            perceivableNurturees,
            [],
            []
        )

    def getRegisteredCreatures(self):
        creatureList = []

        for creature in self.creatureRegistry.registry:
            creatureList.append(creature.serialize())

        return creatureList

    def getRegisteredResources(self):
        resourceList = []

        for resource in self.resourceRegistry:
            resourceList.append(resource.serialize())

        return resourceList

    def getRegisteredTopography(self):
        topographyList = []

        for row in range(self.rowCount):
            for column in range(self.columnCount):
                topographyList.append(
                    self.topographyRegistry[row][column].serialize())

        return topographyList

    def simulateCreatureBehavior(self):
        logging.info("Removing dead creatures from environment")
        for creature in self.creatureRegistry.registry:
            if creature.lastAction is creatures.decision_network.CreatureAction.DEAD:
                self.creatureRegistry.unregisterDeadCreature(creature)

        # Mark each creature to indicate that they have not performed an action
        # this turn
        for creature in self.creatureRegistry.registry:
            if creature.hasPerformedActionThisTurn:
                creature.hasPerformedActionThisTurn = False
            creature.hasPerformedActionThisTurn = False

        # Go through each creature, in order of reaction time, and let them
        # decide and perform their actions
        logging.info("Simulating all creature actions")
        for creature in self.creatureRegistry.registry:
            if not creature.hasPerformedActionThisTurn:
                creature.performAction()

        # Increment the simulation time by one tick to track simulation time in
        # ticks per second
        self.timeOfSimulation += 1

        # Check if 300 ticks have elapsed and increment daysElapsed in the
        # simulation if so
        if self.timeOfSimulation % 500 == 0:
            self.daysElapsed += 1

    def simulateCreatureBehaviorByNTicks(self, n):
        logging.info("Removing dead creatures from environment")
        for creature in self.creatureRegistry.registry:
            if creature.lastAction is creatures.decision_network.CreatureAction.DEAD:
                self.creatureRegistry.unregisterDeadCreature(creature)

        for i in range(n):
            # Mark each creature to indicate that they have not performed an action
            # this turn
            for creature in self.creatureRegistry.registry:
                if creature.hasPerformedActionThisTurn:
                    creature.hasPerformedActionThisTurn = False
                creature.hasPerformedActionThisTurn = False

            # Go through each creature, in order of reaction time, and let them
            # decide and perform their actions
            logging.info("Simulating all creature actions")
            for creature in self.creatureRegistry.registry:
                if not creature.hasPerformedActionThisTurn:
                    creature.performAction()

            # Increment the simulation time by one tick to track simulation time in
            # ticks per second
            self.timeOfSimulation += 1

            # Check if 300 ticks have elapsed and increment daysElapsed in the
            # simulation if so
            if self.timeOfSimulation % 500 == 0:
                self.daysElapsed += 1

    def getTimeOfSimulation(self):
        # A day cycle is currently set to 500, so once ticks reach 500, a new
        # day starts
        elapsedTicks = self.timeOfSimulation % 500
        if elapsedTicks < 30:
            timeOfSimulation = 'midnight'
        elif elapsedTicks < 60:
            timeOfSimulation = 'dawn'
        elif elapsedTicks < 130:
            timeOfSimulation = 'early morning'
        elif elapsedTicks < 200:
            timeOfSimulation = 'late morning'
        elif elapsedTicks < 270:
            timeOfSimulation = 'noon'
        elif elapsedTicks < 340:
            timeOfSimulation = 'afternoon'
        elif elapsedTicks < 410:
            timeOfSimulation = 'evening'
        elif elapsedTicks < 440:
            timeOfSimulation = 'dusk'
        else:
            timeOfSimulation = 'midnight'
        return f"{timeOfSimulation}, {elapsedTicks} ticks elapsed, {self.daysElapsed} days elapsed"

    def getLightVisibility(self):
        elapsedTicks = self.timeOfSimulation % 500
        if elapsedTicks < 30:           # Ticks 0-30, Midnight (early)
            self.lightVisibility = 0.2
        elif elapsedTicks < 60:         # Ticks 30-59, Dawn
            self.lightVisibility = 0.3
        elif elapsedTicks < 130:        # Ticks 60-129, Early Morning
            self.lightVisibility = 0.5
        elif elapsedTicks < 200:        # Ticks 130-199, Late Morning
            self.lightVisibility = 0.8
        elif elapsedTicks < 270:        # Ticks 200-269, Noon
            self.lightVisibility = 1.0
        elif elapsedTicks < 340:        # Ticks 270-339, Afternoon
            self.lightVisibility = 0.8
        elif elapsedTicks < 410:        # Ticks 340-409, Evening
            self.lightVisibility = 0.5
        elif elapsedTicks < 440:        # Ticks 410-439, Dusk
            self.lightVisibility = 0.3
        else:                           # Ticks 440-500, Midnight
            self.lightVisibility = 0.2
        return self.lightVisibility
