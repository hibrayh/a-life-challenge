import logging
from enum import Enum
import creature

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


class SpeciesRelationship(Enum):
    HUNTS = 1
    IS_HUNTED_BY = 2
    COMPETES_WITH = 3
    WORKS_WITH = 4
    PROTECTS = 5
    DEFENDED_BY = 6
    LEECHES = 7
    LEECHED_OFF_OF = 8
    GATHERS_FOOD_FOR = 9
    RECEIVES_FOOD_FROM = 10


class SpeciesManager:
    def __init__(self, speciesName, startingGenome, speciesRelationships):
        logging.info(f"Initializing new Species Manager for {speciesName}")

        self.speciesName = speciesName
        self._startingGenome = startingGenome
        self._creatures = []
        self.speciesRelations = speciesRelationships

    def createNewCreature(self, startingGenome):
        pass

    def massCreateMoreCreatures(self, numberOfCreatures):
        pass

    def editSpeciesGenome(self, newGenome):
        pass

    def editCreatureGenome(self, creatureId, newGenome):
        pass

    def renameSpecies(self, newSpeciesName):
        pass

    def deleteCreature(self, creatureId):
        pass

    def getSpeciesInfo(self):
        pass

    def getCreatureInfo(self, creatureId):
        pass

    def editSpeciesRelationships(self, newSpeciesRelationships):
        pass

    def addSpeciesRelationship(self, newSpeciesRelationship):
        pass

    def editSpeciesRelationship(self, speciesName, newRelationship):
        pass
