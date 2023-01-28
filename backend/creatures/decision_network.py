import logging
from abc import ABCMeta, abstractmethod
from enum import Enum
import math
from . import species_manager

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


class CreatureAction(str, Enum):
    REPRODUCE = 'REPRODUCE'
    SEARCH_FOR_FOOD = 'SEARCH_FOR_FOOD'
    CONSUME_FOOD = 'CONSUME_FOOD'
    SEARCH_FOR_MATE = 'SEARCH_FOR_MATE'
    HIDE_FROM_CREATURE = 'HIDE_FROM_CREATURE'
    FLEE_FROM_CREATURE = 'FLEE_FROM_CREATURE'
    CHASE_A_CREATURE = 'CHASE_A_CREATURE'
    ATTACK_A_CREATURE = 'ATTACK_A_CREATURE'
    LEAD_OTHER_CREATURES = 'LEAD_OTHER_CREATURES'
    FOLLOW_A_CREATURE = 'FOLLOW_A_CREATURE'
    LEECH_OFF_CREATURE = 'LEECH_OFF_CREATURE'
    WORK_WITH_CREATURE = 'WORK_WITH_CREATURE'
    PROTECT_CREATURE = 'PROTECT_CREATURE'
    AVOID_HAZARD = 'AVOID_HAZARD'
    SCAN_AREA = 'SCAN_AREA'
    NURTURE_CREATURE = 'NURTURE_CREATURE'
    BIRTHED = 'BIRTHED'
    DEAD = 'DEAD'


def _skew_positive(traitValue, environmentalFavorability, midPoint):
    if traitValue < midPoint:
        return (((-1 * environmentalFavorability) / ((-1 * midPoint) ** 3))
                * ((traitValue - midPoint) ** 3) + environmentalFavorability)
    else:
        return (((1 - environmentalFavorability) / ((1 - midPoint) ** 3))
                * ((traitValue - midPoint) ** 3) + environmentalFavorability)


def _skew_negative(traitValue, environmentalFavorability, midPoint):
    if traitValue < midPoint:
        return (((1 - environmentalFavorability) / ((-1 * midPoint) ** 3))
                * ((traitValue - midPoint) ** 3) + environmentalFavorability)
    else:
        return (((-1 * environmentalFavorability) / ((1 - midPoint) ** 3))
                * ((traitValue - midPoint) ** 3) + environmentalFavorability)


def _determine_creature_perception_impact(numberOfCreatures):
    return (-1 * math.exp(-.7 * numberOfCreatures)) + 1


class ActionPerceptron(metaclass=ABCMeta):
    def __init__(self, actionType):
        self.actionType = actionType

    # Linear function of the perceptron
    @abstractmethod
    def getEnvironmentalFavorability(
            self,
            health,
            energy,
            immediateMates,
            perceivableMates,
            perceivablePredators,
            perceivablePrey):
        pass

    # Activation function of the perceptron
    @abstractmethod
    def determineActivation(self, environmentalFavorability, creatureGenome):
        pass


class SexualReproductionPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            health,
            energy,
            immediateMates,
            perceivableMates,
            perceivablePredators,
            perceivablePrey):
        healthWeight = .1
        energyWeight = .1
        immediateMatesWeight = .8
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = -.8
        perceivablePreyWeight = 0
        total = healthWeight + energyWeight + \
            immediateMatesWeight + perceivablePredatorsWeight
        logging.info(f"DEBUG: total = {total}")

        return max(((healthWeight *
                     health) +
                    (energyWeight *
                     energy) +
                    (immediateMatesWeight *
                     immediateMates) +
                    (perceivableMatesWeight *
                     perceivableMates) +
                    (perceivablePredatorsWeight *
                     perceivablePredators) +
                    (perceivablePreyWeight *
                     perceivablePrey)) /
                   total, 0)

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.motivation,
            environmentalFavorability,
            0.5)

        return activation


class AsexualReproductionPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            health,
            energy,
            immediateMates,
            perceivableMates,
            perceivablePredators,
            perceivablePrey):
        healthWeight = .5
        energyWeight = .5
        immediateMatesWeight = 0
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = -1
        perceivablePreyWeight = 0
        total = healthWeight + energyWeight

        return max(((healthWeight *
                     health) +
                    (energyWeight *
                     energy) +
                    (immediateMatesWeight *
                     immediateMates) +
                    (perceivableMatesWeight *
                     perceivableMates) +
                    (perceivablePredatorsWeight *
                     perceivablePredators) +
                    (perceivablePreyWeight *
                     perceivablePrey)) /
                   total, 0)

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.motivation,
            environmentalFavorability,
            0.5)

        return activation


class SearchForMatePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            health,
            energy,
            immediateMates,
            perceivableMates,
            perceivablePredators,
            perceivablePrey):
        healthWeight = .5
        energyWeight = .5
        immediateMatesWeight = -.2
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = -.8
        perceivablePreyWeight = 0
        total = healthWeight + energyWeight

        return max(((healthWeight *
                     health) +
                    (energyWeight *
                     energy) +
                    (immediateMatesWeight *
                     immediateMates) +
                    (perceivableMatesWeight *
                     perceivableMates) +
                    (perceivablePredatorsWeight *
                     perceivablePredators) +
                    (perceivablePreyWeight *
                     perceivablePrey)) /
                   total, 0)

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.motivation,
            environmentalFavorability,
            0.5)

        return activation


class FleeFromCreaturePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            health,
            energy,
            immediateMates,
            perceivableMates,
            perceivablePredators,
            perceivablePrey):
        healthWeight = -.1
        energyWeight = -.1
        immediateMatesWeight = 0
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = 1
        perceivablePreyWeight = 0
        total = perceivablePredatorsWeight

        return max(((healthWeight *
                     health) +
                    (energyWeight *
                     energy) +
                    (immediateMatesWeight *
                     immediateMates) +
                    (perceivableMatesWeight *
                     perceivableMates) +
                    (perceivablePredatorsWeight *
                     perceivablePredators) +
                    (perceivablePreyWeight *
                     perceivablePrey)) /
                   total, 0)

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_positive(
            creatureGenome.fightOrFlight, activation, 0.5)
        activation = _skew_negative(
            creatureGenome.offensiveAbility, activation, 0.5)
        activation = _skew_negative(
            creatureGenome.defensiveAbility, activation, 0.5)

        return activation


class ChaseACreaturePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            health,
            energy,
            immediateMates,
            perceivableMates,
            perceivablePredators,
            perceivablePrey):
        healthWeight = .1
        energyWeight = .1
        immediateMatesWeight = 0
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = 0
        perceivablePreyWeight = .8
        total = healthWeight + energyWeight + perceivablePreyWeight

        return max(((healthWeight *
                     health) +
                    (energyWeight *
                     energy) +
                    (immediateMatesWeight *
                     immediateMates) +
                    (perceivableMatesWeight *
                     perceivableMates) +
                    (perceivablePredatorsWeight *
                     perceivablePredators) +
                    (perceivablePreyWeight *
                     perceivablePrey)) /
                   total, 0)

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_negative(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_negative(
            creatureGenome.fightOrFlight, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.offensiveAbility, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.defensiveAbility, activation, 0.5)

        return activation


class DecisionNetwork(metaclass=ABCMeta):
    def __init__(self):
        self.actionNodes = []

    @abstractmethod
    def determineMostFavorableCreatureAction(
            self, creatureOfInterest, perceivableEnvironment):
        health = creatureOfInterest.currentHealth / creatureOfInterest.maxHealth
        energy = creatureOfInterest.currentEnergy / creatureOfInterest.maxEnergy
        immediateMates = 0
        perceivableMates = 0
        perceivablePredators = 0
        perceivablePrey = 0

        for creature in perceivableEnvironment.perceivableCreatures:
            distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                   creatureOfInterest.xCoordinate) ** 2) +
                                              (abs(creature.yCoordinate -
                                                   creatureOfInterest.yCoordinate) ** 2)))

            if (creature.species == creatureOfInterest.species) and (
                    distanceFromCreature <= 1):
                immediateMates += 1
            elif creature.species == creatureOfInterest.species:
                perceivableMates += 1
            elif creatureOfInterest.speciesRelationship(creature.species) == species_manager.SpeciesRelationship.IS_HUNTED_BY:
                perceivablePredators += 1
            elif creatureOfInterest.speciesRelationship(creature.species) == species_manager.SpeciesRelationship.HUNTS:
                perceivablePrey += 1

        immediateMatesSignal = _determine_creature_perception_impact(
            immediateMates)
        perceivableMatesSignal = _determine_creature_perception_impact(
            perceivableMates)
        perceivablePredatorsSignal = _determine_creature_perception_impact(
            perceivablePredators)
        perceivablePreySignal = _determine_creature_perception_impact(
            perceivablePrey)

        activationValues = []

        for actionNode in self.actionNodes:
            environmentalFavorability = actionNode.getEnvironmentalFavorability(
                health,
                energy,
                immediateMatesSignal,
                perceivableMatesSignal,
                perceivablePredatorsSignal,
                perceivablePreySignal)
            activationValues.append(
                actionNode.determineActivation(
                    environmentalFavorability,
                    creatureOfInterest.genome))

        mostLikelyDecision = self.actionNodes[activationValues.index(
            max(activationValues))].actionType
        return mostLikelyDecision


class DecisionNetworkSexual(DecisionNetwork):
    def __init__(self):
        self.actionNodes = []
        self.actionNodes.append(
            SexualReproductionPerceptron(
                CreatureAction.REPRODUCE))
        self.actionNodes.append(
            SearchForMatePerceptron(
                CreatureAction.SEARCH_FOR_MATE))
        self.actionNodes.append(
            FleeFromCreaturePerceptron(
                CreatureAction.FLEE_FROM_CREATURE))
        self.actionNodes.append(
            ChaseACreaturePerceptron(
                CreatureAction.CHASE_A_CREATURE))

    def determineMostFavorableCreatureAction(
            self, creatureOfInterest, perceivableEnvironment):
        return super().determineMostFavorableCreatureAction(
            creatureOfInterest, perceivableEnvironment)


class DecisionNetworkAsexual(DecisionNetwork):
    def __init__(self):
        self.actionNodes = []
        self.actionNodes.append(
            AsexualReproductionPerceptron(
                CreatureAction.REPRODUCE))
        self.actionNodes.append(
            FleeFromCreaturePerceptron(
                CreatureAction.FLEE_FROM_CREATURE))
        self.actionNodes.append(
            ChaseACreaturePerceptron(
                CreatureAction.CHASE_A_CREATURE))

    def determineMostFavorableCreatureAction(
            self, creatureOfInterest, perceivableEnvironment):
        return super().determineMostFavorableCreatureAction(
            creatureOfInterest, perceivableEnvironment)
