import logging
import environment
import creatures.species_manager
import random
from environment import Food
from environment import Environment
from environment import Topography

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


class God:
    def __init__(self):
        logging.info("Initializing new God object")

        self._speciesManagers = []
        self._environment = environment.Environment()

    def _getSpeciesManagerFromName(self, speciesName):
        speciesManagerOfInterest = None

        for speciesManager in self._speciesManagers:
            if speciesManager.speciesName == speciesName:
                speciesManagerOfInterest = speciesManager
                break

        return speciesManagerOfInterest

    def createNewSpecies(self, speciesName, startingGenome):
        logging.info(f"Creating new species: {speciesName}")

        newSpecies = creatures.species_manager.SpeciesManager(
            speciesName, startingGenome, self._environment)
        self._speciesManagers.append(newSpecies)

    def deleteSpecies(self, speciesName):
        logging.info(f"Deleting species: {speciesName}")

        speciesManagerToDelete = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerToDelete is None:
            logging.info("Could not find species to delete")
        else:
            self._speciesManagers.remove(speciesManagerToDelete)

    def editSpeciesGenome(self, speciesName, newGenome):
        speciesManagerToEdit = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerToEdit is None:
            logging.info("Could not find species to edit")
        else:
            speciesManagerToEdit.editSpeciesGenome(newGenome)

    def renameSpecies(self, originalSpeciesName, newSpeciesName):
        speciesManagerToRename = self._getSpeciesManagerFromName(
            originalSpeciesName)

        if speciesManagerToRename is None:
            logging.info("Could not find species to rename")
        else:
            speciesManagerToRename.renameSpecies(newSpeciesName)

    def addSpeciesRelationship(
            self,
            speciesOfInterest,
            newSpecies,
            newRelationship):
        speciesManagerToAddRelation = self._getSpeciesManagerFromName(
            speciesOfInterest)

        if speciesManagerToAddRelation is None:
            logging.info("Could not find species to add relationship to")
        else:
            speciesManagerToAddRelation.addSpeciesRelationship(
                newSpecies, newRelationship)

    def createNewCreature(self, speciesName, startingGenome):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerOfInterest is None:
            logging.info("Could not find species to add creature to")
        else:
            speciesManagerOfInterest.createNewCreature(startingGenome)

    def massCreateCreatures(self, speciesName, numberOfNewCreatures):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerOfInterest is None:
            logging.info("Could not find species to mass spawn creatures")
        else:
            speciesManagerOfInterest.massCreateMoreCreatures(
                numberOfNewCreatures)

    def deleteCreature(self, speciesName, creatureId):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerOfInterest is None:
            logging.info("Could not find species to delete creature from")
        else:
            speciesManagerOfInterest.deleteCreature(creatureId)

    def editCreatureGenome(self, speciesName, creatureId, newGenome):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerOfInterest is None:
            logging.info("Could not find species to edit creature")
        else:
            speciesManagerOfInterest.editCreatureGenome(creatureId, newGenome)

    def getSpeciesInfo(self, speciesName):
        pass

    def getSpeciesGenome(self, speciesName):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerOfInterest is None:
            logging.info("Could not find requested species")
        else:
            return speciesManagerOfInterest.getSpeciesGenome()

    def getCreatureInfo(self, creatureId):
        pass

    def getSimulationInfo(self):
        return (self._environment.getRegisteredCreatures())

    def advanceSimulation(self):
        logging.info("Advancing simulation by a tick")
        self._environment.simulateCreatureBehavior()

    def getListOfSpecies(self):
        speciesNames = []

        for species in self._speciesManagers:
            speciesNames.append(species.speciesName)

        return {
            "speciesNames": speciesNames
        }

    # Currently gets food data
    def getEnvironmentInfo(self):

        # Added hardcoded food types here since I was having an issue getting
        # the values from environment.py and getting the foodRegistry populated
        # One issue with this method is that whenever it gets called, it will duplicate those values
        # Since this works for now I am sending as is, but will be refactored
        # later.
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

        mountains = ("Mountains", 1000, "cold", 400, 300, 100, 100)
        forest = ("Forest", 200, "temperate", 500, 300, 100, 100)
        plains = ("Plains", 50, "temperate", 700, 300, 50, 50)
        desert = ("Desert", 0, "hot", 600, 400, 150, 150)

        # Creating instances of the food types and adding to foodRegistry
        # Creating instances of the topography types and adding to
        # topographyRegistry
        grass = Food(*grass)
        self._environment.addToFoodRegistry(grass)
        berries = Food(*berries)
        self._environment.addToFoodRegistry(berries)
        fish = Food(*fish)
        self._environment.addToFoodRegistry(fish)
        mountains = Topography(*mountains)
        self._environment.addToTopographyRegistry(mountains)
        forest = Topography(*forest)
        self._environment.addToTopographyRegistry(forest)
        plains = Topography(*plains)
        self._environment.addToTopographyRegistry(plains)
        desert = Topography(*desert)
        self._environment.addToTopographyRegistry(desert)

        # Display the location of the food types in the environment, along with the
        # currently registered food and topographies in the environment
        print(
            f"The food locations of each food in the environment is (x, y): {self._environment.getFoodLocations()}",
            "\n")
        foodRegistry = self._environment.getFoodRegistry()
        topographyRegistry = self._environment.getTopographyRegistry()
        return foodRegistry, topographyRegistry


"""
myG = God()
print("Environment Info:\n", myG.getEnvironmentInfo())
"""
