import logging
import math
import creatures.genome
import creatures.decision_network
import registry
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
        logging.info("Creating a new food resource")
        self.name = name
        self.energyReplenishment = energyReplenishment
        self.rarity = rarity
        self.shape = shape
        self.color = color
        self.xCoordinate = xCoordinate
        self.yCoordinate = yCoordinate

    # This is similar to serialize function in creatures file.
    # I assume that the foodRegistry will need to be displayed under
    # simulation info as well.
    def logFoodObject(self):
        return {
            'foodName': self.name,
            'energyReplenishment': self.energyReplenishment,
            'rarity': self.rarity,
            'shape': self.shape,
            'color': self.color,
            'locationX': self.xCoordinate,
            'locationY': self.yCoordinate,
        }


# The 3 hard coded food types to be displayed in the environment
grass = (
    "Grass",
    1,
    "Very Common",
    "Square",
    "Green",
    random.randint(
        0,
        50),
    random.randint(
        0,
        50))
berries = ("Berries", 5, "Common", "Circle", "Red", 100, 50)
fish = ("Fish", 25, "Rare", "Circle", "Blue", 50, 550)


class Environment:
    def __init__(self):
        logging.info("Creating new environment")
        self.creatureRegistry = registry.Registry()
        self.foodRegistry = []
        self.topographyRegistry = []
        self.lightVisibility = []

    def addToFoodRegistry(self, newFood):
        logging.info(
            f"Registering {newFood.name} to the environment")
        self.foodRegistry.append(newFood)

    def addToTopographyRegistry(self, newTopography):
        logging.info(
            f"Registering {newTopography} as a region in the environment")
        self.topographyRegistry.append(newTopography)

    def addToCreatureRegistry(self, newCreature):
        logging.info(
            f"Registering new creature with id: {newCreature.id} to the environment")
        self.creatureRegistry.registerNewCreature(newCreature)

    def removeFromCreatureRegistry(self, creature):
        logging.info(
            f"Removing creature with id: {creature.id} from the environment")
        self.creatureRegistry.unregisterCreature(creature)

    def returnCreaturesPerceivableEnvironment(self, creatureOfInterest):
        logging.info(
            f"Fetching perceivable environment for {creatureOfInterest.id}")
        perceivableFood = []
        perceivableCreatures = []

        if creatures.genome.Receptors.VISION in creatureOfInterest.genome.receptors:
            radiusOfSightPerception = int(
                creatureOfInterest.genome.sightRange * 100)

            for creature in self.creatureRegistry.registry:
                distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                       creatureOfInterest.xCoordinate) ** 2) +
                                                  (abs(creature.yCoordinate -
                                                       creatureOfInterest.yCoordinate) ** 2)))

                if ((distanceFromCreature <= radiusOfSightPerception and creature != creatureOfInterest) and (
                        creatureOfInterest.genome.sightAbility >= (1 - creature.genome.visibility))):

                    logging.info(
                        f"{creature.id} within the {radiusOfSightPerception} sight range of {creatureOfInterest.id}")
                    perceivableCreatures.append(creature)

            # Check if food is within the creature's sight range
            for food in self.foodRegistry:
                distanceFromFood = (math.sqrt((abs(food.xCoordinate -
                                                   creatureOfInterest.xCoordinate) ** 2) +
                                              (abs(food.yCoordinate -
                                                   creatureOfInterest.yCoordinate) ** 2)))
                if distanceFromFood <= radiusOfSightPerception:
                    logging.info(
                        f"Food within the {radiusOfSightPerception} sight range of {creatureOfInterest.id}")
                    perceivableFood.append(food)

        if creatures.genome.Receptors.SMELL in creatureOfInterest.genome.receptors:
            radiusOfSmellPerception = int(
                creatureOfInterest.genome.smellRange * 100)

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

            # Check if food is within the creature's smell range
            for food in self.foodRegistry:
                distanceFromFood = (math.sqrt((abs(food.xCoordinate -
                                                   creatureOfInterest.xCoordinate) ** 2) +
                                              (abs(food.yCoordinate -
                                                   creatureOfInterest.yCoordinate) ** 2)))

                if ((distanceFromFood <= radiusOfSmellPerception and distanceFromFood > 0) and
                        (creatureOfInterest.genome.smellAbility >= (1 - creature.genome.scent)) and
                        (food not in perceivableFood)):
                    logging.info(
                        f"{creature.id} within the {radiusOfSmellPerception} smell range of {creatureOfInterest.id}")
                    perceivableFood.append(food)

        if creatures.genome.Receptors.HEAR in creatureOfInterest.genome.receptors:
            radiusOfHearingPerception = int(
                1 * (creatureOfInterest.genome.hearingRange * 100))

            for creature in self.creatureRegistry.registry:
                distanceFromCreature = int(
                    creatureOfInterest.genome.hearingAbility * 100)

                if ((distanceFromCreature <= radiusOfHearingPerception and creature != creatureOfInterest)
                    and (creatureOfInterest.genome.hearingAbility >= creature.genome.stealth)
                        and (creature not in perceivableCreatures)):

                    logging.info(
                        f"{creature.id} within the {radiusOfHearingPerception} hearing range of {creatureOfInterest.id}")
                    perceivableCreatures.append(creature)

        return EnvironmentInfo(perceivableFood, perceivableCreatures, [], [])

    def getRegisteredCreatures(self):
        creatureList = []

        for creature in self.creatureRegistry.registry:
            creatureList.append(creature.serialize())

        return {
            "creatureRegistry": creatureList
        }

    # Displays each topography currently registered in the environment
    def getTopographyRegistry(self):
        return self.topographyRegistry

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

    # Displays each food object currently registered in the environment
    def simulateCreatureBehavior(self):
        logging.info("Removing dead creatures from environment")
        for creature in self.creatureRegistry.registry:
            if cfoodLisat = []

        for food ie.lastAction is creatures.decision_network.CreatureAction.DEAD:
                self.creatureRegistry:
            foodList.append(food.logFoodObject()).unregisterDeadCreature(creature)

        return {
            "foodRegistry": foodList
        }
        # Mark each creature to indicate that they have not performed an action
        # this turn
        for creature in self.creatureRegistry.registry:
            creature.hasPerformedActionThisTurn = False
    
    # Gets x and y coordinates of each food object in the environment and stores in a list

    # Gets x and y coordinates of each food object in the environment and
    # stores in a list
    def getFoodLocations(self):
        foodLocations = []
        for food in self.foodRegistry:
            foodLocations.append((food.xCoordinate, food.yCoordinate))
        return foodLocations


"""
# Creating instances of the Food class using the tuple attributes
grass = Food(*grass)
berries = Food(*berries)
fish = Food(*fish)

myEnv = Environment()
# Create instance of Environment class and add food types to foodRegistry list
# Test to see if food types are added into registry
myEnv.addToFoodRegistry(grass)
myEnv.addToFoodRegistry(fish)
myEnv.addToFoodRegistry(berries)

print(myEnv.getFoodRegistry())
print("Food locations: ", myEnv.getFoodLocations())
"""
