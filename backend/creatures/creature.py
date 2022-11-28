import logging
import copy
import math
import genome
import decision_network
import random

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')

MAX_MOVEMENT = 8


class Creature:
    def __init__(
            self,
            inputGenome,
            species,
            id,
            xCoordinate,
            yCoordinate,
            speciesManager,
            environment):
        self.genome = inputGenome
        self.species = species
        self.id = id
        self.speciesManager = speciesManager
        self.xCoordinate = xCoordinate
        self.yCoordinate = yCoordinate
        self.environment = environment

        if self.genome.reproductionType == genome.ReproductionType.ASEXUAL:
            self._decisionNetwork = decision_network.DecisionNetworkAsexual()
        else:
            self._decisionNetwork = decision_network.DecisionNetworkSexual()

        self.maxHealth = inputGenome.maxHealth * 100
        self.currentHealth = copy.deepcopy(self.maxHealth)

        self.maxEnergy = inputGenome.maxEnergy * 100
        self.currentEnergy = copy.deepcopy(self.maxEnergy)

        self.reactionTime = inputGenome.reactionTime * 100

        self.environment.addToCreatureRegistry(self)

    def __del__(self):
        self.environment.removeFromCreatureRegistry(self)

    def speciesRelationship(self, species):
        return self.speciesManager.speciesRelations[species]

    def reproduceAsexual(self):
        childGenome = genome.createNewGenomeAsexual(self.genome)
        self.speciesManager.createNewCreature(childGenome)

    def reproduceSexual(self, otherParent):
        childGenome = genome.createNewGenomeSexual(
            self.genome, otherParent.genome)
        self.speciesManager.createNewCreature(childGenome)

    def moveCreature(self, degreeOfMovement, distance):
        xMovement = distance * math.cos(degreeOfMovement)
        yMovement = distance * math.sin(degreeOfMovement)

        self.xCoordinate += xMovement
        self.yCoordinate += yMovement

    def moveRandom(self):
        degreeOfMovement = math.radians(random.randrange(360))
        movementLength = self.genome.mobility * MAX_MOVEMENT

        self.moveCreature(degreeOfMovement, movementLength)

    def searchForMate(self, perceivableMates):
        if perceivableMates == []:
            self.moveRandom()
        else:
            distances = []
            for creature in perceivableMates:
                if creature.species == self.species:
                    distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                           self.xCoordinate) ** 2) +
                                                      (abs(creature.yCoordinate -
                                                           self.yCoordinate) ** 2)))
                    distances.append(distanceFromCreature)

            closestMateDistance = min(distances)
            closestMate = perceivableMates[distances.index(
                closestMateDistance)]
            degreeOfMovement = math.acos(
                (closestMate.xCoordinate - self.xCoordinate) / closestMateDistance)

            if closestMate.yCoordinate - self.xCoordinate:
                degreeOfMovement = -1 * degreeOfMovement

            movementLength = min(
                self.genome.mobility * MAX_MOVEMENT,
                closestMateDistance - 1)

            self.moveCreature(degreeOfMovement, movementLength)

    def performAction(self):
        perceivableEnvironment = self.environment.returnCreaturesPerceivableEnvironment(
            self)
        actionToPerform = self._decisionNetwork.determineMostFavorableCreatureAction(
            self, perceivableEnvironment)

        if actionToPerform == decision_network.CreatureAction.REPRODUCE:
            if self.genome.reproductionType == genome.ReproductionType.ASEXUAL:
                self.reproduceAsexual()
            else:
                distances = []
                for creature in perceivableEnvironment.perceivableCreatures:
                    if creature.species == self.species:
                        distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                               self.xCoordinate) ** 2) +
                                                          (abs(creature.yCoordinate -
                                                               self.yCoordinate) ** 2)))
                        distances.append(distanceFromCreature)
                self.reproduceSexual(
                    perceivableEnvironment.perceivableCreatures[distances.index(min(distances))])
        elif actionToPerform == decision_network.CreatureAction.SEARCH_FOR_MATE:
            possibleMates = []
            for creature in perceivableEnvironment.perceivableCreatures:
                if creature.species == self.species:
                    possibleMates.append(creature)

            self.searchForMate(possibleMates)
