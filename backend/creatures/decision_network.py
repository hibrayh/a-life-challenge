import logging
from abc import ABCMeta, abstractmethod
from enum import Enum
import math


logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


UNIT = 10


class CreatureAction(str, Enum):
    REPRODUCE = 'REPRODUCE'
    SEARCH_FOR_FOOD = 'SEARCH_FOR_FOOD'
    CONSUME_FOOD = 'CONSUME_FOOD'
    SEARCH_FOR_MATE = 'SEARCH_FOR_MATE'
    FLEE_FROM_CREATURE = 'FLEE_FROM_CREATURE'
    CHASE_A_CREATURE = 'CHASE_A_CREATURE'
    ATTACK_A_CREATURE = 'ATTACK_A_CREATURE'
    SEEK_ALLIES = 'SEEK_ALLIES'
    LEECH_OFF_CREATURE = 'LEECH_OFF_CREATURE'
    SEEK_HOST = 'SEEK_HOST'
    EVADE_HOST = 'EVADE_HOST'
    SEEK_PARASITE = 'SEEK_PARASITE'
    EVADE_PARASITE = 'EVADE_PARASITE'
    PROTECT_CREATURE = 'PROTECT_CREATURE'
    SEEK_DEFENDEE = 'SEEK_DEFENDEE'
    SEEK_DEFENDER = 'SEEK_DEFENDER'
    NURTURE_CREATURE = 'NURTURE_CREATURE'
    SEEK_NURTUREE = 'SEEK_NURTUREE'
    SEEK_NURTURER = 'SEEK_NURTURER'
    BIRTHED = 'BIRTHED'
    DEAD = 'DEAD'
    NOTHING = 'NOTHING'


class Stimuli:
    def __init__(
            self,
            healthRatio,
            energyRatio,
            ageRatio,
            canReproduce,
            perceivableMates,
            immediateMates,
            perceivableResources,
            immediateResources,
            perceivablePredators,
            immediatePredators,
            perceivablePrey,
            immediatePrey,
            perceivableCompetitors,
            immediateCompetitors,
            perceivableAllies,
            immediateAllies,
            perceivableDefenders,
            immediateDefenders,
            perceivableDefendees,
            immediateDefendees,
            perceivableParasites,
            immediateParasites,
            perceivableHosts,
            immediateHosts,
            perceivableNurturers,
            immediateNurturers,
            perceivableNurturees,
            immediateNurturees):
        self.healthRatio = healthRatio
        self.energyRatio = energyRatio
        self.ageRatio = ageRatio
        self.canReproduce = canReproduce
        self.perceivableMates = perceivableMates
        self.immediateMates = immediateMates
        self.perceivableResources = perceivableResources
        self.immediateResources = immediateResources
        self.perceivablePredators = perceivablePredators
        self.immediatePredators = immediatePredators
        self.perceivablePrey = perceivablePrey
        self.immediatePrey = immediatePrey
        self.perceivableCompetitors = perceivableCompetitors
        self.immediateCompetitors = immediateCompetitors
        self.perceivableAllies = perceivableAllies
        self.immediateAllies = immediateAllies
        self.perceivableDefenders = perceivableDefenders
        self.immediateDefenders = immediateDefenders
        self.perceivableDefendees = perceivableDefendees
        self.immediateDefendees = immediateDefendees
        self.perceivableParasites = perceivableParasites
        self.immediateParasites = immediateParasites
        self.perceivableHosts = perceivableHosts
        self.immediateHosts = immediateHosts
        self.perceivableNurturers = perceivableNurturers
        self.immediateNurturers = immediateNurturers
        self.perceivableNurturees = perceivableNurturees
        self.immediateNurturees = immediateNurturees


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


def _determine_trait_weight_from_priority(priority, numberOfTraits):
    if priority != numberOfTraits:
        return (3 / 5) ** priority
    else:
        currentSum = 0
        for j in range(numberOfTraits - 1):
            currentSum += (3 / 5) ** priority
        return 1 - currentSum


class TriggerPerceptron(metaclass=ABCMeta):
    def __init__(self, actionType):
        self.actionType = actionType

    @abstractmethod
    def determinePossibility(self, stimuli):
        pass


class SexualReproductionTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return stimuli.canReproduce and (len(stimuli.immediateMates) > 0)


class AsexualReproductionTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return stimuli.canReproduce


class SearchForFoodTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (stimuli.energyRatio < 1) and (
            len(stimuli.immediateResources) == 0)


class ConsumeFoodTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (stimuli.energyRatio < 1) and (
            len(stimuli.immediateResources) > 0)


class SearchForMateTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return stimuli.canReproduce and (len(stimuli.immediateMates) == 0)


class FleeFromCreatureTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.perceivablePredators) > 0) or (
            len(stimuli.immediatePredators) > 0)


class ChaseCreatureTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.perceivablePrey) > 0) or (
            len(stimuli.immediatePrey) > 0)


class AttackCreatureTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.immediatePrey) > 0) \
            or (len(stimuli.immediatePredators) > 0) \
            or (len(stimuli.immediateCompetitors) > 0) \
            or (len(stimuli.immediateParasites) > 0) \
            or (len(stimuli.immediateHosts) > 0)


class SeekAlliesTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.immediateAllies) == 0)


class LeechOffCreatureTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.immediateHosts) > 0)


class SeekHostTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.immediateHosts) == 0)


class EvadeHostTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.immediateHosts) > 0) or (
            len(stimuli.perceivableHosts) > 0)


class SeekParasiteTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.immediateParasites) == 0)


class EvadeParasiteTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.immediateParasites) > 0) or (
            len(stimuli.perceivableParasites) > 0)


class ProtectCreatureTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return ((len(stimuli.perceivablePredators) > 0) or (
            len(stimuli.immediatePredators) > 0)) and (len(stimuli.immediateDefendees) > 0)


class SeekDefendeeTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.immediateDefendees) == 0)


class SeekDefenderTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.immediateDefenders) == 0)


class NurtureCreatureTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.perceivableNurturees) > 0)


class SeekNurtureeTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.immediateNurturees) > 0)


class SeekNurturerTrigger(TriggerPerceptron):
    def determinePossibility(self, stimuli):
        return (len(stimuli.immediateNurturers) > 0)


class ActionPerceptron(metaclass=ABCMeta):
    def __init__(self, actionType):
        self.actionType = actionType

    # Linear function of the perceptron
    @abstractmethod
    def getEnvironmentalFavorability(
            self,
            stimuli):
        pass

    # Activation function of the perceptron
    @abstractmethod
    def determineActivation(self, environmentalFavorability, creatureGenome):
        pass


class SexualReproductionPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            stimuli):
        numberOfPositiveFactors = 7
        healthRatioWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        energyRatioWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)
        immediateMatesWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)
        perceivableAlliesWeight = _determine_trait_weight_from_priority(
            7, numberOfPositiveFactors)
        immediateAlliesWeight = _determine_trait_weight_from_priority(
            5, numberOfPositiveFactors)
        perceivableDefendersWeight = _determine_trait_weight_from_priority(
            6, numberOfPositiveFactors)
        immediateDefendersWeight = _determine_trait_weight_from_priority(
            4, numberOfPositiveFactors)

        numberOfNegativeFactors = 5
        ageRatioWeight = -1 * \
            _determine_trait_weight_from_priority(5, numberOfNegativeFactors)
        perceivablePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(3, numberOfNegativeFactors)
        immediatePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)
        perceivableCompetitorsWeight = -1 * \
            _determine_trait_weight_from_priority(4, numberOfNegativeFactors)
        immediateCompetitorsWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)

        return (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (immediateMatesWeight * _determine_creature_perception_impact(len(stimuli.immediateMates))) \
            + (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))) \
            + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies))) \
            + (perceivableDefendersWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefenders))) \
            + (immediateDefendersWeight * _determine_creature_perception_impact(len(stimuli.immediateDefenders))) \
            + (ageRatioWeight * stimuli.ageRatio) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators))) \
            + (perceivableCompetitorsWeight * _determine_creature_perception_impact(len(stimuli.perceivableCompetitors))) \
            + (immediateCompetitorsWeight * _determine_creature_perception_impact(len(stimuli.immediateCompetitors)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.motivation,
            environmentalFavorability,
            0.5)

        return activation


class AsexualReproductionPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            stimuli):
        numberOfPositiveFactors = 6
        healthRatioWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)
        energyRatioWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        perceivableAlliesWeight = _determine_trait_weight_from_priority(
            6, numberOfPositiveFactors)
        immediateAlliesWeight = _determine_trait_weight_from_priority(
            4, numberOfPositiveFactors)
        perceivableDefendersWeight = _determine_trait_weight_from_priority(
            5, numberOfPositiveFactors)
        immediateDefendersWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)

        numberOfNegativeFactors = 5
        ageRatioWeight = -1 * \
            _determine_trait_weight_from_priority(5, numberOfNegativeFactors)
        perceivablePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(3, numberOfNegativeFactors)
        immediatePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)
        perceivableCompetitorsWeight = -1 * \
            _determine_trait_weight_from_priority(4, numberOfNegativeFactors)
        immediateCompetitorsWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)

        return (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))) \
            + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies))) \
            + (perceivableDefendersWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefenders))) \
            + (immediateDefendersWeight * _determine_creature_perception_impact(len(stimuli.immediateDefenders))) \
            + (ageRatioWeight * stimuli.ageRatio) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators))) \
            + (perceivableCompetitorsWeight * _determine_creature_perception_impact(len(stimuli.perceivableCompetitors))) \
            + (immediateCompetitorsWeight * _determine_creature_perception_impact(len(stimuli.immediateCompetitors)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.motivation,
            environmentalFavorability,
            0.5)

        return activation


class SearchForResourcesPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            stimuli):
        numberOfPositiveFactors = 5
        perceivableResourcesWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)
        perceivableAlliesWeight = _determine_trait_weight_from_priority(
            5, numberOfPositiveFactors)
        immediateAlliesWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)
        perceivableDefendersWeight = _determine_trait_weight_from_priority(
            4, numberOfPositiveFactors)
        immediateDefendersWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)

        numberOfNegativeFactors = 4
        healthRatioWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)
        energyRatioWeight = -1 * \
            _determine_trait_weight_from_priority(4, numberOfNegativeFactors)
        perceivablePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(3, numberOfNegativeFactors)
        immediatePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)

        return (perceivableResourcesWeight * _determine_creature_perception_impact(len(stimuli.perceivableResources))) \
            + (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))) \
            + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies))) \
            + (perceivableDefendersWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefenders))) \
            + (immediateDefendersWeight * _determine_creature_perception_impact(len(stimuli.immediateDefenders))) \
            + (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators)))

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
            stimuli):
        numberOfPositiveFactors = 7
        immediateResourcesWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)
        perceivableCompetitorsWeight = _determine_trait_weight_from_priority(
            7, numberOfPositiveFactors)
        immediateCompetitorsWeight = _determine_trait_weight_from_priority(
            6, numberOfPositiveFactors)
        perceivableAlliesWeight = _determine_trait_weight_from_priority(
            5, numberOfPositiveFactors)
        immediateAlliesWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)
        perceivableDefendersWeight = _determine_trait_weight_from_priority(
            4, numberOfPositiveFactors)
        immediateDefendersWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)

        numberOfNegativeFactors = 4
        healthRatioWeight = -1 * \
            _determine_trait_weight_from_priority(4, numberOfNegativeFactors)
        energyRatioWeight = -1 * \
            _determine_trait_weight_from_priority(3, numberOfNegativeFactors)
        perceivablePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)
        immediatePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)

        return (immediateResourcesWeight * _determine_creature_perception_impact(len(stimuli.immediateResources))) \
            + (perceivableCompetitorsWeight * _determine_creature_perception_impact(len(stimuli.perceivableCompetitors))) \
            + (immediateCompetitorsWeight * _determine_creature_perception_impact(len(stimuli.immediateCompetitors))) \
            + (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))) \
            + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies))) \
            + (perceivableDefendersWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefenders))) \
            + (immediateDefendersWeight * _determine_creature_perception_impact(len(stimuli.immediateDefenders))) \
            + (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_positive(creatureGenome.motivation, activation, 0.5)

        return activation


class SearchForMatePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            stimuli):
        numberOfPositiveFactors = 3
        healthRatioWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)
        energyRatioWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        perceivableMatesWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)

        numberOfNegativeFactors = 2
        perceivablePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)
        immediatePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)

        return (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (perceivableMatesWeight * _determine_creature_perception_impact(len(stimuli.perceivableMates))) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.motivation,
            environmentalFavorability,
            0.5)

        return activation


class FleeFromCreaturePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(
            self,
            stimuli):
        numberOfPostiveFactors = 4
        energyRatioWeight = _determine_trait_weight_from_priority(
            3, numberOfPostiveFactors)
        ageRatioWeight = _determine_trait_weight_from_priority(
            4, numberOfPostiveFactors)
        perceivablePredatorsWeight = _determine_trait_weight_from_priority(
            2, numberOfPostiveFactors)
        immediatePredatorsWeight = _determine_trait_weight_from_priority(
            1, numberOfPostiveFactors)

        numberOfNegativeFactors = 5
        healthRatioWeight = -1 * \
            _determine_trait_weight_from_priority(5, numberOfNegativeFactors)
        perceivableAlliesWeight = -1 * \
            _determine_trait_weight_from_priority(4, numberOfNegativeFactors)
        immediateAlliesWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)
        perceivableDefendersWeight = -1 * \
            _determine_trait_weight_from_priority(3, numberOfNegativeFactors)
        immediateDefendersWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)

        return (energyRatioWeight * stimuli.energyRatio) \
            + (ageRatioWeight * stimuli.ageRatio) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators))) \
            + (healthRatioWeight * stimuli.healthRatio) \
            + (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))) \
            + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies))) \
            + (perceivableDefendersWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefenders))) \
            + (immediateDefendersWeight * _determine_creature_perception_impact(len(stimuli.immediateDefenders)))

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
            stimuli):
        numberOfPositiveFactors = 6
        energyRatioWeight = _determine_trait_weight_from_priority(
            4, numberOfPositiveFactors)
        perceivablePreyWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)
        perceivableAlliesWeight = _determine_trait_weight_from_priority(
            5, numberOfPositiveFactors)
        immediateAlliesWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        perceivableDefendersWeight = _determine_trait_weight_from_priority(
            6, numberOfPositiveFactors)
        immediateDefendersWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)

        numberOfNegativeFactors = 3
        ageRatioWeight = -1 * \
            _determine_trait_weight_from_priority(3, numberOfNegativeFactors)
        perceivablePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)
        immediatePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)

        return (energyRatioWeight * stimuli.energyRatio) \
            + (perceivablePreyWeight * _determine_creature_perception_impact(len(stimuli.perceivablePrey))) \
            + (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))) \
            + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies))) \
            + (perceivableDefendersWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefenders))) \
            + (immediateDefendersWeight * _determine_creature_perception_impact(len(stimuli.immediateDefenders))) \
            + (ageRatioWeight * stimuli.ageRatio) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators)))

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


class AttackCreaturePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        numberOfPositiveFactors = 8
        healthRatioWeight = _determine_trait_weight_from_priority(
            5, numberOfPositiveFactors)
        energyRatioWeight = _determine_trait_weight_from_priority(
            6, numberOfPositiveFactors)
        immediatePreyWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)
        immediateCompetitorWeight = _determine_trait_weight_from_priority(
            4, numberOfPositiveFactors)
        perceivableAlliesWeight = _determine_trait_weight_from_priority(
            8, numberOfPositiveFactors)
        immediateAlliesWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)
        perceivableDefendersWeight = _determine_trait_weight_from_priority(
            7, numberOfPositiveFactors)
        immediateDefendersWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)

        numberOfNegativeFactors = 3
        ageRatioWeight = -1 * \
            _determine_trait_weight_from_priority(3, numberOfNegativeFactors)
        perceivablePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)
        immediatePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)

        return (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (immediatePreyWeight * _determine_creature_perception_impact(len(stimuli.immediatePrey))) \
            + (immediateCompetitorWeight * _determine_creature_perception_impact(len(stimuli.immediateCompetitors))) \
            + (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))) \
            + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies))) \
            + (perceivableDefendersWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefenders))) \
            + (immediateDefendersWeight * _determine_creature_perception_impact(len(stimuli.immediateDefenders))) \
            + (ageRatioWeight * stimuli.ageRatio) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.territorial,
            environmentalFavorability,
            0.5)
        activation = _skew_negative(
            creatureGenome.fightOrFlight, activation, 0.5)
        activation = _skew_positive(creatureGenome.hostility, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.offensiveAbility, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.defensiveAbility, activation, 0.5)

        return activation


class SeekAlliesPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        numberOfPositiveFactors = 2
        perceivableAlliesWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        immediateAlliesWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)

        return (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))
                ) + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_negative(
            creatureGenome.individualism, activation, 0.5)
        activation = _skew_negative(creatureGenome.hostility, activation, 0.5)

        return activation


class LeechOffCreaturePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        return 0.5

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.effectFromHost,
            environmentalFavorability,
            0.5)

        return activation


class SeekHostPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        return 0.5

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.effectFromHost,
            environmentalFavorability,
            0.5)

        return activation


class EvadeHostPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        numberOfPositiveFactors = 2
        perceivableHostsWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        immediateHostsWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)

        return (perceivableHostsWeight * _determine_creature_perception_impact(len(stimuli.perceivableHosts))
                ) + (immediateHostsWeight * _determine_creature_perception_impact(len(stimuli.immediateHosts)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_negative(
            creatureGenome.effectFromHost,
            environmentalFavorability,
            0.5)

        return activation


class SeekParasitePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        return 0.5

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.effectFromParasite,
            environmentalFavorability,
            0.5)

        return activation


class EvadeParasitePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        numberOfPositiveFactors = 2
        perceivableParasitesWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        immediateParasitesWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)

        return (perceivableParasitesWeight * _determine_creature_perception_impact(len(stimuli.perceivableParasites))
                ) + (immediateParasitesWeight * _determine_creature_perception_impact(len(stimuli.immediateParasites)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_negative(
            creatureGenome.effectFromParasite,
            environmentalFavorability,
            0.5)

        return activation


class ProtectCreaturePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        numberOfPositiveFactors = 3
        healthRatioWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        energyRatioWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)
        immediateDefendeesWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)

        numberOfNegativeFactors = 2
        perceivablePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)
        immediatePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)

        return (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (immediateDefendeesWeight * _determine_creature_perception_impact(len(stimuli.immediateDefendees))) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_negative(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_negative(
            creatureGenome.individualism, activation, 0.5)
        activation = _skew_negative(creatureGenome.hostility, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.defensiveAbility, activation, 0.5)
        activation = _skew_positive(creatureGenome.protecting, activation, 0.5)

        return activation


class SeekDefendeePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        numberOfPositiveFactors = 3
        healthRatioWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        energyRatioWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)
        perceivableDefendeesWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)

        numberOfNegativeFactors = 2
        perceivablePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)
        immediatePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)

        return (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (perceivableDefendeesWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefendees))) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_negative(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_negative(
            creatureGenome.individualism, activation, 0.5)
        activation = _skew_negative(creatureGenome.hostility, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.defensiveAbility, activation, 0.5)
        activation = _skew_positive(creatureGenome.protecting, activation, 0.5)

        return activation


class SeekDefenderPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        numberOfPositiveFactors = 4
        perceivablePredatorsWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)
        immediatePredatorsWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        perceivableDefendersWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)
        immediateDefendersWeight = _determine_trait_weight_from_priority(
            4, numberOfPositiveFactors)

        numberOfNegativeFactors = 4
        healthRatioWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)
        energyRatioWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)
        perceivableAlliesWeight = -1 * \
            _determine_trait_weight_from_priority(4, numberOfNegativeFactors)
        immediateAlliesWeight = -1 * \
            _determine_trait_weight_from_priority(3, numberOfNegativeFactors)

        return (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators))) \
            + (perceivableDefendersWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefenders))) \
            + (immediateDefendersWeight * _determine_creature_perception_impact(len(stimuli.immediateDefenders))) \
            + (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))) \
            + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_positive(
            creatureGenome.fightOrFlight, activation, 0.5)
        activation = _skew_negative(creatureGenome.hostility, activation, 0.5)
        activation = _skew_negative(
            creatureGenome.defensiveAbility, activation, 0.5)

        return activation


class NurtureCreaturePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        numberOfPositiveFactors = 7
        healthRatioWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        energyRatioWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)
        perceivableAlliesWeight = _determine_trait_weight_from_priority(
            7, numberOfPositiveFactors)
        immediateAlliesWeight = _determine_trait_weight_from_priority(
            5, numberOfPositiveFactors)
        perceivableDefendersWeight = _determine_trait_weight_from_priority(
            6, numberOfPositiveFactors)
        immediateDefendersWeight = _determine_trait_weight_from_priority(
            4, numberOfPositiveFactors)
        immediateNurtureesWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)

        numberOfNegativeFactors = 4
        perceivablePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(3, numberOfNegativeFactors)
        immediatePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)
        perceivableCompetitorsWeight = -1 * \
            _determine_trait_weight_from_priority(4, numberOfNegativeFactors)
        immediateCompetitorsWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)

        return (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))) \
            + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies))) \
            + (perceivableDefendersWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefenders))) \
            + (immediateDefendersWeight * _determine_creature_perception_impact(len(stimuli.immediateDefenders))) \
            + (immediateNurtureesWeight * _determine_creature_perception_impact(len(stimuli.immediateNurturees))) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators))) \
            + (perceivableCompetitorsWeight * _determine_creature_perception_impact(len(stimuli.perceivableCompetitors))) \
            + (immediateCompetitorsWeight * _determine_creature_perception_impact(len(stimuli.immediateCompetitors)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_negative(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_negative(
            creatureGenome.individualism, activation, 0.5)
        activation = _skew_negative(
            creatureGenome.territorial, activation, 0.5)
        activation = _skew_negative(creatureGenome.hostility, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.offensiveAbility, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.defensiveAbility, activation, 0.5)
        activation = _skew_positive(creatureGenome.nurturing, activation, 0.5)

        return activation


class SeekNurtureePerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        numberOfPositiveFactors = 7
        healthRatioWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        energyRatioWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)
        perceivableAlliesWeight = _determine_trait_weight_from_priority(
            7, numberOfPositiveFactors)
        immediateAlliesWeight = _determine_trait_weight_from_priority(
            5, numberOfPositiveFactors)
        perceivableDefendersWeight = _determine_trait_weight_from_priority(
            6, numberOfPositiveFactors)
        immediateDefendersWeight = _determine_trait_weight_from_priority(
            4, numberOfPositiveFactors)
        perceivableNurtureesWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)

        numberOfNegativeFactors = 4
        perceivablePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(3, numberOfNegativeFactors)
        immediatePredatorsWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)
        perceivableCompetitorsWeight = -1 * \
            _determine_trait_weight_from_priority(4, numberOfNegativeFactors)
        immediateCompetitorsWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)

        return (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))) \
            + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies))) \
            + (perceivableDefendersWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefenders))) \
            + (immediateDefendersWeight * _determine_creature_perception_impact(len(stimuli.immediateDefenders))) \
            + (perceivableNurtureesWeight * _determine_creature_perception_impact(len(stimuli.perceivableNurturees))) \
            + (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators))) \
            + (perceivableCompetitorsWeight * _determine_creature_perception_impact(len(stimuli.perceivableCompetitors))) \
            + (immediateCompetitorsWeight * _determine_creature_perception_impact(len(stimuli.immediateCompetitors)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_negative(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_negative(
            creatureGenome.individualism, activation, 0.5)
        activation = _skew_negative(
            creatureGenome.territorial, activation, 0.5)
        activation = _skew_negative(creatureGenome.hostility, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.offensiveAbility, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.defensiveAbility, activation, 0.5)
        activation = _skew_positive(creatureGenome.nurturing, activation, 0.5)

        return activation


class SeekNurturerPerceptron(ActionPerceptron):
    def getEnvironmentalFavorability(self, stimuli):
        numberOfPositiveFactors = 4
        perceivablePredatorsWeight = _determine_trait_weight_from_priority(
            4, numberOfPositiveFactors)
        immediatePredatorsWeight = _determine_trait_weight_from_priority(
            2, numberOfPositiveFactors)
        perceivableNurturersWeight = _determine_trait_weight_from_priority(
            3, numberOfPositiveFactors)
        immediateNurturersWeight = _determine_trait_weight_from_priority(
            1, numberOfPositiveFactors)

        numberOfNegativeFactors = 6
        healthRatioWeight = -1 * \
            _determine_trait_weight_from_priority(1, numberOfNegativeFactors)
        energyRatioWeight = -1 * \
            _determine_trait_weight_from_priority(2, numberOfNegativeFactors)
        perceivableAlliesWeight = -1 * \
            _determine_trait_weight_from_priority(6, numberOfNegativeFactors)
        immediateAlliesWeight = -1 * \
            _determine_trait_weight_from_priority(4, numberOfNegativeFactors)
        perceivableDefendersWeight = -1 * \
            _determine_trait_weight_from_priority(5, numberOfNegativeFactors)
        immediateDefendersWeight = -1 * \
            _determine_trait_weight_from_priority(3, numberOfNegativeFactors)

        return (perceivablePredatorsWeight * _determine_creature_perception_impact(len(stimuli.perceivablePredators))) \
            + (immediatePredatorsWeight * _determine_creature_perception_impact(len(stimuli.immediatePredators))) \
            + (perceivableNurturersWeight * _determine_creature_perception_impact(len(stimuli.perceivableNurturers))) \
            + (immediateNurturersWeight * _determine_creature_perception_impact(len(stimuli.immediateNurturers))) \
            + (healthRatioWeight * stimuli.healthRatio) \
            + (energyRatioWeight * stimuli.energyRatio) \
            + (perceivableAlliesWeight * _determine_creature_perception_impact(len(stimuli.perceivableAllies))) \
            + (immediateAlliesWeight * _determine_creature_perception_impact(len(stimuli.immediateAllies))) \
            + (perceivableDefendersWeight * _determine_creature_perception_impact(len(stimuli.perceivableDefenders))) \
            + (immediateDefendersWeight * _determine_creature_perception_impact(len(stimuli.immediateDefenders)))

    def determineActivation(self, environmentalFavorability, creatureGenome):
        activation = _skew_positive(
            creatureGenome.selfPreservation,
            environmentalFavorability,
            0.5)
        activation = _skew_negative(
            creatureGenome.individualism, activation, 0.5)
        activation = _skew_negative(
            creatureGenome.territorial, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.fightOrFlight, activation, 0.5)
        activation = _skew_negative(creatureGenome.hostility, activation, 0.5)
        activation = _skew_negative(
            creatureGenome.offensiveAbility, activation, 0.5)
        activation = _skew_negative(
            creatureGenome.defensiveAbility, activation, 0.5)
        activation = _skew_positive(
            creatureGenome.effectFromBeingNurtured, activation, 0.5)

        return activation


def _seperate_immediate_objects(objects, centralObject):
    immediate_objects = []
    distant_objects = []

    for object in objects:
        if abs(math.dist([object.xCoordinate, object.yCoordinate], [
               centralObject.xCoordinate, centralObject.yCoordinate])) <= UNIT:
            immediate_objects.append(object)
        else:
            distant_objects.append(object)

    return [immediate_objects, distant_objects]


def _cast_to_stimuli(creatureOfInterest, perceivableEnvironment):
    healthRatio = creatureOfInterest.currentHealth / creatureOfInterest.maxHealth
    energyRatio = creatureOfInterest.currentEnergy / creatureOfInterest.maxEnergy
    ageRatio = creatureOfInterest.currentAge / creatureOfInterest.maxAge
    canReproduce = creatureOfInterest.canReproduce()
    [immediateMates, perceivableMates] = _seperate_immediate_objects(
        perceivableEnvironment.perceivableMates, creatureOfInterest)
    [immediateResources, perceivableResources] = _seperate_immediate_objects(
        perceivableEnvironment.perceivableResources, creatureOfInterest)
    [immediatePredators, perceivablePredators] = _seperate_immediate_objects(
        perceivableEnvironment.perceivablePredators, creatureOfInterest)
    [immediatePrey, perceivablePrey] = _seperate_immediate_objects(
        perceivableEnvironment.perceivablePrey, creatureOfInterest)
    [immediateCompetitors, perceivableCompetitors] = _seperate_immediate_objects(
        perceivableEnvironment.perceivableCompetitors, creatureOfInterest)
    [immediateAllies, perceivableAllies] = _seperate_immediate_objects(
        perceivableEnvironment.perceivableAllies, creatureOfInterest)
    [immediateDefenders, perceivableDefenders] = _seperate_immediate_objects(
        perceivableEnvironment.perceivableDefenders, creatureOfInterest)
    [immediateDefendees, perceivableDefendees] = _seperate_immediate_objects(
        perceivableEnvironment.perceivableDefendees, creatureOfInterest)
    [immediateParasites, perceivableParasites] = _seperate_immediate_objects(
        perceivableEnvironment.perceivableParasites, creatureOfInterest)
    [immediateHosts, perceivableHosts] = _seperate_immediate_objects(
        perceivableEnvironment.perceivableHosts, creatureOfInterest)
    [immediateNurturers, perceivableNurturers] = _seperate_immediate_objects(
        perceivableEnvironment.perceivableNurturers, creatureOfInterest)
    [immediateNurturees, perceivableNurturees] = _seperate_immediate_objects(
        perceivableEnvironment.perceivableNurturees, creatureOfInterest)

    return Stimuli(
        healthRatio,
        energyRatio,
        ageRatio,
        canReproduce,
        perceivableMates,
        immediateMates,
        perceivableResources,
        immediateResources,
        perceivablePredators,
        immediatePredators,
        perceivablePrey,
        immediatePrey,
        perceivableCompetitors,
        immediateCompetitors,
        perceivableAllies,
        immediateAllies,
        perceivableDefenders,
        immediateDefenders,
        perceivableDefendees,
        immediateDefendees,
        perceivableParasites,
        immediateParasites,
        perceivableHosts,
        immediateHosts,
        perceivableNurturers,
        immediateNurturers,
        perceivableNurturees,
        immediateNurturees
    )


class DecisionNetwork(metaclass=ABCMeta):
    def __init__(self):
        self.actionNodes = []
        self.triggerNodes = []

    @abstractmethod
    def determineMostFavorableCreatureAction(
            self, creatureOfInterest, perceivableEnvironment):
        stimuli = _cast_to_stimuli(creatureOfInterest, perceivableEnvironment)

        activatedTriggerNodes = []
        for trigger in self.triggerNodes:
            if trigger.determinePossibility(stimuli):
                activatedTriggerNodes.append(
                    CreatureAction(trigger.actionType))

        logging.info(f"Triggers {activatedTriggerNodes}")

        activationValues = []
        for action in self.actionNodes:
            if CreatureAction(action.actionType) in activatedTriggerNodes:
                environmentalFavorability = action.getEnvironmentalFavorability(
                    stimuli)
                activationValues.append(
                    action.determineActivation(
                        environmentalFavorability,
                        creatureOfInterest.genome))

        # Recall a past similar event
        similarMemories = creatureOfInterest.memory.searchForResponseToSimilarSituation(
            stimuli, tolerance=(1 - creatureOfInterest.genome.shortTermMemoryAccuracy))
        beneficialMemory = None
        for memory in similarMemories:
            if memory.netActionBenefit.netGain() > (
                    creatureOfInterest.genome.impulsivity * 2):
                beneficialMemory = memory
                break

        if beneficialMemory is None:
            logging.info(f"Activation values: {activationValues}")
            mostLikelyDecision = CreatureAction(
                activatedTriggerNodes[activationValues.index(max(activationValues))])
            return mostLikelyDecision
        else:
            logging.info(f"Using past memory")
            return beneficialMemory.actionPerformed


class DecisionNetworkSexual(DecisionNetwork):
    def __init__(self):
        self.triggerNodes = []
        self.triggerNodes.append(
            SexualReproductionTrigger(
                CreatureAction.REPRODUCE))
        self.triggerNodes.append(
            SearchForFoodTrigger(
                CreatureAction.SEARCH_FOR_FOOD))
        self.triggerNodes.append(
            ConsumeFoodTrigger(
                CreatureAction.CONSUME_FOOD))
        self.triggerNodes.append(
            SearchForMateTrigger(
                CreatureAction.SEARCH_FOR_MATE))
        self.triggerNodes.append(
            FleeFromCreatureTrigger(
                CreatureAction.FLEE_FROM_CREATURE))
        self.triggerNodes.append(
            ChaseCreatureTrigger(
                CreatureAction.CHASE_A_CREATURE))
        self.triggerNodes.append(
            AttackCreatureTrigger(
                CreatureAction.ATTACK_A_CREATURE
            )
        )
        self.triggerNodes.append(
            SeekAlliesTrigger(
                CreatureAction.SEEK_ALLIES
            )
        )
        self.triggerNodes.append(
            LeechOffCreatureTrigger(
                CreatureAction.LEECH_OFF_CREATURE
            )
        )
        self.triggerNodes.append(
            SeekHostTrigger(
                CreatureAction.SEEK_HOST
            )
        )
        self.triggerNodes.append(
            EvadeHostTrigger(
                CreatureAction.EVADE_HOST
            )
        )
        self.triggerNodes.append(
            SeekParasiteTrigger(
                CreatureAction.SEEK_PARASITE
            )
        )
        self.triggerNodes.append(
            EvadeParasiteTrigger(
                CreatureAction.EVADE_PARASITE
            )
        )
        self.triggerNodes.append(
            ProtectCreatureTrigger(
                CreatureAction.PROTECT_CREATURE
            )
        )
        self.triggerNodes.append(
            SeekDefendeeTrigger(
                CreatureAction.SEEK_DEFENDEE
            )
        )
        self.triggerNodes.append(
            SeekDefenderTrigger(
                CreatureAction.SEEK_DEFENDER
            )
        )
        self.triggerNodes.append(
            NurtureCreatureTrigger(
                CreatureAction.NURTURE_CREATURE
            )
        )
        self.triggerNodes.append(
            SeekNurtureeTrigger(
                CreatureAction.SEEK_NURTUREE
            )
        )
        self.triggerNodes.append(
            SeekNurturerTrigger(
                CreatureAction.SEEK_NURTURER
            )
        )

        self.actionNodes = []
        self.actionNodes.append(
            SexualReproductionPerceptron(
                CreatureAction.REPRODUCE))
        self.actionNodes.append(
            SearchForResourcesPerceptron(
                CreatureAction.SEARCH_FOR_FOOD))
        self.actionNodes.append(
            ConsumeResourcesPerceptron(
                CreatureAction.CONSUME_FOOD))
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
            AttackCreaturePerceptron(
                CreatureAction.ATTACK_A_CREATURE
            )
        )
        self.actionNodes.append(
            SeekAlliesPerceptron(
                CreatureAction.SEEK_ALLIES
            )
        )
        self.actionNodes.append(
            LeechOffCreaturePerceptron(
                CreatureAction.LEECH_OFF_CREATURE
            )
        )
        self.actionNodes.append(
            SeekHostPerceptron(
                CreatureAction.SEEK_HOST
            )
        )
        self.actionNodes.append(
            EvadeHostPerceptron(
                CreatureAction.EVADE_HOST
            )
        )
        self.actionNodes.append(
            SeekParasitePerceptron(
                CreatureAction.SEEK_PARASITE
            )
        )
        self.actionNodes.append(
            EvadeParasitePerceptron(
                CreatureAction.EVADE_PARASITE
            )
        )
        self.actionNodes.append(
            ProtectCreaturePerceptron(
                CreatureAction.PROTECT_CREATURE
            )
        )
        self.actionNodes.append(
            SeekDefendeePerceptron(
                CreatureAction.SEEK_DEFENDEE
            )
        )
        self.actionNodes.append(
            SeekDefenderPerceptron(
                CreatureAction.SEEK_DEFENDER
            )
        )
        self.actionNodes.append(
            NurtureCreaturePerceptron(
                CreatureAction.NURTURE_CREATURE
            )
        )
        self.actionNodes.append(
            SeekNurtureePerceptron(
                CreatureAction.SEEK_NURTUREE
            )
        )
        self.actionNodes.append(
            SeekNurturerPerceptron(
                CreatureAction.SEEK_NURTURER
            )
        )

    def determineMostFavorableCreatureAction(
            self, creatureOfInterest, perceivableEnvironment):
        return super().determineMostFavorableCreatureAction(
            creatureOfInterest, perceivableEnvironment)


class DecisionNetworkAsexual(DecisionNetwork):
    def __init__(self):
        self.triggerNodes = []
        self.triggerNodes.append(
            AsexualReproductionTrigger(
                CreatureAction.REPRODUCE))
        self.triggerNodes.append(
            SearchForFoodTrigger(
                CreatureAction.SEARCH_FOR_FOOD))
        self.triggerNodes.append(
            ConsumeFoodTrigger(
                CreatureAction.CONSUME_FOOD))
        self.triggerNodes.append(
            FleeFromCreatureTrigger(
                CreatureAction.FLEE_FROM_CREATURE))
        self.triggerNodes.append(
            ChaseCreatureTrigger(
                CreatureAction.CHASE_A_CREATURE))
        self.triggerNodes.append(
            AttackCreatureTrigger(
                CreatureAction.ATTACK_A_CREATURE
            )
        )
        self.triggerNodes.append(
            SeekAlliesTrigger(
                CreatureAction.SEEK_ALLIES
            )
        )
        self.triggerNodes.append(
            LeechOffCreatureTrigger(
                CreatureAction.LEECH_OFF_CREATURE
            )
        )
        self.triggerNodes.append(
            SeekHostTrigger(
                CreatureAction.SEEK_HOST
            )
        )
        self.triggerNodes.append(
            EvadeHostTrigger(
                CreatureAction.EVADE_HOST
            )
        )
        self.triggerNodes.append(
            SeekParasiteTrigger(
                CreatureAction.SEEK_PARASITE
            )
        )
        self.triggerNodes.append(
            EvadeParasiteTrigger(
                CreatureAction.EVADE_PARASITE
            )
        )
        self.triggerNodes.append(
            ProtectCreatureTrigger(
                CreatureAction.PROTECT_CREATURE
            )
        )
        self.triggerNodes.append(
            SeekDefendeeTrigger(
                CreatureAction.SEEK_DEFENDEE
            )
        )
        self.triggerNodes.append(
            SeekDefenderTrigger(
                CreatureAction.SEEK_DEFENDER
            )
        )
        self.triggerNodes.append(
            NurtureCreatureTrigger(
                CreatureAction.NURTURE_CREATURE
            )
        )
        self.triggerNodes.append(
            SeekNurtureeTrigger(
                CreatureAction.SEEK_NURTUREE
            )
        )
        self.triggerNodes.append(
            SeekNurturerTrigger(
                CreatureAction.SEEK_NURTURER
            )
        )

        self.actionNodes = []
        self.actionNodes.append(
            AsexualReproductionPerceptron(
                CreatureAction.REPRODUCE))
        self.actionNodes.append(
            SearchForResourcesPerceptron(
                CreatureAction.SEARCH_FOR_FOOD))
        self.actionNodes.append(
            ConsumeResourcesPerceptron(
                CreatureAction.CONSUME_FOOD))
        self.actionNodes.append(
            FleeFromCreaturePerceptron(
                CreatureAction.FLEE_FROM_CREATURE))
        self.actionNodes.append(
            ChaseACreaturePerceptron(
                CreatureAction.CHASE_A_CREATURE))
        self.actionNodes.append(
            AttackCreaturePerceptron(
                CreatureAction.ATTACK_A_CREATURE
            )
        )
        self.actionNodes.append(
            SeekAlliesPerceptron(
                CreatureAction.SEEK_ALLIES
            )
        )
        self.actionNodes.append(
            LeechOffCreaturePerceptron(
                CreatureAction.LEECH_OFF_CREATURE
            )
        )
        self.actionNodes.append(
            SeekHostPerceptron(
                CreatureAction.SEEK_HOST
            )
        )
        self.actionNodes.append(
            EvadeHostPerceptron(
                CreatureAction.EVADE_HOST
            )
        )
        self.actionNodes.append(
            SeekParasitePerceptron(
                CreatureAction.SEEK_PARASITE
            )
        )
        self.actionNodes.append(
            EvadeParasitePerceptron(
                CreatureAction.EVADE_PARASITE
            )
        )
        self.actionNodes.append(
            ProtectCreaturePerceptron(
                CreatureAction.PROTECT_CREATURE
            )
        )
        self.actionNodes.append(
            SeekDefendeePerceptron(
                CreatureAction.SEEK_DEFENDEE
            )
        )
        self.actionNodes.append(
            SeekDefenderPerceptron(
                CreatureAction.SEEK_DEFENDER
            )
        )
        self.actionNodes.append(
            NurtureCreaturePerceptron(
                CreatureAction.NURTURE_CREATURE
            )
        )
        self.actionNodes.append(
            SeekNurtureePerceptron(
                CreatureAction.SEEK_NURTUREE
            )
        )
        self.actionNodes.append(
            SeekNurturerPerceptron(
                CreatureAction.SEEK_NURTURER
            )
        )

    def determineMostFavorableCreatureAction(
            self, creatureOfInterest, perceivableEnvironment):
        return super().determineMostFavorableCreatureAction(
            creatureOfInterest, perceivableEnvironment)
