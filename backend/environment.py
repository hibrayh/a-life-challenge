import logging
import math
import creatures.genome
from enum import Enum
import creatures.creature
import random


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


class Food:
    def __init__(self,
                 name,
                 energyReplenishment,
                 rarity,
                 shape,
                 color,
                 xCoordinate,
                 yCoordinate):
        logging.info("Creating food object")
        self.name = name
        self.energyReplenishment = energyReplenishment
        self.rarity = rarity
        self.shape = shape
        self.color = color
        self.xCoordinate = xCoordinate
        self.yCoordinate = yCoordinate


class Environment:
    def __init__(self):
        logging.info("Creating new environment")
        self.creatureRegistry = []
        self.foodRegistry = []
        self.topographyRegistry = []
        self.lightVisibility = []

    def addFoodToEnvironment(self, newFood):
        logging.info(
            f"Registering {newFood.name} to the environment")
        return self.foodRegistry.append(newFood)

    def addTopographyToEnvironment(self, newTopography):
        logging.info(
            f"Registering {newTopography} as a region in the environment")
        return self.topographyRegistry.append(newTopography)

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

    def getTopographyRegistry(self):
        return self.topographyRegistry

    def getFoodRegistry(self):
        return self.foodRegistry


# Defining coordinates for hard coded food types
xGrass = random.randint(0, 800)
yGrass = random.randint(0, 600)
xBerries = 100
yBerries = 50
xFish = 50
yFish = 550

# Defining the food types based on their tuple attributes
grass = ("Grass", 1, "Very Common", "Square", "Green", xGrass, yGrass)
berries = ("Berries", 5, "Common", "Circle", "Red", 100, 50)
fish = ("Fish", 25, "Rare", "Circle", "Blue", 50, 550)

# Creating instances of the Food class using the tuple attributes
grass = Food(*grass)
berries = Food(*berries)
fish = Food(*fish)

# Create instance of Environment class and add food types to foodRegistry list
myEnv = Environment()
myEnv.addFoodToEnvironment(grass)
myEnv.addFoodToEnvironment(berries)
myEnv.addFoodToEnvironment(fish)

# Example output of the food type object's attributes
print("Food Registry: \n", myEnv.getFoodRegistry())
for i in myEnv.foodRegistry:
    print(f"Food Name: {i.name}")
    print(f"Replenishment Factor: {i.energyReplenishment}")
    print(f"X Coord: {i.xCoordinate}")
    print(f"Y Coord: {i.yCoordinate}")
    print(f"Rarity: {i.rarity}")
