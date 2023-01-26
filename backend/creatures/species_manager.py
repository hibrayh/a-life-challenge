import logging
from enum import Enum
from . import creature
import random
import math

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


def _sortCreaturesByInitiative(creature):
    return creature.genome.reactionTime


class SpeciesManager:
    def __init__(self, speciesName, startingGenome, environment):
        logging.info(f"Initializing new Species Manager for {speciesName}")

        self.speciesName = speciesName
        self._startingGenome = startingGenome
        self._creatures = []
        self.speciesRelations = dict()
        self.environment = environment
        self._creatureIdIncrementer = 0
        self._spawnPointXCoordinate = random.randrange(1000)
        self._spawnPointYCoordinate = random.randrange(1000)

    def _getCreatureFromId(self, creatureId):
        desiredCreature = None

        for creature in self._creatures:
            if creature.id == creatureId:
                desiredCreature = creature
                break

        return desiredCreature

    def createNewCreature(self, startingGenome):
        newCreatureId = f"{self.speciesName}{self._creatureIdIncrementer}"
        self._creatureIdIncrementer += 1

        randomDegreeOfOffset = math.radians(random.randrange(360))
        randomOffsetMagnitude = random.randrange(-10 * 25, 10 * 25)
        OffsetX = randomOffsetMagnitude * math.cos(randomDegreeOfOffset)
        OffsetY = randomOffsetMagnitude * math.sin(randomDegreeOfOffset)
        newCreatureSpawnX = self._spawnPointXCoordinate + OffsetX
        newCreatureSpawnY = self._spawnPointYCoordinate + OffsetY

        newCreature = creature.Creature(
            startingGenome,
            self.speciesName,
            newCreatureId,
            newCreatureSpawnX,
            newCreatureSpawnY,
            self,
            self.environment)

        self._creatures.append(newCreature)

    def createNewChild(
            self,
            startingGenome,
            parentXCoordinate,
            parentYCoordinate):
        newCreatureId = f"{self.speciesName}{self._creatureIdIncrementer}"
        self._creatureIdIncrementer += 1

        randomDegreeOfOffset = math.radians(random.randrange(360))
        newCreatureSpawnX = parentXCoordinate + \
            (math.cos(randomDegreeOfOffset) * 25)
        newCreatureSpawnY = parentYCoordinate + \
            (math.sin(randomDegreeOfOffset) * 25)

        newCreature = creature.Creature(
            startingGenome,
            self.speciesName,
            newCreatureId,
            newCreatureSpawnX,
            newCreatureSpawnY,
            self,
            self.environment)

        self._creatures.append(newCreature)

    def massCreateMoreCreatures(self, numberOfCreatures):
        logging.info(
            f"Mass creating {numberOfCreatures} new {self.speciesName} creatures")

        for i in range(numberOfCreatures):
            self.createNewCreature(self._startingGenome)

    def massCreateCreaturesFromGenome(self, numberOfCreatures, newGenome):
        for i in range(numberOfCreatures):
            self.createNewCreature(newGenome)

    def editSpeciesGenome(self, newGenome):
        self._startingGenome = newGenome

        for creature in self._creatures:
            creature.genome = newGenome

    def editCreatureGenome(self, creatureId, newGenome):
        creatureOfInterest = self._getCreatureFromId(creatureId)

        if creatureOfInterest is None:
            logging.info(f"There is no creature with id {creatureId} to edit")
        else:
            creatureOfInterest.genome = newGenome

    def renameSpecies(self, newSpeciesName):
        self.speciesName = newSpeciesName
        self._creatureIdIncrementer = 0

        for creature in self._creatures:
            creature.id = f"{self.speciesName}{self._creatureIdIncrementer}"
            self._creatureIdIncrementer += 1

    def deleteCreature(self, creatureId):
        creatureToDelete = self._getCreatureFromId(creatureId)

        if creatureToDelete is None:
            logging.info(
                f"There is no creature with id {creatureId} to delete")
        else:
            self._creatures.remove(creatureToDelete)

    def getSpeciesInfo(self):
        pass

    def getCreatureInfo(self, creatureId):
        pass

    def addSpeciesRelationship(self, newSpecies, newSpeciesRelationship):
        self.speciesRelations[newSpecies] = newSpeciesRelationship

    def editSpeciesRelationship(self, speciesName, newRelationship):
        self.speciesRelations[speciesName] = newRelationship
