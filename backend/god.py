import logging
#import creatures.species_manager
import environment

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


class God:
    def __init__(self):
        logging.info("Initializing new God object")

        self._speciesManagers = []
        self._environment = environment.Environment()

    def createNewSpecies(self, speciesName, startingGenome):
        pass

    def deleteSpecies(self, speciesName):
        pass

    def editSpeciesGenome(self, speciesName, newGenome):
        pass

    def renameSpecies(self, originalSpeciesName, newSpeciesName):
        pass

    def createNewCreature(self, speciesName, startingGenome):
        pass

    def deleteCreature(self, creatureId):
        pass

    def editCreatureGenome(self, creatureId):
        pass

    def getSpeciesInfo(self, speciesName):
        pass

    def getCreatureInfo(self, creatureId):
        pass

    def getSimulationInfo(self):
        pass

    def getEnvironmentInfo(self, creatureRegistry, foodRegistry, regionTopography):
        logging.info("Creating new environment")

        self._environment.addToTopographyRegistry(self)

