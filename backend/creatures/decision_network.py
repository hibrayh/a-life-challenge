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
            perceivablePrey,
            immediateResources,
            perceivableResources):
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
            perceivablePrey,
            immediateResources,
            perceivableResources):
        healthWeight = .1
        energyWeight = .1
        immediateMatesWeight = .8
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = -.8
        perceivablePreyWeight = 0
        immediateResourcesWeight = 0
        perceivableResourcesWeight = 0
        total = healthWeight + energyWeight + \
            immediateMatesWeight

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
                     perceivablePrey) +
                    (immediateResourcesWeight * immediateResources)
                    + (perceivableResourcesWeight * perceivableResources)) /
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
            perceivablePrey,
            immediateResources,
            perceivableResources):
        healthWeight = .5
        energyWeight = .5
        immediateMatesWeight = 0
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = -1
        perceivablePreyWeight = 0
        immediateResourcesWeight = 0
        perceivableResourcesWeight = 0
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
                     perceivablePrey) +
                    (immediateResourcesWeight * immediateResources)
                    + (perceivableResourcesWeight * perceivableResources)) /
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
            perceivablePrey,
            immediateResources,
            perceivableResources):
        healthWeight = .5
        energyWeight = .5
        immediateMatesWeight = -.7
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = -.7
        perceivablePreyWeight = 0
        immediateResourcesWeight = 0
        perceivableResourcesWeight = 0
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
                     perceivablePrey) +
                    (immediateResourcesWeight * immediateResources)
                    + (perceivableResourcesWeight * perceivableResources)) /
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
            perceivablePrey,
            immediateResources,
            perceivableResources):
        healthWeight = -.1
        energyWeight = -.1
        immediateMatesWeight = 0
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = 1
        perceivablePreyWeight = 0
        immediateResourcesWeight = 0
        perceivableResourcesWeight = 0
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
                     perceivablePrey) +
                    (immediateResourcesWeight * immediateResources)
                    + (perceivableResourcesWeight * perceivableResources)) /
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
            perceivablePrey,
            immediateResources,
            perceivableResources):
        healthWeight = .2
        energyWeight = -.3
        immediateMatesWeight = 0
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = 0
        perceivablePreyWeight = .8
        immediateResourcesWeight = -.1
        perceivableResourcesWeight = -.1
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
                     perceivablePrey) +
                    (immediateResourcesWeight * immediateResources)
                    + (perceivableResourcesWeight * perceivableResources)) /
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


class SearchForResourcesPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            health,
            energy,
            immediateMates,
            perceivableMates,
            perceivablePredators,
            perceivablePrey,
            immediateResources,
            perceivableResources):
        healthWeight = -.2
        energyWeight = -.2
        immediateMatesWeight = 0
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = 0
        perceivablePreyWeight = -.1
        immediateResourcesWeight = -.5
        perceivableResourcesWeight = 1
        total = perceivableResourcesWeight

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
                     perceivablePrey) +
                    (immediateResourcesWeight * immediateResources)
                    + (perceivableResourcesWeight * perceivableResources)) /
                   total, 0)

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_positive(creatureGenome.motivation, activation, 0.5)

        return activation


class ConsumeResourcesPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            health,
            energy,
            immediateMates,
            perceivableMates,
            perceivablePredators,
            perceivablePrey,
            immediateResources,
            perceivableResources):
        healthWeight = -.2
        energyWeight = -.2
        immediateMatesWeight = 0
        perceivableMatesWeight = 0
        perceivablePredatorsWeight = 0
        perceivablePreyWeight = 0
        immediateResourcesWeight = 1
        perceivableResourcesWeight = 0
        total = immediateResourcesWeight

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
                     perceivablePrey) +
                    (immediateResourcesWeight * immediateResources)
                    + (perceivableResourcesWeight * perceivableResources)) /
                   total, 0)

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_positive(creatureGenome.motivation, activation, 0.5)

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
        immediateResources = 0
        perceivableResources = 0

        for creature in perceivableEnvironment.perceivableCreatures:
            distanceFromCreature = (math.sqrt((abs(creature.xCoordinate -
                                                   creatureOfInterest.xCoordinate) ** 2) +
                                              (abs(creature.yCoordinate -
                                                   creatureOfInterest.yCoordinate) ** 2)))

            if (creature.species == creatureOfInterest.species) and (
                    distanceFromCreature <= 10) and (creature.canReproduce()):
                immediateMates += 1
            elif (creature.species == creatureOfInterest.species) and (creature.canReproduce()) and (distanceFromCreature > 10):
                perceivableMates += 1
            elif creatureOfInterest.speciesRelationship(creature.species) == species_manager.SpeciesRelationship.IS_HUNTED_BY:
                perceivablePredators += 1
            elif creatureOfInterest.speciesRelationship(creature.species) == species_manager.SpeciesRelationship.HUNTS:
                perceivablePrey += 1

        for resource in perceivableEnvironment.perceivableResources:
            distanceFromResource = (math.sqrt((abs(resource.xCoordinate -
                                                   creatureOfInterest.xCoordinate) ** 2) +
                                              (abs(resource.yCoordinate -
                                                   creatureOfInterest.yCoordinate) ** 2)))

            if distanceFromResource <= 10:
                immediateResources += 1
            else:
                perceivableResources += 1

        immediateMatesSignal = _determine_creature_perception_impact(
            immediateMates)
        perceivableMatesSignal = _determine_creature_perception_impact(
            perceivableMates)
        perceivablePredatorsSignal = _determine_creature_perception_impact(
            perceivablePredators)
        perceivablePreySignal = _determine_creature_perception_impact(
            perceivablePrey)
        immediateResourcesSignal = _determine_creature_perception_impact(
            immediateResources)
        perceivableResourcesSignal = _determine_creature_perception_impact(
            perceivableResources)

        activationValues = []

        for actionNode in self.actionNodes:
            environmentalFavorability = actionNode.getEnvironmentalFavorability(
                health,
                energy,
                immediateMatesSignal,
                perceivableMatesSignal,
                perceivablePredatorsSignal,
                perceivablePreySignal,
                immediateResourcesSignal,
                perceivableResourcesSignal)
            activationValues.append(
                actionNode.determineActivation(
                    environmentalFavorability,
                    creatureOfInterest.genome))

        logging.info(f"Activation values: {activationValues}")
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
        self.actionNodes.append(
            SearchForResourcesPerceptron(
                CreatureAction.SEARCH_FOR_FOOD))
        self.actionNodes.append(
            ConsumeResourcesPerceptron(
                CreatureAction.CONSUME_FOOD))

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
        self.actionNodes.append(
            SearchForResourcesPerceptron(
                CreatureAction.SEARCH_FOR_FOOD))
        self.actionNodes.append(
            ConsumeResourcesPerceptron(
                CreatureAction.CONSUME_FOOD))

    def determineMostFavorableCreatureAction(
            self, creatureOfInterest, perceivableEnvironment):
        return super().determineMostFavorableCreatureAction(
            creatureOfInterest, perceivableEnvironment)
