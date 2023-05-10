import logging
from enum import Enum
from . import creature, genome
import random
import math
from ..generated_comm_files import backend_api_pb2

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
    NURTURES = 'NURTURES'
    NURTURED_BY = 'NURTURED_BY'


class SpeciesManager:
    def __init__(
            self,
            speciesName,
            startingGenome,
            simulationWidth,
            simulationHeight,
            environment,
            decisionNetwork,
            loadExistingSave=False,
            saveData=None):
        self._decisionNetwork = decisionNetwork

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
            self.spawnPointXCoordinate = random.randrange(
                self.simulationWidth)
            self.spawnPointYCoordinate = random.randrange(
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
                saveData['_startingGenome']['impulsivity'],
                saveData['_startingGenome']['selfPreservation'],
                saveData['_startingGenome']['mobility'],
                genome.ReproductionType(
                    saveData['_startingGenome']['reproductionType']),
                saveData['_startingGenome']['reproductionCooldown'],
                saveData['_startingGenome']['offspringAmount'],
                saveData['_startingGenome']['motivation'],
                saveData['_startingGenome']['maxEnergy'],
                saveData['_startingGenome']['metabolism'],
                saveData['_startingGenome']['individualism'],
                saveData['_startingGenome']['territorial'],
                saveData['_startingGenome']['fightOrFlight'],
                saveData['_startingGenome']['hostility'],
                saveData['_startingGenome']['scent'],
                saveData['_startingGenome']['stealth'],
                saveData['_startingGenome']['lifeExpectancy'],
                saveData['_startingGenome']['maturity'],
                saveData['_startingGenome']['offensiveAbility'],
                saveData['_startingGenome']['defensiveAbility'],
                saveData['_startingGenome']['effectFromHost'],
                saveData['_startingGenome']['effectFromParasite'],
                saveData['_startingGenome']['protecting'],
                saveData['_startingGenome']['nurturing'],
                saveData['_startingGenome']['effectFromBeingNurtured'],
                saveData['_startingGenome']['shortTermMemoryAccuracy'],
                saveData['_startingGenome']['shortTermMemoryCapacity'],
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
                        self._decisionNetwork,
                        loadExistingSave=True,
                        saveData=savedCreature))

            self.speciesRelations = saveData['speciesRelations']
            self.simulationWidth = simulationWidth
            self.simulationHeight = simulationHeight
            self._creatureIdIncrementer = saveData['_creatureIdIncrementer']
            self.spawnPointXCoordinate = saveData['_spawnPointXCoordinate']
            self.spawnPointYCoordinate = saveData['_spawnPointYCoordinate']

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
            '_spawnPointXCoordinate': self.spawnPointXCoordinate,
            '_spawnPointYCoordinate': self.spawnPointYCoordinate,
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
        newCreatureSpawnX = min([min([self.spawnPointXCoordinate + OffsetX, self.environment.width]),
                                 max([0, self.spawnPointXCoordinate + OffsetX])])
        newCreatureSpawnY = min([min([self.spawnPointYCoordinate + OffsetY, self.environment.height]),
                                 max([0, self.spawnPointYCoordinate + OffsetY])])

        newCreature = creature.Creature(
            startingGenome,
            self.speciesName,
            newCreatureId,
            newCreatureSpawnX,
            newCreatureSpawnY,
            self,
            self.environment,
            self._decisionNetwork)

        self._creatures.append(newCreature)

    def createNewChild(
            self,
            startingGenome,
            parentXCoordinate,
            parentYCoordinate):
        newCreatureId = f"{self.speciesName}{self._creatureIdIncrementer}"
        self._creatureIdIncrementer += 1

        randomDegreeOfOffset = math.radians(random.randrange(360))
        newCreatureSpawnX = min([min([parentXCoordinate +
                                      (math.cos(randomDegreeOfOffset) *
                                       25), self.environment.width]), max([0, parentXCoordinate +
                                                                           (math.cos(randomDegreeOfOffset) *
                                                                            25)])])
        newCreatureSpawnY = min([min([parentYCoordinate +
                                      (math.sin(randomDegreeOfOffset) *
                                       25), self.environment.height]), max([0, parentYCoordinate +
                                                                            (math.sin(randomDegreeOfOffset) *
                                                                             25)])])

        newCreature = creature.Creature(
            startingGenome,
            self.speciesName,
            newCreatureId,
            newCreatureSpawnX,
            newCreatureSpawnY,
            self,
            self.environment,
            self._decisionNetwork)

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

    def getCreatureGenome(self, creatureId):
        creatureOfInterest = self._getCreatureFromId(creatureId)

        if creatureId is None:
            logging.info(f"Could not find requested creature: {creatureId}")
        else:
            return creatureOfInterest.genome.serialize()

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

    def getCreatures(self):
        creatureIdList = []
        for creature in self._creatures:
            creatureIdList.append(creature.id)

        return {
            'creatures': creatureIdList
        }
