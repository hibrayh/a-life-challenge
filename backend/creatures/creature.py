import logging
import copy
import math
from . import decision_network, species_manager, genome
import random
import json

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')

MAX_MOVEMENT = 8


class CreatureEncoder(json.JSONEncoder):
    def default(self, obj):
        return {
            'creatureId': obj.id,
            'species': obj.species,
            'locationX': obj.xCoordinate,
            'locationY': obj.yCoordinate
        }


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
        logging.info(f"Initializing new creature with id {id}")
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
        logging.info(f"Unregistering {self.id} from the Environment")
        self.environment.removeFromCreatureRegistry(self)
    
    def serialize(self):
        return {
            'creatureId': self.id,
            'species': self.species,
            'locationX': self.xCoordinate,
            'locationY': self.yCoordinate
        }

    def speciesRelationship(self, species):
        return self.speciesManager.speciesRelations[species]

    def reproduceAsexual(self):
        logging.info(f"{self.id} reproducing asexually")
        childGenome = genome.createNewGenomeAsexual(self.genome)
        self.speciesManager.createNewCreature(childGenome)

    def reproduceSexual(self, otherParent):
        logging.info(f"{self.id} reproducing sexually with {otherParent.id}")
        childGenome = genome.createNewGenomeSexual(
            self.genome, otherParent.genome)
        self.speciesManager.createNewCreature(childGenome)

    def moveCreature(self, degreeOfMovement, distance):
        xMovement = distance * math.cos(degreeOfMovement)
        yMovement = distance * math.sin(degreeOfMovement)

        self.xCoordinate += xMovement
        self.yCoordinate += yMovement

    def moveRandom(self):
        logging.info(f"{self.id} is moving in a random direction")
        degreeOfMovement = math.radians(random.randrange(360))
        movementLength = self.genome.mobility * MAX_MOVEMENT

        self.moveCreature(degreeOfMovement, movementLength)

    def searchForMate(self, perceivableMates):
        if perceivableMates == []:
            self.moveRandom()
        else:
            distances = []
            for creature in perceivableMates:
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

            if closestMate.yCoordinate - self.yCoordinate < 0:
                degreeOfMovement = -1 * degreeOfMovement

            movementLength = min(
                self.genome.mobility * MAX_MOVEMENT,
                closestMateDistance - 1)

            logging.info(f"{self.id} moving towards potential mate")
            self.moveCreature(degreeOfMovement, movementLength)

    def fleeFromPredator(self, perceivablePredators):
        if perceivablePredators == []:
            self.moveRandom()
        else:
            distances = []
            for creature in perceivablePredators:
                distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                       self.xCoordinate) ** 2) +
                                                  (abs(creature.yCoordinate -
                                                       self.yCoordinate) ** 2)))
                distances.append(distanceFromCreature)

            closestPredatorDistance = min(distances)
            closestPredator = perceivablePredators[distances.index(
                closestPredatorDistance)]
            degreeOfMovement = math.acos(
                (closestPredator.xCoordinate -
                 self.xCoordinate) /
                closestPredatorDistance)

            if closestPredator.yCoordinate - self.yCoordinate < 0:
                degreeOfMovement = -1 * degreeOfMovement

            movementLength = self.genome.mobility * MAX_MOVEMENT
            logging.info(f"{self.id} fleeing from predator")
            self.moveCreature(degreeOfMovement, movementLength)

    def chasePrey(self, perceivablePrey):
        if perceivablePrey == []:
            self.moveRandom()
        else:
            distances = []
            for creature in perceivablePrey:
                distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                       self.xCoordinate) ** 2) +
                                                  (abs(creature.yCoordinate -
                                                       self.yCoordinate) ** 2)))
                distances.append(distanceFromCreature)

            closestPreyDistance = min(distances)
            closestPrey = perceivablePrey[distances.index(closestPreyDistance)]
            degreeOfMovement = math.acos(
                (closestPrey.xCoordinate - self.xCoordinate) / closestPreyDistance)

            if closestPrey.yCoordinate - self.yCoordinate < 0:
                degreeOfMovement = -1 * degreeOfMovement

            movementLength = min(
                self.genome.mobility * MAX_MOVEMENT,
                closestPreyDistance - 1)
            logging.info(f"{self.id} chasing prey")
            self.moveCreature(degreeOfMovement, movementLength)

    def performAction(self):
        logging.info(f"{self.id} determining its next action")
        perceivableEnvironment = self.environment.returnCreaturesPerceivableEnvironment(
            self)
        actionToPerform = self._decisionNetwork.determineMostFavorableCreatureAction(
            self, perceivableEnvironment)

        if actionToPerform == decision_network.CreatureAction.REPRODUCE:
            logging.info(f"{self.id} has decided to reproduce")
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
            logging.info(f"{self.id} has decided to search for a mate")
            possibleMates = []
            for creature in perceivableEnvironment.perceivableCreatures:
                if creature.species == self.species:
                    possibleMates.append(creature)

            self.searchForMate(possibleMates)
        elif actionToPerform == decision_network.CreatureAction.FLEE_FROM_CREATURE:
            logging.info(f"{self.id} has decided to flee from predators")
            perceivablePredators = []
            for creature in perceivableEnvironment.perceivableCreatures:
                if self.speciesRelationship(
                        creature.species) == species_manager.SpeciesRelationship.IS_HUNTED_BY:
                    perceivablePredators.append(creature)

            self.fleeFromPredator(perceivablePredators)
        elif actionToPerform == decision_network.CreatureAction.CHASE_A_CREATURE:
            logging.info(f"{self.id} has decided to chase prey")
            perceivablePrey = []
            for creature in perceivableEnvironment.perceivableCreatures:
                if self.speciesRelationship(
                        creature.species) == species_manager.SpeciesRelationship.HUNTS:
                    perceivablePrey.append(creature)

            self.chasePrey(perceivablePrey)
        else:
            logging.info(f"{self.id} has decided to do nothing")
