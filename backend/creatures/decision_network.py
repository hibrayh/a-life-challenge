import logging
from abc import ABCMeta, abstractmethod
from enum import Enum

logging.basicConfig(level=logging.INFO, format='%(levelname)s %(asctime)s - %(message)s')

class CreatureAction(Enum):
    REPRODUCE = 1
    SEARCH_FOR_FOOD = 2
    CONSUME_FOOD = 3
    SEARCH_FOR_MATE = 4
    HIDE_FROM_CREATURE = 5
    FLEE_FROM_CREATURE = 6
    CHASE_A_CREATURE = 7
    ATTACK_A_CREATURE = 8
    LEAD_OTHER_CREATURES = 9
    FOLLOW_A_CREATURE = 10
    LEECH_OFF_CREATURE = 11
    WORK_WITH_CREATURE = 12
    PROTECT_CREATURE = 13
    AVOID_HAZARD = 14
    SCAN_AREA = 15
    NURTURE_CREATURE = 16

class ActionNode(metaclass=ABCMeta):
    def __init__(self, actionType):
        self.actionType = actionType

    @abstractmethod
    def determineDecisionProbability(self, creatureOfInterest, perceivableEnvironment):
        pass

class ReproduceNode(ActionNode):
    def determineDecisionProbability(self, creatureOfInterest, perceivableEnvironment):
        """
        How does the current state of a creature affect its desire to reproduce?
            * lower health -> lower desire to reproduce
            * lower energy -> lower desire to reproduce 
        
        How does the environment around the creature affect its desire to reproduce?
            * more enemy creatures perceived -> lower desire to reproduce
        
        How do the traits of a creature affect its desire to reproduce?
            * 
        """


class SearchForFoodNode(ActionNode):
    def determineDecisionProbability(self, creatureOfInterest, perceivableEnvironment):
        pass

class SearchForMateNode(ActionNode):
    def determineDecisionProbability(self, creatureOfInterest, perceivableEnvironment):
        pass

class DecisionNetwork():
    def __init__(self):
        self.actionNodes = []
    
    def determineMostLikelyCreatureAction(self, creatureOfInterest, perceivableEnvironment):
        pass
