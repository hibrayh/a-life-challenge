import logging
import copy
import math
from . import decision_network, species_manager, genome, memory
import random
import json
from ..generated_comm_files import backend_api_pb2

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')

MAX_MOVEMENT = 20
MAX_ENERGY_LOSS = 0.2
MAX_DAMAGE = 100
UNIT = 20


def _get_closest_from_collection(collection, centralObject):
    if len(collection) > 0:
        closestObject = collection[0]
        closestDistance = None
        if closestObject is None:
            closestDistance = 100000000000
        else:
            closestDistance = abs(math.dist([centralObject.xCoordinate, centralObject.yCoordinate], [
                                  closestObject.xCoordinate, closestObject.yCoordinate]))

        for _object in collection[1:]:
            if _object is not None:
                objectDistance = abs(math.dist([centralObject.xCoordinate, centralObject.yCoordinate], [
                                     _object.xCoordinate, _object.yCoordinate]))

                if objectDistance < closestDistance:
                    closestDistance = objectDistance
                    closestObject = _object

        return closestObject
    else:
        return None


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
            decisionNetwork,
            loadExistingSave=False,
            saveData=None):
        self._decisionNetwork = decisionNetwork

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
            self.lastMovementDirection = None
            self.lastTargetedObject = None

            self.reproductionCoolDown = 50 * self.genome.reproductionCooldown
            self.hasPerformedActionThisTurn = True

            self.maxHealth = inputGenome.maxHealth * 100
            self.currentHealth = copy.deepcopy(self.maxHealth)

            self.maxEnergy = inputGenome.maxEnergy * 100
            self.currentEnergy = copy.deepcopy(self.maxEnergy)

            self.maxAge = math.floor(inputGenome.lifeExpectancy * 100)
            self.currentAge = 0

            self.memory = memory.ShortTermMemory(
                self.genome.shortTermMemoryCapacity,
                self.genome.shortTermMemoryAccuracy)

            self.reactionTime = inputGenome.reactionTime * 100

            self.environment.addToCreatureRegistry(self)

            self.beingProtected = False
            self.protectedBy = None
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
                saveData['genome']['impulsivity'],
                saveData['genome']['selfPreservation'],
                saveData['genome']['mobility'],
                genome.ReproductionType(
                    saveData['genome']['reproductionType']),
                saveData['genome']['reproductionCooldown'],
                saveData['genome']['offspringAmount'],
                saveData['genome']['motivation'],
                saveData['genome']['maxEnergy'],
                saveData['genome']['metabolism'],
                saveData['genome']['individualism'],
                saveData['genome']['territorial'],
                saveData['genome']['fightOrFlight'],
                saveData['genome']['hostility'],
                saveData['genome']['scent'],
                saveData['genome']['stealth'],
                saveData['genome']['lifeExpectancy'],
                saveData['genome']['maturity'],
                saveData['genome']['offensiveAbility'],
                saveData['genome']['defensiveAbility'],
                saveData['genome']['effectFromHost'],
                saveData['genome']['effectFromParasite'],
                saveData['genome']['protecting'],
                saveData['genome']['nurturing'],
                saveData['genome']['effectFromBeingNurtured'],
                saveData['genome']['shortTermMemoryAccuracy'],
                saveData['genome']['shortTermMemoryCapacity'],
                saveData['genome']['shape'],
                saveData['genome']['color'])

            self.species = saveData['species']
            self.id = saveData['id']
            self.speciesManager = speciesManager
            self.xCoordinate = saveData['xCoordinate']
            self.yCoordinate = saveData['yCoordinate']
            self.lastAction = decision_network.CreatureAction(
                saveData['lastAction'])
            self.lastMovementDirection = saveData['lastMovementDirection']
            self.lastTargetedObject = saveData['lastTargetedObject']

            self.reproductionCoolDown = saveData['reproductionCoolDown']

            self.currentHealth = saveData['currentHealth']
            self.maxHealth = self.genome.maxHealth * 100
            self.currentEnergy = saveData['currentEnergy']
            self.maxEnergy = self.genome.maxEnergy * 100
            self.currentAge = saveData['currentAge']
            self.maxAge = self.genome.lifeExpectancy * 100
            self.memory = memory.ShortTermMemory(
                None, None, loadExistingSave=True, saveData=saveData['memory'])
            self.hasPerformedActionThisTurn = False
            self.environment = environment
            self.reactionTime = self.genome.reactionTime * 100

            if self.genome.reproductionType == genome.ReproductionType.ASEXUAL:
                self._decisionNetwork = decision_network.DecisionNetworkAsexual()
            else:
                self._decisionNetwork = decision_network.DecisionNetworkSexual()

            self.environment.addToCreatureRegistry(self)

            self.beingProtected = False
            self.protectedBy = None

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
            'lastMovementDirection': self.lastMovementDirection,
            'lastTargetedObject': self.lastTargetedObject,
            'reproductionCoolDown': self.reproductionCoolDown,
            'currentHealth': self.currentHealth,
            'currentEnergy': self.currentEnergy,
            'currentAge': self.currentAge,
            'memory': self.memory.save()
        }
    
    def getAnimationInfo(self):
        logging.info(f"Getting animation info for creature {self.id}")
        return backend_api_pb2.CreatureAnimationInfo(
            id = self.id,
            xCoordinate = self.xCoordinate,
            yCoordinate = self.yCoordinate,
            shape = self.genome.shape,
            color = self.genome.color,
            lastAction = self.lastAction
        )

    def canReproduce(self):
        return (self.reproductionCoolDown == 0) \
            and (not self.hasPerformedActionThisTurn) \
            and ((self.currentAge / self.maxAge) >= self.genome.maturity)

    def speciesRelationship(self, species):
        if species in self.speciesManager.speciesRelations:
            return self.speciesManager.speciesRelations[species]
        else:
            return species_manager.SpeciesRelationship.COMPETES_WITH

    def reproduceAsexual(self):
        logging.info(f"{self.id} reproducing asexually")

        for i in range(self.genome.offspringAmount):
            childGenome = genome.createNewGenomeAsexual(self.genome)
            self.speciesManager.createNewChild(
                childGenome, self.xCoordinate, self.yCoordinate)
        self.lastAction = decision_network.CreatureAction.REPRODUCE
        self.reproductionCoolDown = 50 * self.genome.reproductionCooldown
        self.currentEnergy -= (self.genome.metabolism *
                               MAX_ENERGY_LOSS) * self.maxEnergy

    def reproduceSexual(self, otherParent):
        logging.info(
            f"{self.id} reproducing sexually with {otherParent.id}")

        for i in range(self.genome.offspringAmount):
            childGenome = genome.createNewGenomeSexual(
                self.genome, otherParent.genome)
            self.speciesManager.createNewChild(
                childGenome, self.xCoordinate, self.yCoordinate)
        self.lastAction = decision_network.CreatureAction.REPRODUCE
        self.reproductionCoolDown = 50 * self.genome.reproductionCooldown
        self.currentEnergy -= (self.genome.metabolism *
                               MAX_ENERGY_LOSS) * self.maxEnergy

    def notificationOfReproduction(self):
        self.lastAction = decision_network.CreatureAction.REPRODUCE
        self.hasPerformedActionThisTurn = True
        self.reproductionCoolDown = 10
        self.currentEnergy -= (self.genome.metabolism *
                               MAX_ENERGY_LOSS) * self.maxEnergy

    def takeDamage(self, damage):
        if not self.beingProtected:
            self.currentHealth -= (damage * (1 - self.genome.defensiveAbility))
        else:
            self.protectedBy.takeDamage(damage)
            self.protectedBy = None
            self.beingProtected = False

        if self.currentHealth <= 0:
            self.lastAction = decision_network.CreatureAction.DEAD
            return self.maxEnergy
        else:
            return 0

    def leeched(self):
        self.currentHealth += (self.genome.effectFromParasite -
                               0.5) * self.maxHealth

        if self.currentHealth <= 0:
            self.lastAction = decision_network.CreatureAction.DEAD

    def nurtured(self):
        self.currentHealth += 0.1 * self.maxHealth

    def underProtection(self, creatureProtecting):
        self.beingProtected = True
        self.beingProtected = creatureProtecting

    def moveCreature(self, degreeOfMovement, distance):
        xMovement = distance * math.cos(degreeOfMovement)
        yMovement = distance * math.sin(degreeOfMovement)

        self.xCoordinate += min([min([xMovement,
                                self.environment.width]), max([xMovement, 0])])
        self.yCoordinate += min([min([yMovement,
                                self.environment.height]), max([yMovement, 0])])

        self.currentEnergy -= (self.genome.metabolism *
                               MAX_ENERGY_LOSS) * self.maxEnergy

        self.lastMovementDirection = degreeOfMovement

    def moveCreatureTowardsObject(self, _object):
        distance = abs(math.dist([self.xCoordinate, self.yCoordinate], [
                       _object.xCoordinate, _object.yCoordinate]))
        degreeOfMovement = math.acos(
            (_object.xCoordinate - self.xCoordinate) / distance)

        if _object.yCoordinate - self.yCoordinate < 0:
            degreeOfMovement = -1 * degreeOfMovement

        movementLength = min(
            self.genome.mobility * MAX_MOVEMENT,
            distance - (UNIT / 2)
        )

        self.moveCreature(degreeOfMovement, movementLength)
        self.lastTargetedObject = _object.id

    def moveCreatureAwayFromObject(self, _object):
        distance = abs(math.dist([self.xCoordinate, self.yCoordinate], [
                       _object.xCoordinate, _object.yCoordinate]))
        degreeOfMovement = math.acos(
            (_object.xCoordinate - self.xCoordinate) / distance)

        if _object.yCoordinate - self.yCoordinate < 0:
            degreeOfMovement = -1 * degreeOfMovement

        self.moveCreature(
            degreeOfMovement + math.pi,
            self.genome.mobility * MAX_MOVEMENT)
        self.lastTargetedObject = _object.id

    def moveRandom(self):
        logging.info(f"{self.id} is moving in a random direction")
        degreeOfMovement = math.radians(random.randrange(360))
        movementLength = self.genome.mobility * MAX_MOVEMENT

        if self.lastMovementDirection is not None:
            degreeOfMovement = self.lastMovementDirection + \
                math.radians(random.randrange(-45, 45))

        self.moveCreature(degreeOfMovement, movementLength)

    def performAction(self):
        logging.info(f"{self.id} determining its next action")
        perceivableEnvironment = self.environment.returnCreaturesPerceivableEnvironment(
            self)
        actionToPerform = self._decisionNetwork.determineMostFavorableCreatureAction(
            self, perceivableEnvironment)

        startingHealth = copy.deepcopy(self.currentHealth)
        startingEnergy = copy.deepcopy(self.currentEnergy)
        changeInOffspring = 0

        logging.info(f"DEBUG: action to perform {actionToPerform}")

        if actionToPerform is decision_network.CreatureAction.REPRODUCE:
            logging.info(f"{self.id} has decided to reproduce")

            if self.genome.reproductionType == genome.ReproductionType.SEXUAL:
                closestMate = _get_closest_from_collection(
                    perceivableEnvironment.perceivableMates, self)
                self.reproduceSexual(closestMate)
                self.lastTargetedObject = closestMate.id
            else:
                self.reproduceAsexual()

            changeInOffspring = self.genome.offspringAmount
        elif actionToPerform is decision_network.CreatureAction.SEARCH_FOR_FOOD:
            logging.info(f"{self.id} has decided to search for food")

            closestResource = _get_closest_from_collection(
                perceivableEnvironment.perceivableResources, self)
            if closestResource is not None:
                self.moveCreatureTowardsObject(closestResource)
            else:
                self.moveRandom()

            self.lastAction = decision_network.CreatureAction.SEARCH_FOR_FOOD
        elif actionToPerform is decision_network.CreatureAction.CONSUME_FOOD:
            logging.info(f"{self.id} has decided to consume food")
            closestResource = _get_closest_from_collection(
                perceivableEnvironment.perceivableResources, self)
            self.currentEnergy = min(
                self.maxEnergy, self.currentEnergy + (closestResource.replenishment * self.maxEnergy))
            closestResource.noticeOfConsumption()
            self.lastAction = decision_network.CreatureAction.CONSUME_FOOD
        elif actionToPerform is decision_network.CreatureAction.SEARCH_FOR_MATE:
            logging.info(f"{self.id} has decided to look for a mate")
            closestMate = _get_closest_from_collection(
                perceivableEnvironment.perceivableMates, self)
            if closestMate is not None:
                self.moveCreatureTowardsObject(closestMate)
            else:
                self.moveRandom()
            self.lastAction = decision_network.CreatureAction.SEARCH_FOR_MATE
        elif actionToPerform is decision_network.CreatureAction.FLEE_FROM_CREATURE:
            logging.info(f"{self.id} has decided to flee from predators")
            closestPredator = _get_closest_from_collection(
                perceivableEnvironment.perceivablePredators, self)
            self.moveCreatureAwayFromObject(closestPredator)
            self.lastAction = decision_network.CreatureAction.FLEE_FROM_CREATURE
        elif actionToPerform is decision_network.CreatureAction.CHASE_A_CREATURE:
            logging.info(f"{self.id} has decided to chase prey")
            closestPrey = _get_closest_from_collection(
                perceivableEnvironment.perceivablePrey, self)
            self.moveCreatureTowardsObject(closestPrey)
            self.lastAction = decision_network.CreatureAction.CHASE_A_CREATURE
        elif actionToPerform is decision_network.CreatureAction.ATTACK_A_CREATURE:
            logging.info(f"{self.id} has decided to attack a creature")
            closestPredator = _get_closest_from_collection(
                perceivableEnvironment.perceivablePredators, self)
            closestPrey = _get_closest_from_collection(
                perceivableEnvironment.perceivablePrey, self)
            closestCompetitor = _get_closest_from_collection(
                perceivableEnvironment.perceivableCompetitors, self)
            closestParasite = _get_closest_from_collection(
                perceivableEnvironment.perceivableParasites, self)
            closestHost = _get_closest_from_collection(
                perceivableEnvironment.perceivableHosts, self)
            closestPotentialHostile = _get_closest_from_collection(
                [closestPredator, closestPrey, closestCompetitor, closestParasite, closestHost], self)
            self.currentHealth += closestPotentialHostile.takeDamage(
                self.genome.offensiveAbility * MAX_DAMAGE)
            self.lastAction = decision_network.CreatureAction.ATTACK_A_CREATURE
            self.lastTargetedObject = closestPotentialHostile.id
        elif actionToPerform is decision_network.CreatureAction.SEEK_ALLIES:
            logging.info(f"{self.id} has decided to seek allies")
            closestAlly = _get_closest_from_collection(
                perceivableEnvironment.perceivableAllies, self)
            if closestAlly is not None:
                self.moveCreatureTowardsObject(closestAlly)
            else:
                self.moveRandom()
            self.lastAction = decision_network.CreatureAction.SEEK_ALLIES
        elif actionToPerform is decision_network.CreatureAction.LEECH_OFF_CREATURE:
            logging.info(f"{self.id} has decided to leech off of a host")
            closestHost = _get_closest_from_collection(
                perceivableEnvironment.perceivableHosts, self)
            self.currentHealth += (self.genome.effectFromHost -
                                   0.5) * self.maxHealth
            closestHost.leeched()
            self.lastAction = decision_network.CreatureAction.LEECH_OFF_CREATURE
            self.lastTargetedObject = closestHost.id
        elif actionToPerform is decision_network.CreatureAction.SEEK_HOST:
            logging.info(f"{self.id} has decided to seek a host")
            closestHost = _get_closest_from_collection(
                perceivableEnvironment.perceivableHosts, self)
            if closestHost is not None:
                self.moveCreatureTowardsObject(closestHost)
            else:
                self.moveRandom()
            self.lastAction = decision_network.CreatureAction.SEEK_HOST
        elif actionToPerform is decision_network.CreatureAction.EVADE_HOST:
            logging.info(f"{self.id} has decided to evade hosts")
            closestHost = _get_closest_from_collection(
                perceivableEnvironment.perceivableHosts, self)
            if closestHost is not None:
                self.moveCreatureAwayFromObject(closestHost)
            else:
                self.moveRandom()
            self.lastAction = decision_network.CreatureAction.EVADE_HOST
        elif actionToPerform is decision_network.CreatureAction.SEEK_PARASITE:
            logging.info(f"{self.id} has decided to seek parasites")
            closestParasite = _get_closest_from_collection(
                perceivableEnvironment.perceivableParasites, self)
            if closestParasite is not None:
                self.moveCreatureTowardsObject(closestParasite)
            else:
                self.moveRandom()
            self.lastAction = decision_network.CreatureAction.SEEK_PARASITE
        elif actionToPerform is decision_network.CreatureAction.EVADE_PARASITE:
            logging.info(f"{self.id} has decided to evade parasites")
            closestParasite = _get_closest_from_collection(
                perceivableEnvironment.perceivableParasites, self)
            if closestParasite is not None:
                self.moveCreatureAwayFromObject(closestParasite)
            else:
                self.moveRandom()
            self.lastAction = decision_network.CreatureAction.EVADE_PARASITE
        elif actionToPerform is decision_network.CreatureAction.PROTECT_CREATURE:
            logging.info(f"{self.id} has deicded to protect another creature")
            closestDefendee = _get_closest_from_collection(
                perceivableEnvironment.perceivableDefendees, self)
            closestDefendee.underProtection(self)
            self.lastAction = decision_network.CreatureAction.PROTECT_CREATURE
            self.lastTargetedObject = closestDefendee.id
        elif actionToPerform is decision_network.CreatureAction.SEEK_DEFENDEE:
            logging.info(f"{self.id} has decided to seek creatures to protect")
            closestDefendee = _get_closest_from_collection(
                perceivableEnvironment.perceivableDefendees, self)
            if closestDefendee is not None:
                self.moveCreatureTowardsObject(closestDefendee)
            else:
                self.moveRandom()
            self.lastAction = decision_network.CreatureAction.SEEK_DEFENDEE
        elif actionToPerform is decision_network.CreatureAction.SEEK_DEFENDER:
            logging.info(f"{self.id} has decided to seek defenders")
            closestDefender = _get_closest_from_collection(
                perceivableEnvironment.perceivableDefenders, self)
            if closestDefender is not None:
                self.moveCreatureTowardsObject(closestDefender)
            else:
                self.moveRandom()
            self.lastAction = decision_network.CreatureAction.SEEK_DEFENDER
        elif actionToPerform is decision_network.CreatureAction.NURTURE_CREATURE:
            logging.info(f"{self.id} has decided to nurture a creature")
            closestNurturee = _get_closest_from_collection(
                perceivableEnvironment.perceivableNurturees, self)
            closestNurturee.nurtured()
            self.lastAction = decision_network.CreatureAction.NURTURE_CREATURE
            self.lastTargetedObject = closestNurturee.id
        elif actionToPerform is decision_network.CreatureAction.SEEK_NURTUREE:
            logging.info(
                f"{self.id} has decided to search for creatures to nurture")
            closestNurturee = _get_closest_from_collection(
                perceivableEnvironment.perceivableNurturees, self)
            if closestNurturee is not None:
                self.moveCreatureTowardsObject(closestNurturee)
            else:
                self.moveRandom()
            self.lastAction = decision_network.CreatureAction.SEEK_NURTUREE
        elif actionToPerform is decision_network.CreatureAction.SEEK_NURTURER:
            logging.info(f"{self.id} has decided to seek nurturers")
            closestNurturer = _get_closest_from_collection(
                perceivableEnvironment.perceivableNurturers, self)
            if closestNurturer is not None:
                self.moveCreatureTowardsObject(closestNurturer)
            else:
                self.moveRandom()
            self.lastAction = decision_network.CreatureAction.SEEK_NURTURER
        else:
            logging.info(f"{self.id} has decided to do nothing")
            self.lastAction = decision_network.CreatureAction.NOTHING
            self.currentEnergy -= (self.genome.metabolism *
                                   MAX_ENERGY_LOSS) * self.maxEnergy

        self.hasPerformedActionThisTurn = True

        self.reproductionCoolDown = max(0, self.reproductionCoolDown - 1)
        self.currentAge += 1

        # Store memory and net action benefit
        self.memory.addNewMemory(
            perceivableEnvironment,
            startingHealth /
            self.maxHealth,
            startingEnergy /
            self.maxEnergy,
            copy.deepcopy(
                self.lastAction),
            memory.NetActionBenefit(
                self.currentHealth -
                startingHealth,
                self.currentEnergy -
                startingEnergy,
                changeInOffspring))

        # Check for potential death conditions
        if (self.currentHealth <= 0) or (self.currentEnergy <= 0) or (
                self.currentAge >= self.maxAge):
            self.lastAction = decision_network.CreatureAction.DEAD

        self.currentHealth += (.2 * (self.currentEnergy /
                               self.maxEnergy)) * self.maxHealth

        logging.info(
            f"Creature {self.id} now has {(self.currentEnergy / self.maxEnergy) * 100}% energy remaining")
