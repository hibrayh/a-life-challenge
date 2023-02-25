import logging
import math
import creatures.genome
import creatures.decision_network
import registry
from enum import Enum
import creatures.creature
import resources
import topography
import random


logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


class EnvironmentInfo:
    def __init__(
            self,
            perceivableResources,
            perceivableCreatures,
            regionTopography,
            lightVisibility):
        self.perceivableResources = perceivableResources
        self.perceivableCreatures = perceivableCreatures
        self.regionTopography = regionTopography
        self.lightVisibility = lightVisibility


class Environment:
    def __init__(
            self,
            widthInPx,
            heightInPx,
            loadExistingSave=False,
            saveData=None):
        if not loadExistingSave:
            logging.info(
                f"Creating new environment of width {widthInPx} and height {heightInPx}")
            self.creatureRegistry = registry.Registry()
            self.resourceRegistry = []
            self.topographyRegistry = []
            self.lightVisibility = []
            self.width = widthInPx
            self.height = heightInPx
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
            self.topographyRegistry = []
            for topographyRegion in saveData['topographyRegistry']:
                topography.Topography(
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
                    saveData=topographyRegion)
            self.lightVisibility = []
            # Load dimensions
            self.width = saveData['width']
            self.height = saveData['height']

    def save(self):
        logging.info("Saving current state of the environment")

        resourceList = []
        for resource in self.resourceRegistry:
            resourceList.append(resource.save())

        topographyList = []
        for topography in self.topographyRegistry:
            topographyList.append(topography.save())

        return {
            'resourceRegistry': resourceList,
            'topographyRegistry': topographyList,
            'width': self.width,
            'height': self.height,
        }

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
        self.topographyRegistry.append(newTopography)

    def removeFromTopographyRegistry(self, topographyToRemove):
        logging.info(
            f"Removing topography with id {topographyToRemove.id} from the environment")
        self.topographyRegistry.remove(topographyToRemove)

    def _getVisionPerceivableCreatures(
            self, creatureOfInterest, perceivableCreatures):
        radiusOfSightPerception = int(
            creatureOfInterest.genome.sightRange * 200)

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
            creatureOfInterest.genome.smellRange * 200)

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
            creatureOfInterest.genome.hearingRange * 200)

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
        radiusOfSightPerception = int(
            creatureOfInterest.genome.sightRange * 200)

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
            creatureOfInterest.genome.smellRange * 200)

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
            creatureOfInterest.genome.hearingRange * 200)

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

        return EnvironmentInfo(
            perceivableResources,
            perceivableCreatures,
            [],
            [])

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

        for topography in self.topographyRegistry:
            topographyList.append(topography.serialize())

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
