import logging
from enum import Enum
from . import creature, genome
import random
import math

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


class SpeciesRelationship(str, Enum):
    HUNTS = 'HUNTS'
    IS_HUNTED_BY = 'IS_HUNTED_BY'
    COMPETES_WITH = 'COMPETES_WITH'
    WORKS_WITH = 'WORKS_WITH'
    PROTECTS = 'PROTECTS'
    DEFENDED_BY = 'DEFENDED_BY'
    LEECHES = 'LEECHES'
    LEECHED_OFF_OF = 'LEECHED_OFF_OF'
    GATHERS_FOOD_FOR = 'GATHERS_FOOD_FOR'
    RECEIVES_FOOD_FROM = 'RECEIVES_FOOD_FROM'


class SpeciesManager:
    def __init__(
            self,
            speciesName,
            startingGenome,
            simulationWidth,
            simulationHeight,
            environment,
            loadExistingSave=False,
            saveData=None):
        if not loadExistingSave:
            logging.info(f"Initializing new Species Manager for {speciesName}")

            self.speciesName = speciesName
            self._startingGenome = startingGenome
            self._creatures = []
            self.speciesRelations = dict()
            self.simulationWidth = simulationWidth
            self.simulationHeight = simulationHeight
            self.environment = environment
            self._creatureIdIncrementer = 0
            self._spawnPointXCoordinate = random.randrange(
                self.simulationWidth)
            self._spawnPointYCoordinate = random.randrange(
                self.simulationHeight)
        else:
            logging.info(f"Loading existing Species Manager")

            self.speciesName = saveData['speciesName']

            self.environment = environment

            receptors = []
            if saveData['_startingGenome']['canSee']:
                receptors.append(genome.Receptors.VISION)
            if saveData['_startingGenome']['canSmell']:
                receptors.append(genome.Receptors.SMELL)
            if saveData['_startingGenome']['canHear']:
                receptors.append(genome.Receptors.HEAR)

            self._startingGenome = genome.Genome(
                saveData['_startingGenome']['visibility'],
                saveData['_startingGenome']['maxHealth'],
                receptors,
                saveData['_startingGenome']['sightAbility'],
                saveData['_startingGenome']['smellAbility'],
                saveData['_startingGenome']['hearingAbility'],
                saveData['_startingGenome']['sightRange'],
                saveData['_startingGenome']['smellRange'],
                saveData['_startingGenome']['hearingRange'],
                saveData['_startingGenome']['reactionTime'],
                saveData['_startingGenome']['intelligence'],
                saveData['_startingGenome']['selfPreservation'],
                saveData['_startingGenome']['mobility'],
                genome.ReproductionType(
                    saveData['_startingGenome']['reproductionType']),
                saveData['_startingGenome']['offspringAmount'],
                saveData['_startingGenome']['motivation'],
                saveData['_startingGenome']['maxEnergy'],
                saveData['_startingGenome']['individualism'],
                saveData['_startingGenome']['territorial'],
                saveData['_startingGenome']['fightOrFlight'],
                saveData['_startingGenome']['hostility'],
                saveData['_startingGenome']['scent'],
                saveData['_startingGenome']['stealth'],
                saveData['_startingGenome']['lifeExpectancy'],
                saveData['_startingGenome']['offensiveAbility'],
                saveData['_startingGenome']['defensiveAbility'],
                saveData['_startingGenome']['shape'],
                saveData['_startingGenome']['color'])

            # Load creatures
            self._creatures = []
            for savedCreature in saveData['_creatures']:
                self._creatures.append(
                    creature.Creature(
                        None,
                        None,
                        0,
                        0,
                        0,
                        self,
                        self.environment,
                        loadExistingSave=True,
                        saveData=savedCreature))

            self.speciesRelations = saveData['speciesRelations']
            self.simulationWidth = simulationWidth
            self.simulationHeight = simulationHeight
            self._creatureIdIncrementer = saveData['_creatureIdIncrementer']
            self._spawnPointXCoordinate = saveData['_spawnPointXCoordinate']
            self._spawnPointYCoordinate = saveData['_spawnPointYCoordinate']

    def save(self):
        logging.info(f"Saving Species Manager for {self.speciesName}")

        creatureList = []
        for creature in self._creatures:
            creatureList.append(creature.save())

        return {
            'speciesName': self.speciesName,
            '_startingGenome': self._startingGenome.serialize(),
            '_creatures': creatureList,
            'speciesRelations': self.speciesRelations,
            '_creatureIdIncrementer': self._creatureIdIncrementer,
            '_spawnPointXCoordinate': self._spawnPointXCoordinate,
            '_spawnPointYCoordinate': self._spawnPointYCoordinate,
        }

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
            creatureToDelete.unregisterFromEnvironment()
            self._creatures.remove(creatureToDelete)

    def unregisterCreature(self, creature):
        self._creatures.remove(creature)

    def getSpeciesInfo(self):
        pass

    def getCreatureInfo(self, creatureId):
        pass

    def addSpeciesRelationship(self, newSpecies, newSpeciesRelationship):
        self.speciesRelations[newSpecies] = newSpeciesRelationship

    def editSpeciesRelationship(self, speciesName, newRelationship):
        self.speciesRelations[speciesName] = newRelationship

    def getSpeciesGenome(self):
        return self._startingGenome.serialize()
