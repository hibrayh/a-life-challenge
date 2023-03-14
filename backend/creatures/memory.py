import logging
import random
import math


logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


# Constant representing the maximum possible percent a short-term memory
# can be altered after a single tick (current 10%)
MAX_STM_DEGREDATION_PERTURBATION = 0.1

# Constant representing the maximum possible short-term memory capacity
# (in ticks)
MAX_STM_CAPACITY = 100


def _determine_creature_perception_impact(numberOfCreatures):
    return (-1 * math.exp(-.7 * numberOfCreatures)) + 1


class StoredStimuli:
    def __init__(
            self,
            stimuli,
            healthRatio,
            energyRatio,
            loadExistingSave=False,
            saveData=None):
        if not loadExistingSave:
            self.healthRatio = healthRatio
            self.energyRatio = energyRatio
            self.perceivableMatesSignal = _determine_creature_perception_impact(
                len(stimuli.perceivableMates))
            self.perceivableResourcesSignal = _determine_creature_perception_impact(
                len(stimuli.perceivableResources))
            self.perceivablePredatorsSignal = _determine_creature_perception_impact(
                len(stimuli.perceivablePredators))
            self.perceivablePreySignal = _determine_creature_perception_impact(
                len(stimuli.perceivablePrey))
            self.perceivableCompetitorsSignal = _determine_creature_perception_impact(
                len(stimuli.perceivableCompetitors))
            self.perceivableAlliesSignal = _determine_creature_perception_impact(
                len(stimuli.perceivableAllies))
            self.perceivableDefendersSignal = _determine_creature_perception_impact(
                len(stimuli.perceivableDefenders))
            self.perceivableDefendeesSignal = _determine_creature_perception_impact(
                len(stimuli.perceivableDefendees))
            self.perceivableParasitesSignal = _determine_creature_perception_impact(
                len(stimuli.perceivableParasites))
            self.perceivableHostsSignal = _determine_creature_perception_impact(
                len(stimuli.perceivableHosts))
            self.perceivableNurturersSignal = _determine_creature_perception_impact(
                len(stimuli.perceivableNurturers))
            self.perceivableNurtureesSignal = _determine_creature_perception_impact(
                len(stimuli.perceivableNurturees))
        else:
            self.healthRatio = saveData['healthRatio']
            self.energyRatio = saveData['energyRatio']
            self.perceivableMatesSignal = saveData['perceivableMatesSignal']
            self.perceivableResourcesSignal = saveData['perceivableResourcesSignal']
            self.perceivablePredatorsSignal = saveData['perceivablePredatorsSignal']
            self.perceivablePreySignal = saveData['perceivablePreySignal']
            self.perceivableCompetitorsSignal = saveData['perceivableCompetitorsSignal']
            self.perceivableAlliesSignal = saveData['perceivableAlliesSignal']
            self.perceivableDefendersSignal = saveData['perceivableDefendersSignal']
            self.perceivableDefendeesSignal = saveData['perceivableDefendeesSignal']
            self.perceivableParasitesSignal = saveData['perceivableParasitesSignal']
            self.perceivableHostsSignal = saveData['perceivableHostsSignal']
            self.perceivableNurturersSignal = saveData['perceivableNurturersSignal']
            self.perceivableNurtureesSignal = saveData['perceivableNurtureesSignal']

    def save(self):
        return {
            'healthRatio': self.healthRatio,
            'energyRatio': self.energyRatio,
            'perceivableMatesSignal': self.perceivableMatesSignal,
            'perceivableResourcesSignal': self.perceivableResourcesSignal,
            'perceivablePredatorsSignal': self.perceivablePredatorsSignal,
            'perceivablePreySignal': self.perceivablePreySignal,
            'perceivableCompetitorsSignal': self.perceivableCompetitorsSignal,
            'perceivableAlliesSignal': self.perceivableAlliesSignal,
            'perceivableDefendersSignal': self.perceivableDefendersSignal,
            'perceivableDefendeesSignal': self.perceivableDefendeesSignal,
            'perceivableParasitesSignal': self.perceivableParasitesSignal,
            'perceivableHostsSignal': self.perceivableHostsSignal,
            'perceivableNurturersSignal': self.perceivableNurturersSignal,
            'perceivableNurtureesSignal': self.perceivableNurtureesSignal,
        }

    def degrade(self, magnitude):
        self.healthRatio = random.normalvariate(
            self.healthRatio, magnitude * self.healthRatio)
        self.energyRatio = random.normalvariate(
            self.energyRatio, magnitude * self.energyRatio)
        self.perceivableMatesSignal = random.normalvariate(
            self.perceivableMatesSignal, magnitude * self.perceivableMatesSignal)
        self.perceivableResourcesSignal = random.normalvariate(
            self.perceivableResourcesSignal, magnitude * self.perceivableResourcesSignal)
        self.perceivablePredatorsSignal = random.normalvariate(
            self.perceivablePredatorsSignal, magnitude * self.perceivablePredatorsSignal)
        self.perceivablePreySignal = random.normalvariate(
            self.perceivablePreySignal, magnitude * self.perceivablePreySignal)
        self.perceivableCompetitorsSignal = random.normalvariate(
            self.perceivableCompetitorsSignal,
            magnitude * self.perceivableCompetitorsSignal)
        self.perceivableAlliesSignal = random.normalvariate(
            self.perceivableAlliesSignal, magnitude * self.perceivableAlliesSignal)
        self.perceivableDefendersSignal = random.normalvariate(
            self.perceivableDefendersSignal, magnitude * self.perceivableDefendersSignal)
        self.perceivableDefendeesSignal = random.normalvariate(
            self.perceivableDefendeesSignal, magnitude * self.perceivableDefendeesSignal)
        self.perceivableParasitesSignal = random.normalvariate(
            self.perceivableParasitesSignal, magnitude * self.perceivableParasitesSignal)
        self.perceivableHostsSignal = random.normalvariate(
            self.perceivableHostsSignal, magnitude * self.perceivableHostsSignal)
        self.perceivableNurturersSignal = random.normalvariate(
            self.perceivableNurturersSignal, magnitude * self.perceivableNurturersSignal)
        self.perceivableNurtureesSignal = random.normalvariate(
            self.perceivableNurtureesSignal, magnitude * self.perceivableNurtureesSignal)

    # Determines the average relative percent difference (RPD) of two stored
    # stimuli (0 -> identical, 2 -> max possible difference)
    def relativePercentDifference(self, otherStimuli):
        healthDifference = abs(2 *
                               ((self.healthRatio -
                                 otherStimuli.healthRatio) /
                                (self.healthRatio +
                                 otherStimuli.healthRatio))) if (self.healthRatio +
                                                                 otherStimuli.healthRatio) > 0 else 0
        energyDifference = abs(2 *
                               ((self.energyRatio -
                                 otherStimuli.energyRatio) /
                                (self.energyRatio +
                                 otherStimuli.energyRatio))) if (self.energyRatio +
                                                                 otherStimuli.energyRatio) > 0 else 0
        perceivableMatesDifference = abs(
            2 *
            (
                (self.perceivableMatesSignal -
                 otherStimuli.perceivableMatesSignal) /
                (
                    self.perceivableMatesSignal +
                    otherStimuli.perceivableMatesSignal))) if (
            self.perceivableMatesSignal +
            otherStimuli.perceivableMatesSignal) > 0 else 0
        perceivableResourcesDifference = abs(
            2 *
            (
                (self.perceivableResourcesSignal -
                 otherStimuli.perceivableResourcesSignal) /
                (
                    self.perceivableResourcesSignal +
                    otherStimuli.perceivableResourcesSignal))) if (
            self.perceivableResourcesSignal +
            otherStimuli.perceivableResourcesSignal) > 0 else 0
        perceivablePredatorsDifference = abs(
            2 *
            (
                (self.perceivablePredatorsSignal -
                 otherStimuli.perceivablePredatorsSignal) /
                (
                    self.perceivablePredatorsSignal +
                    otherStimuli.perceivablePredatorsSignal))) if (
            self.perceivablePredatorsSignal +
            otherStimuli.perceivablePredatorsSignal) > 0 else 0
        perceivablePreyDifference = abs(2 *
                                        ((self.perceivablePreySignal -
                                          otherStimuli.perceivablePreySignal) /
                                         (self.perceivablePreySignal +
                                          otherStimuli.perceivablePreySignal))) if (self.perceivablePreySignal +
                                                                                    otherStimuli.perceivablePreySignal) > 0 else 0
        perceivableCompetitorsDifference = abs(
            2 *
            (
                (self.perceivableCompetitorsSignal -
                 otherStimuli.perceivableCompetitorsSignal) /
                (
                    self.perceivableCompetitorsSignal +
                    otherStimuli.perceivableCompetitorsSignal))) if (
            self.perceivableCompetitorsSignal +
            otherStimuli.perceivableCompetitorsSignal) > 0 else 0
        perceivableAlliesDifference = abs(
            2 *
            (
                (self.perceivableAlliesSignal -
                 otherStimuli.perceivableAlliesSignal) /
                (
                    self.perceivableAlliesSignal +
                    otherStimuli.perceivableAlliesSignal))) if (
            self.perceivableAlliesSignal +
            otherStimuli.perceivableAlliesSignal) > 0 else 0
        perceivableDefendersDifference = abs(
            2 *
            (
                (self.perceivableDefendersSignal -
                 otherStimuli.perceivableDefendersSignal) /
                (
                    self.perceivableDefendersSignal +
                    otherStimuli.perceivableDefendersSignal))) if (
            self.perceivableDefendersSignal +
            otherStimuli.perceivableDefendersSignal) > 0 else 0
        perceivableDefendeesDifference = abs(
            2 *
            (
                (self.perceivableDefendeesSignal -
                 otherStimuli.perceivableDefendeesSignal) /
                (
                    self.perceivableDefendeesSignal +
                    otherStimuli.perceivableDefendeesSignal))) if (
            self.perceivableDefendeesSignal +
            otherStimuli.perceivableDefendeesSignal) > 0 else 0
        perceivableParasitesDifference = abs(
            2 *
            (
                (self.perceivableParasitesSignal -
                 otherStimuli.perceivableParasitesSignal) /
                (
                    self.perceivableParasitesSignal +
                    otherStimuli.perceivableParasitesSignal))) if (
            self.perceivableParasitesSignal +
            otherStimuli.perceivableParasitesSignal) > 0 else 0
        perceivableHostsDifference = abs(
            2 *
            (
                (self.perceivableHostsSignal -
                 otherStimuli.perceivableHostsSignal) /
                (
                    self.perceivableHostsSignal +
                    otherStimuli.perceivableHostsSignal))) if (
            self.perceivableHostsSignal +
            otherStimuli.perceivableHostsSignal) > 0 else 0
        perceivableNurturersDifference = abs(
            2 *
            (
                (self.perceivableNurturersSignal -
                 otherStimuli.perceivableNurturersSignal) /
                (
                    self.perceivableNurturersSignal +
                    otherStimuli.perceivableNurturersSignal))) if (
            self.perceivableNurturersSignal +
            otherStimuli.perceivableNurturersSignal) > 0 else 0
        perceivableNurtureesDifference = abs(
            2 *
            (
                (self.perceivableNurtureesSignal -
                 otherStimuli.perceivableNurtureesSignal) /
                (
                    self.perceivableNurtureesSignal +
                    otherStimuli.perceivableNurtureesSignal))) if (
            self.perceivableNurtureesSignal +
            otherStimuli.perceivableNurtureesSignal) > 0 else 0

        return (healthDifference
                + energyDifference
                + perceivableMatesDifference
                + perceivableResourcesDifference
                + perceivablePredatorsDifference
                + perceivablePreyDifference
                + perceivableCompetitorsDifference
                + perceivableAlliesDifference
                + perceivableDefendersDifference
                + perceivableDefendeesDifference
                + perceivableParasitesDifference
                + perceivableHostsDifference
                + perceivableNurturersDifference
                + perceivableNurtureesDifference) / 14


class NetActionBenefit:
    def __init__(
            self,
            changeInHealth,
            changeInEnergy,
            changeInOffspring,
            loadExistingSave=False,
            saveData=None):
        if not loadExistingSave:
            self.changeInHealth = changeInHealth
            self.changeInEnergy = changeInEnergy
            self.changeInOffspring = changeInOffspring
        else:
            self.changeInHealth = saveData['changeInHealth']
            self.changeInEnergy = saveData['changeInEnergy']
            self.changeInOffspring = saveData['changeInOffspring']

    def save(self):
        return {
            'changeInHealth': self.changeInHealth,
            'changeInEnergy': self.changeInEnergy,
            'changeInOffspring': self.changeInOffspring,
        }

    def netGain(self):
        return self.changeInHealth + self.changeInEnergy + self.changeInOffspring

    def degrade(self, magnitude):
        self.changeInHealth = random.normalvariate(
            self.changeInHealth, magnitude * self.changeInHealth)
        self.changeInEnergy = random.normalvariate(
            self.changeInEnergy, magnitude * self.changeInEnergy)
        self.changeInOffspring = random.normalvariate(
            self.changeInOffspring, magnitude * self.changeInOffspring)


class Memory:
    def __init__(
            self,
            stimuliToStore,
            healthRatio,
            energyRatio,
            actionPerformed,
            netActionBenefit,
            loadExistingSave=False,
            saveData=None):
        if not loadExistingSave:
            self.stimuli = StoredStimuli(
                stimuliToStore, healthRatio, energyRatio)
            self.actionPerformed = actionPerformed
            self.netActionBenefit = netActionBenefit
        else:
            self.stimuli = StoredStimuli(
                None,
                None,
                None,
                loadExistingSave=True,
                saveData=saveData['stimuli'])
            self.actionPerformed = saveData['actionPerformed']
            self.netActionBenefit = NetActionBenefit(
                None, None, None, loadExistingSave=True, saveData=saveData['netActionBenefit'])

    def save(self):
        return {
            'stimuli': self.stimuli.save(),
            'actionPerformed': self.actionPerformed,
            'netActionBenefit': self.netActionBenefit.save()
        }

    def degradeMemory(self, magnitude):
        # Degrade the stored stimuli
        self.stimuli.degrade(magnitude)
        # Degrade the net action benefit
        self.netActionBenefit.degrade(magnitude)


class ShortTermMemory:
    def __init__(
            self,
            capacity,
            accuracy,
            loadExistingSave=False,
            saveData=None):
        if not loadExistingSave:
            self.capacity = capacity
            self.accuracy = accuracy
            self._memories = []
        else:
            self.capacity = saveData['capacity']
            self.accuracy = saveData['accuracy']
            self._memories = []
            for memory in saveData['_memories']:
                self._memories.append(
                    Memory(
                        None,
                        None,
                        None,
                        None,
                        None,
                        loadExistingSave=True,
                        saveData=memory))

    def save(self):
        savedMemories = []
        for memory in self._memories:
            savedMemories.append(memory.save())

        return {
            'capacity': self.capacity,
            'accuracy': self.accuracy,
            '_memories': savedMemories
        }

    def addNewMemory(
            self,
            stimuli,
            healthRatio,
            energyRatio,
            actionPerformed,
            netActionBenefit):
        self._memories = [
            Memory(
                stimuli,
                healthRatio,
                energyRatio,
                actionPerformed,
                netActionBenefit)] + self._memories

        if len(self._memories) >= self.capacity * MAX_STM_CAPACITY:
            self._memories = self._memories[:int(
                self.capacity * MAX_STM_CAPACITY)]

        for memory in self._memories:
            memory.degradeMemory(
                1 - (self.accuracy * MAX_STM_DEGREDATION_PERTURBATION))

    def searchForResponseToSimilarSituation(
            self, currentStimuli, tolerance=0.1):
        # For each memory, determine how similar it is, and add to the result
        # list if it is within tolerance
        similarMemories = []
        convertedStimuli = StoredStimuli(
            currentStimuli,
            currentStimuli.healthRatio,
            currentStimuli.energyRatio)

        for memory in self._memories:
            if convertedStimuli.relativePercentDifference(
                    memory.stimuli) <= tolerance:
                similarMemories.append(memory)

        return similarMemories
