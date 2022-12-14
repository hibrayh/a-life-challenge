import logging
import math
import creatures.genome
from enum import Enum
import creatures.creature


logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


class EnvironmentInfo:
    def __init__(
            self,
            perceivableFood,
            perceivableCreatures,
            regionTopography,
            lightVisibility):
        self.perceivableFood = perceivableFood
        self.perceivableCreatures = perceivableCreatures
        self.regionTopography = regionTopography
        self.lightVisibility = lightVisibility


class Regions(Enum):
    GRASSLANDS = 1
    FOREST = 2
    MOUNTAINS = 3
    DESERT = 4


class Environment:
    def __init__(self):
        logging.info("Creating new environment")
        self.creatureRegistry = []
        self.foodRegistry = []
        self.topographyRegistry = []
        self.lightVisibility = []

    """
    def displayEnvironment():
        #logging.info("Creating new environment")
        creatureRegistry = []
        foodRegistry = []
        topographyRegistry = ['Grasslands']
        lightVisibility = True
        return (
            f"Creatures: {creatureRegistry} Food Available: {foodRegistry} Topography: {topographyRegistry}  Contains Light: {lightVisibility}")
    """

    def addTopographyToEnvironment(self, topography):
        logging.info(
            f"Registering {topography} as a region in the Environment")
        return self.topographyRegistry.append(topography)

    def addToCreatureRegistry(self, newCreature):
        logging.info(
            f"Registering new creature with id: {newCreature.id} to the environment")
        self.creatureRegistry.append(newCreature)

    def removeFromCreatureRegistry(self, deadCreature):
        logging.info(
            f"Removing dead creature with id: {deadCreature.id} from the environment")
        self.creatureRegistry.remove(deadCreature)

    def returnCreaturesPerceivableEnvironment(self, creatureOfInterest):
        logging.info(
            f"Fetching perceivable environment for {creatureOfInterest.id}")
        perceivableFood = []
        perceivableCreatures = []

        if creatures.genome.Receptors.VISION in creatureOfInterest.genome.receptors:
            radiusOfSightPerception = int(
                creatureOfInterest.genome.sightRange * 100)

            for creature in self.creatureRegistry:
                distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                       creatureOfInterest.xCoordinate) ** 2) +
                                                  (abs(creature.yCoordinate -
                                                       creatureOfInterest.yCoordinate) ** 2)))

                if ((distanceFromCreature <= radiusOfSightPerception and distanceFromCreature > 0) and (
                        creatureOfInterest.genome.sightAbility >= (1 - creature.genome.visibility))):

                    logging.info(
                        f"{creature.id} within the {radiusOfSightPerception} sight range of {creatureOfInterest.id}")
                    perceivableCreatures.append(creature)

        if creatures.genome.Receptors.SMELL in creatureOfInterest.genome.receptors:
            radiusOfSmellPerception = int(
                creatureOfInterest.genome.smellRange * 100)

            for creature in self.creatureRegistry:
                distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                       creatureOfInterest.xCoordinate) ** 2) +
                                                  (abs(creature.yCoordinate -
                                                       creatureOfInterest.yCoordinate) ** 2)))

                if ((distanceFromCreature <= radiusOfSmellPerception and distanceFromCreature > 0)
                    and (creatureOfInterest.genome.smellAbility >= (1 - creature.genome.scent))
                        and (creature not in perceivableCreatures)):

                    logging.info(
                        f"{creature.id} within the {radiusOfSmellPerception} smell range of {creatureOfInterest.id}")
                    perceivableCreatures.append(creature)

        if creatures.genome.Receptors.HEAR in creatureOfInterest.genome.receptors:
            radiusOfHearingPerception = int(
                1 * (creatureOfInterest.genome.hearingRange * 100))

            for creature in self.creatureRegistry:
                distanceFromCreature = int(
                    creatureOfInterest.genome.hearingAbility * 100)

                if ((distanceFromCreature <= radiusOfHearingPerception and distanceFromCreature > 0)
                    and (creatureOfInterest.genome.hearingAbility >= creature.genome.stealth)
                        and (creature not in perceivableCreatures)):

                    logging.info(
                        f"{creature.id} within the {radiusOfHearingPerception} hearing range of {creatureOfInterest.id}")
                    perceivableCreatures.append(creature)

        return EnvironmentInfo([], perceivableCreatures, [], [])

    def getRegisteredCreatures(self):
        creatureList = []

        for creature in self.creatureRegistry:
            creatureList.append(creature.serialize())

        return {
            "creatureRegistry": creatureList
        }

    def getTopographies(self):
        return self.topographyRegistry


""" Uncomment to see return data of displayEnvironment, addTopographyToEnvironment,
    and getRegisteredEnvironment funcitons
if __name__ == "__main__":
    Environment.displayEnvironment()
    a = Environment([], [], ['Grasslands'], True)
    a.addTopographyToEnvironment("Mountains")
    a.addTopographyToEnvironment("Forest")
    print(a.getRegisteredEnvironment())
"""
