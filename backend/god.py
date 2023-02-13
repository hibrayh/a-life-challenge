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
    def getFoodInfo(self):
        grass = (
            "Grass",
            1,
            "very common",
            "square",
            "green",
            random.randint(
                0,
                500),
            random.randint(
                0,
                800))
        berries = ("Berries", 5, "common", "circle", "purple", 
            random.randint(
                0,
                800),  
            random.randint(
                0,
                800))
        fish = ("Fish", 25, "rare", "diamond", "blue",  
            random.randint(
                0,
                150),  
                random.randint(
                0,
                800))

        grass = Food(*grass)
        self._environment.addToFoodRegistry(grass)
        berries = Food(*berries)
        self._environment.addToFoodRegistry(berries)
        fish = Food(*fish)
        self._environment.addToFoodRegistry(fish)

        foodRegistry = self._environment.getFoodRegistry()
        return foodRegistry

    def getFoodLocations(self):
        foodLocations = self._environment.getFoodLocations()
        print(
            f"Food locations in the environment(x, y): {foodLocations}",
            "\n")
        return foodLocations

    def getTopographyInfo(self):
        mountains = ("Mountains", 1000, "cold", 400, 300, 100, 100)
        forest = ("Forest", 200, "temperate", 500, 300, 100, 100)
        plains = ("Plains", 50, "temperate", 700, 300, 50, 50)
        desert = ("Desert", 0, "hot", 600, 400, 150, 150)

        mountains = Topography(*mountains)
        self._environment.addToTopographyRegistry(mountains)
        forest = Topography(*forest)
        self._environment.addToTopographyRegistry(forest)
        plains = Topography(*plains)
        self._environment.addToTopographyRegistry(plains)
        desert = Topography(*desert)
        self._environment.addToTopographyRegistry(desert)

        topographyRegistry = self._environment.getTopographyRegistry()
        return topographyRegistry

"""
myG = God()
print("Food Info:\n", myG.getFoodInfo())
print("Topography Info:\n", myG.getTopographyInfo())
print("Food Loc Info(x,y):\n", myG.getFoodLocations())
"""