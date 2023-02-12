import logging
import random
from enum import Enum

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')

MinorVariationConstant = 0.01


class Receptors(Enum):
    VISION = 1
    SMELL = 2
    HEAR = 3


class ReproductionType(Enum):
    ASEXUAL = 1
    SEXUAL = 2


class Genome:
    def __init__(
            self,
            visibility,
            maxHealth,
            receptors,
            sightAbility,
            smellAbility,
            hearingAbility,
            sightRange,
            smellRange,
            hearingRange,
            reactionTime,
            intelligence,
            selfPreservation,
            mobility,
            reproductionType,
            offspringAmount,
            motivation,
            maxEnergy,
            individualism,
            territorial,
            fightOrFlight,
            hostility,
            scent,
            stealth,
            lifeExpectancy,
            offensiveAbility,
            defensiveAbility,
            shape,
            color):
        logging.info("Creating new genome object")

        self.visibility = visibility
        self.maxHealth = maxHealth
        self.receptors = receptors
        self.sightAbility = sightAbility
        self.smellAbility = smellAbility
        self.hearingAbility = hearingAbility
        self.sightRange = sightRange
        self.smellRange = smellRange
        self.hearingRange = hearingRange
        self.reactionTime = reactionTime
        self.intelligence = intelligence
        self.selfPreservation = selfPreservation
        self.mobility = mobility
        self.reproductionType = reproductionType
        self.offspringAmount = offspringAmount
        self.motivation = motivation
        self.maxEnergy = maxEnergy
        self.individualism = individualism
        self.territorial = territorial
        self.fightOrFlight = fightOrFlight
        self.hostility = hostility
        self.scent = scent
        self.stealth = stealth
        self.lifeExpectancy = lifeExpectancy
        self.offensiveAbility = offensiveAbility
        self.defensiveAbility = defensiveAbility
        self.shape = shape
        self.color = color

    def serialize(self):
        canSee = Receptors.VISION in self.receptors
        canSmell = Receptors.SMELL in self.receptors
        canHear = Receptors.HEAR in self.receptors
        reproType = 'Sexual' if self.reproductionType == ReproductionType.SEXUAL else 'Asexual'

        return {
            'visibility': self.visibility,
            'maxHealth': self.maxHealth,
            'canSee': canSee,
            'canSmell': canSmell,
            'canHear': canHear,
            'sightAbility': self.sightAbility,
            'smellAbility': self.smellAbility,
            'hearingAbility': self.hearingAbility,
            'sightRange': self.sightRange,
            'smellRange': self.smellRange,
            'hearingRange': self.hearingRange,
            'reactionTime': self.reactionTime,
            'intelligence': self.intelligence,
            'selfPreservation': self.selfPreservation,
            'mobility': self.mobility,
            'reproductionType': reproType,
            'offspringAmount': self.offspringAmount,
            'motivation': self.motivation,
            'maxEnergy': self.maxEnergy,
            'individualism': self.individualism,
            'territorial': self.territorial,
            'fightOrFlight': self.fightOrFlight,
            'hostility': self.hostility,
            'scent': self.scent,
            'stealth': self.stealth,
            'lifeExpectancy': self.lifeExpectancy,
            'offensiveAbility': self.offensiveAbility,
            'defensiveAbility': self.defensiveAbility,
            'shape': self.shape,
            'color': self.color,
        }


def _generateTraitValue(valA, valB):
    smallerVal = min([valA, valB])
    largerVal = max([valA, valB])
    mean = smallerVal + ((largerVal - smallerVal) / 2)
    return random.normalvariate(mean, MinorVariationConstant)


def createNewGenomeSexual(parentAGenome, parentBGenome):
    logging.info("Creating new Genome object via sexual reproduction")

    return Genome(
        _generateTraitValue(parentAGenome.visibility, parentBGenome.visibility),
        _generateTraitValue(parentAGenome.maxHealth, parentBGenome.maxHealth),
        parentAGenome.receptors,
        _generateTraitValue(parentAGenome.sightAbility, parentBGenome.sightAbility),
        _generateTraitValue(parentAGenome.smellAbility, parentBGenome.smellAbility),
        _generateTraitValue(parentAGenome.hearingAbility, parentBGenome.hearingAbility),
        _generateTraitValue(parentAGenome.sightRange, parentBGenome.sightRange),
        _generateTraitValue(parentAGenome.smellRange, parentBGenome.smellRange),
        _generateTraitValue(parentAGenome.hearingRange, parentBGenome.hearingRange),
        _generateTraitValue(parentAGenome.reactionTime, parentBGenome.reactionTime),
        _generateTraitValue(parentAGenome.intelligence, parentBGenome.intelligence),
        _generateTraitValue(parentAGenome.selfPreservation, parentBGenome.selfPreservation),
        _generateTraitValue(parentAGenome.mobility, parentBGenome.mobility),
        parentAGenome.reproductionType,
        parentAGenome.offspringAmount,
        _generateTraitValue(parentAGenome.motivation, parentBGenome.motivation),
        _generateTraitValue(parentAGenome.maxEnergy, parentBGenome.maxEnergy),
        _generateTraitValue(parentAGenome.individualism, parentBGenome.individualism),
        _generateTraitValue(parentAGenome.territorial, parentBGenome.territorial),
        _generateTraitValue(parentAGenome.fightOrFlight, parentBGenome.fightOrFlight),
        _generateTraitValue(parentAGenome.hostility, parentBGenome.hostility),
        _generateTraitValue(parentAGenome.scent, parentBGenome.scent),
        _generateTraitValue(parentAGenome.stealth, parentBGenome.stealth),
        _generateTraitValue(parentAGenome.lifeExpectancy, parentBGenome.lifeExpectancy),
        _generateTraitValue(parentAGenome.offensiveAbility, parentBGenome.offensiveAbility),
        _generateTraitValue(parentAGenome.defensiveAbility, parentBGenome.defensiveAbility),
        parentAGenome.shape,
        parentAGenome.color
    )


def createNewGenomeAsexual(parentGenome):
    logging.info("Creating new Genome object via asexual reproduction")

    return Genome(
        random.normalvariate(parentGenome.visibility, MinorVariationConstant),
        random.normalvariate(parentGenome.maxHealth, MinorVariationConstant),
        parentGenome.receptors,
        random.normalvariate(parentGenome.sightAbility, MinorVariationConstant),
        random.normalvariate(parentGenome.smellAbility, MinorVariationConstant),
        random.normalvariate(parentGenome.hearingAbility, MinorVariationConstant),
        random.normalvariate(parentGenome.sightRange, MinorVariationConstant),
        random.normalvariate(parentGenome.smellRange, MinorVariationConstant),
        random.normalvariate(parentGenome.hearingRange, MinorVariationConstant),
        random.normalvariate(parentGenome.reactionTime, MinorVariationConstant),
        random.normalvariate(parentGenome.intelligence, MinorVariationConstant),
        random.normalvariate(parentGenome.selfPreservation, MinorVariationConstant),
        random.normalvariate(parentGenome.mobility, MinorVariationConstant),
        parentGenome.reproductionType,
        parentGenome.offspringAmount,
        random.normalvariate(parentGenome.motivation, MinorVariationConstant),
        random.normalvariate(parentGenome.maxEnergy, MinorVariationConstant),
        random.normalvariate(parentGenome.individualism, MinorVariationConstant),
        random.normalvariate(parentGenome.territorial, MinorVariationConstant),
        random.normalvariate(parentGenome.fightOrFlight, MinorVariationConstant),
        random.normalvariate(parentGenome.hostility, MinorVariationConstant),
        random.normalvariate(parentGenome.scent, MinorVariationConstant),
        random.normalvariate(parentGenome.stealth, MinorVariationConstant),
        random.normalvariate(parentGenome.lifeExpectancy, MinorVariationConstant),
        random.normalvariate(parentGenome.offensiveAbility, MinorVariationConstant),
        random.normalvariate(parentGenome.defensiveAbility, MinorVariationConstant),
        parentGenome.shape,
        parentGenome.color
    )
