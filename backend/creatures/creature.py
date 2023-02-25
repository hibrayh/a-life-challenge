import logging
import copy
import math
from . import decision_network, species_manager, genome
import random
import json

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')

MAX_MOVEMENT = 20


class Creature:
    def __init__(
            self,
            inputGenome,
            species,
            id,
            xCoordinate,
            yCoordinate,
            speciesManager,
            environment,
            loadExistingSave=False,
            saveData=None):
        if not loadExistingSave:
            logging.info(f"Initializing new creature with id {id}")
            self.genome = inputGenome
            self.species = species
            self.id = id
            self.speciesManager = speciesManager
            self.xCoordinate = xCoordinate
            self.yCoordinate = yCoordinate
            self.environment = environment
            self.lastAction = decision_network.CreatureAction.BIRTHED
            self.reproductionCoolDown = 10
            self.hasPerformedActionThisTurn = True

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
        else:
            logging.info(f"Loading existing creature")

            receptors = []
            if saveData['genome']['canSee']:
                receptors.append(genome.Receptors.VISION)
            if saveData['genome']['canSmell']:
                receptors.append(genome.Receptors.SMELL)
            if saveData['genome']['canHear']:
                receptors.append(genome.Receptors.HEAR)
            self.genome = genome.Genome(
                saveData['genome']['visibility'],
                saveData['genome']['maxHealth'],
                receptors,
                saveData['genome']['sightAbility'],
                saveData['genome']['smellAbility'],
                saveData['genome']['hearingAbility'],
                saveData['genome']['sightRange'],
                saveData['genome']['smellRange'],
                saveData['genome']['hearingRange'],
                saveData['genome']['reactionTime'],
                saveData['genome']['intelligence'],
                saveData['genome']['selfPreservation'],
                saveData['genome']['mobility'],
                genome.ReproductionType(
                    saveData['genome']['reproductionType']),
                saveData['genome']['offspringAmount'],
                saveData['genome']['motivation'],
                saveData['genome']['maxEnergy'],
                saveData['genome']['individualism'],
                saveData['genome']['territorial'],
                saveData['genome']['fightOrFlight'],
                saveData['genome']['hostility'],
                saveData['genome']['scent'],
                saveData['genome']['stealth'],
                saveData['genome']['lifeExpectancy'],
                saveData['genome']['offensiveAbility'],
                saveData['genome']['defensiveAbility'],
                saveData['genome']['shape'],
                saveData['genome']['color'])

            self.species = saveData['species']
            self.id = saveData['id']
            self.speciesManager = speciesManager
            self.xCoordinate = saveData['xCoordinate']
            self.yCoordinate = saveData['yCoordinate']
            self.lastAction = decision_network.CreatureAction(
                saveData['lastAction'])
            self.reproductionCoolDown = saveData['reproductionCoolDown']
            self.currentHealth = saveData['currentHealth']
            self.maxHealth = self.genome.maxHealth * 100
            self.currentEnergy = saveData['currentEnergy']
            self.maxEnergy = self.genome.maxEnergy * 100
            self.hasPerformedActionThisTurn = False
            self.environment = environment
            self.reactionTime = self.genome.reactionTime * 100

            if self.genome.reproductionType == genome.ReproductionType.ASEXUAL:
                self._decisionNetwork = decision_network.DecisionNetworkAsexual()
            else:
                self._decisionNetwork = decision_network.DecisionNetworkSexual()

            self.environment.addToCreatureRegistry(self)

    def unregisterFromEnvironment(self):
        logging.info(f"Unregistering {self.id} from the Environment")
        self.environment.removeFromCreatureRegistry(self)

    def unregisterFromSpeciesManager(self):
        logging.info(f"Unregistering {self.id} from its Species Manager")
        self.speciesManager.unregisterCreature(self)

    def serialize(self):
        return {
            'creatureId': self.id,
            'species': self.species,
            'locationX': self.xCoordinate,
            'locationY': self.yCoordinate,
            'color': self.genome.color,
            'shape': self.genome.shape,
            'lastAction': self.lastAction
        }

    def save(self):
        logging.info(f"Saving creature {self.id}")
        return {
            'genome': self.genome.serialize(),
            'species': self.species,
            'id': self.id,
            'xCoordinate': self.xCoordinate,
            'yCoordinate': self.yCoordinate,
            'lastAction': self.lastAction,
            'reproductionCoolDown': self.reproductionCoolDown,
            'currentHealth': self.currentHealth,
            'currentEnergy': self.currentEnergy,
        }

    def canReproduce(self):
        return (self.reproductionCoolDown == 0) and (
            not self.hasPerformedActionThisTurn)

    def speciesRelationship(self, species):
        return species_manager.SpeciesRelationship.WORKS_WITH
        # return self.speciesManager.speciesRelations[species]

    def reproduceAsexual(self):
        if self.canReproduce():
            logging.info(f"{self.id} reproducing asexually")
            childGenome = genome.createNewGenomeAsexual(self.genome)
            self.speciesManager.createNewChild(
                childGenome, self.xCoordinate, self.yCoordinate)
            self.lastAction = decision_network.CreatureAction.REPRODUCE
            self.reproductionCoolDown = 10
            self.currentEnergy = .5 * self.maxEnergy

    def reproduceSexual(self, otherParent):
        if self.canReproduce() and otherParent.canReproduce():
            logging.info(
                f"{self.id} reproducing sexually with {otherParent.id}")
            childGenome = genome.createNewGenomeSexual(
                self.genome, otherParent.genome)
            self.speciesManager.createNewChild(
                childGenome, self.xCoordinate, self.yCoordinate)
            self.lastAction = decision_network.CreatureAction.REPRODUCE
            self.reproductionCoolDown = 10
            self.currentEnergy = .5 * self.maxEnergy

    def consumeResource(self, resource):
        logging.info(f"{self.id} consuming resource {resource.id}")
        self.currentEnergy = min(
            (1 + resource.replenishment) * self.currentEnergy,
            self.maxEnergy)
        resource.noticeOfConsumption()
        self.lastAction = decision_network.CreatureAction.CONSUME_FOOD

    def notificationOfReproduction(self):
        self.lastAction = decision_network.CreatureAction.REPRODUCE
        self.hasPerformedActionThisTurn = True
        self.reproductionCoolDown = 10
        self.currentEnergy = .5 * self.maxEnergy

    def moveCreature(self, degreeOfMovement, distance):
        xMovement = distance * math.cos(degreeOfMovement)
        yMovement = distance * math.sin(degreeOfMovement)

        self.xCoordinate += xMovement
        self.yCoordinate += yMovement

        self.currentEnergy -= 0.005 * self.maxEnergy

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

        self.lastAction = decision_network.CreatureAction.SEARCH_FOR_MATE

    def searchForResource(self, perceivableResources):
        if perceivableResources == []:
            self.moveRandom()
        else:
            distances = []
            for resource in perceivableResources:
                distanceFromResource = (math.sqrt((abs(resource.xCoordinate - self.xCoordinate) ** 2)
                                        + (abs(resource.yCoordinate - self.yCoordinate) ** 2)))
                distances.append(distanceFromResource)

            closestResourceDistance = min(distances)
            closestResource = perceivableResources[distances.index(
                closestResourceDistance)]
            degreeOfMovement = math.acos(
                (closestResource.xCoordinate -
                 self.xCoordinate) /
                closestResourceDistance)

            if closestResource.yCoordinate - self.yCoordinate < 0:
                degreeOfMovement = -1 * degreeOfMovement

            movementLength = min(
                self.genome.mobility * MAX_MOVEMENT,
                closestResourceDistance - 1)

            logging.info(f"{self.id} moving towards resource")
            self.moveCreature(degreeOfMovement, movementLength)

        self.lastAction = decision_network.CreatureAction.SEARCH_FOR_FOOD

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

        self.lastAction = decision_network.CreatureAction.FLEE_FROM_CREATURE

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

        self.lastAction = decision_network.CreatureAction.CHASE_A_CREATURE

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
                    if (creature.species == self.species) and (
                            creature.canReproduce()):
                        distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                               self.xCoordinate) ** 2) +
                                                          (abs(creature.yCoordinate -
                                                               self.yCoordinate) ** 2)))
                        distances.append(distanceFromCreature)

                if len(distances) == 0:
                    logging.info(
                        "No creature nearby to reproduce with (REMOVE THIS FUNCTIONALITY AFTER DECISION NETWORK IS FULLY IMPLEMENTED)")
                else:
                    self.reproduceSexual(
                        perceivableEnvironment.perceivableCreatures[distances.index(min(distances))])
        elif actionToPerform == decision_network.CreatureAction.CONSUME_FOOD:
            logging.info(f"{self.id} has decided to consume")
            distances = []
            for resource in perceivableEnvironment.perceivableResources:
                distanceFromResource = (math.sqrt((abs(resource.xCoordinate - self.xCoordinate) ** 2)
                                        + (abs(resource.yCoordinate - self.yCoordinate) ** 2)))
                distances.append(distanceFromResource)

            if len(distances) == 0:
                logging.info("No nearby food to consume")
            else:
                if min(distances) <= 10:
                    self.consumeResource(
                        perceivableEnvironment.perceivableResources[distances.index(min(distances))])
                else:
                    logging.info("No nearby food to consume")
        elif actionToPerform == decision_network.CreatureAction.SEARCH_FOR_FOOD:
            logging.info(f"{self.id} has decided to search for food")
            self.searchForResource(perceivableEnvironment.perceivableResources)
        elif actionToPerform == decision_network.CreatureAction.SEARCH_FOR_MATE:
            logging.info(f"{self.id} has decided to search for a mate")
            possibleMates = []
            for creature in perceivableEnvironment.perceivableCreatures:
                if (creature.species == self.species) and (
                        creature.canReproduce()):
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

        self.hasPerformedActionThisTurn = True
        self.reproductionCoolDown = self.reproductionCoolDown - \
            1 if self.reproductionCoolDown > 0 else 0

        logging.info(
            f"Creature {self.id} now has {(self.currentEnergy / self.maxEnergy) * 100}% energy remaining")
