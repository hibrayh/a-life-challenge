import logging


logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


class Registry:
    def __init__(self):
        logging.info("Initializing new Registry object")
        self.registry = []

    def registerNewCreature(self, newCreature):
        # Insert the new creature in such a way that the internal list stays sorted in descending order, according to
        # creature reaction time.
        i = 0
        for creature in self.registry:
            if newCreature.genome.reactionTime > creature.genome.reactionTime:
                break
            else:
                i += 1

        logging.info(
            f"Adding new creature with id {newCreature.id} to registry at index {i}")

        if (i + 1) >= len(self.registry):
            self.registry.append(newCreature)
        else:
            self.registry.insert(i, newCreature)

    def unregisterCreature(self, creature):
        logging.info(f"Removing creature with id {creature.id} from registry")
        self.registry.remove(creature)

    def unregisterDeadCreature(self, deadCreature):
        logging.info(
            f"Removing creature with id {deadCreature.id} from registry")
        deadCreature.unregisterFromSpeciesManager()
        self.registry.remove(deadCreature)

    def getCreatureAt(self, index):
        if index >= len(self.registry):
            raise Exception("Index out of bounds")
        else:
            return self.registry[index]
