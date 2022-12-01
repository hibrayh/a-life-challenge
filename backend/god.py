import logging
import environment
import creatures.species_manager

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


class God:
    def __init__(self):
        logging.info("Initializing new God object")

        self._speciesManagers = []
        self._environment = environment.Environment()

    def _getSpeciesManagerFromName(self, speciesName):
        speciesManagerOfInterest = None

        for speciesManager in self._speciesManagers:
            if speciesManager.speciesName == speciesName:
                speciesManagerOfInterest = speciesManager
                break

        return speciesManagerOfInterest

    def createNewSpecies(self, speciesName, startingGenome):
        logging.info(f"Creating new species: {speciesName}")

        newSpecies = creatures.species_manager.SpeciesManager(
            speciesName, startingGenome, self._environment)
        self._speciesManagers.append(newSpecies)

    def deleteSpecies(self, speciesName):
        logging.info(f"Deleting species: {speciesName}")

        speciesManagerToDelete = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerToDelete is None:
            logging.info("Could not find species to delete")
        else:
            self._speciesManagers.remove(speciesManagerToDelete)

    def editSpeciesGenome(self, speciesName, newGenome):
        speciesManagerToEdit = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerToEdit is None:
            logging.info("Could not find species to edit")
        else:
            speciesManagerToEdit.editSpeciesGenome(newGenome)

    def renameSpecies(self, originalSpeciesName, newSpeciesName):
        speciesManagerToRename = self._getSpeciesManagerFromName(
            originalSpeciesName)

        if speciesManagerToRename is None:
            logging.info("Could not find species to rename")
        else:
            speciesManagerToRename.renameSpecies(newSpeciesName)

    def addSpeciesRelationship(
            self,
            speciesOfInterest,
            newSpecies,
            newRelationship):
        speciesManagerToAddRelation = self._getSpeciesManagerFromName(
            speciesOfInterest)

        if speciesManagerToAddRelation is None:
            logging.info("Could not find species to add relationship to")
        else:
            speciesManagerToAddRelation.addSpeciesRelationship(
                newSpecies, newRelationship)

    def createNewCreature(self, speciesName, startingGenome):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerOfInterest is None:
            logging.info("Could not find species to add creature to")
        else:
            speciesManagerOfInterest.createNewCreature(startingGenome)

    def deleteCreature(self, speciesName, creatureId):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerOfInterest is None:
            logging.info("Could not find species to delete creature from")
        else:
            speciesManagerOfInterest.deleteCreature(creatureId)

    def editCreatureGenome(self, speciesName, creatureId, newGenome):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerOfInterest is None:
            logging.info("Could not find species to edit creature")
        else:
            speciesManagerOfInterest.editCreatureGenome(creatureId, newGenome)

    def getSpeciesInfo(self, speciesName):
        pass

    def getCreatureInfo(self, creatureId):
        pass
    
     def getSimulationInfo(self):
        return self._environment.getRegisteredCreatures()


""" Uncomment to see return data of getEnvironmentInfo and getSimulationInfo functions
    def getSimulationInfo():
        print(
            environment.Environment(
                [],
                [],
                ['Grasslands'],
                True).getRegisteredEnvironment())
        return environment.Environment(
            [], [], ['Grasslands'], True).getRegisteredCreatures()

    def getEnvironmentInfo():
        logging.info("Gathering environment data")
        displayEnvironmentData = environment.Environment
        return displayEnvironmentData.displayEnvironment()

if __name__ == "__main__":
    print (God.getEnvironmentInfo())
    print (God.getSimulationInfo())
"""
