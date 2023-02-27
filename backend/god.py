import logging
import environment
import topography
import creatures.species_manager
import random
from environment import Environment

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


class God:
    def __init__(
            self,
            simulationWidth,
            simulationHeight,
            columnCount,
            rowCount,
            loadExistingSave=False,
            saveData=None):
        if not loadExistingSave:
            logging.info("Initializing new God object")

            self._speciesManagers = []
            self._environment = environment.Environment(
                simulationWidth, simulationHeight, columnCount, rowCount)
            self._simulationWidth = simulationWidth
            self._simulationHeight = simulationHeight
            self._columnCount = columnCount
            self._rowCount = rowCount
        else:
            logging.info("Loading existing God object")
            self._simulationWidth = saveData['_simulationWidth']
            self._simulationHeight = saveData['_simulationHeight']
            self._columnCount = saveData['_columnCount']
            self._rowCount = saveData['_rowCount']
            # Initialize environment
            self._environment = environment.Environment(
                0, 0, 0, 0, loadExistingSave=True, saveData=saveData['_environment'])
            # Initialize species managers
            self._speciesManagers = []
            for savedSpecies in saveData['_speciesManagers']:
                self._speciesManagers.append(
                    creatures.species_manager.SpeciesManager(
                        None,
                        None,
                        self._simulationWidth,
                        self._simulationHeight,
                        self._environment,
                        loadExistingSave=True,
                        saveData=savedSpecies))

    def save(self):
        logging.info("Saving God object")
        speciesList = []
        for speciesManager in self._speciesManagers:
            speciesList.append(speciesManager.save())

        return {
            '_speciesManagers': speciesList,
            '_environment': self._environment.save(),
            '_simulationWidth': self._simulationWidth,
            '_simulationHeight': self._simulationHeight,
            '_columnCount': self._columnCount,
            '_rowCount': self._rowCount,
        }

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
            speciesName,
            startingGenome,
            self._simulationWidth,
            self._simulationHeight,
            self._environment)
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

    def massCreateCreatures(self, speciesName, numberOfNewCreatures):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerOfInterest is None:
            logging.info("Could not find species to mass spawn creatures")
        else:
            speciesManagerOfInterest.massCreateMoreCreatures(
                numberOfNewCreatures)

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
    
    def addNewTopography(self, topographyType, column, row):
        topographyId = f"topography_column{column}_row{row}"
        logging.info(f"Creating new topography of type {topographyType} with id {topographyId}")

        topLeftXCoordinate = (column - 1) * (self._simulationWidth / self._columnCount)
        topLeftYCoordinate = (row - 1) * (self._simulationHeight / self._rowCount)
        bottomRightXCoordinate = column * (self._simulationWidth / self._columnCount)
        bottomRightYCoordinate = row * (self._simulationHeight / self._rowCount)
        topRightXCoordinate = bottomRightXCoordinate
        topRightYCoordinate = topLeftYCoordinate
        bottomLeftXCoordinate = topLeftXCoordinate
        bottomLeftYCoordinate = bottomRightYCoordinate

        topography.Topography(topLeftXCoordinate,
                                topLeftYCoordinate,
                                topRightXCoordinate,
                                topRightYCoordinate,
                                bottomLeftXCoordinate,
                                bottomLeftYCoordinate,
                                bottomRightXCoordinate,
                                bottomRightYCoordinate,
                                topographyId,
                                topographyType,
                                self._environment)
    
    def removeTopography(self, column, row):
        self._environment.removeTopography(column, row)

    def getSpeciesInfo(self, speciesName):
        pass

    def getSpeciesGenome(self, speciesName):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerOfInterest is None:
            logging.info("Could not find requested species")
        else:
            return speciesManagerOfInterest.getSpeciesGenome()

    def getCreatureInfo(self, creatureId):
        pass

    def getSimulationInfo(self):
        return {
            'creatureRegistry': self._environment.getRegisteredCreatures(),
            'resourceRegistry': self._environment.getRegisteredResources(),
            'topographyRegistry': self._environment.getRegisteredTopography(),
        }

    def advanceSimulation(self):
        logging.info("Advancing simulation by a tick")
        self._environment.simulateCreatureBehavior()

    def getListOfSpecies(self):
        speciesNames = []

        for species in self._speciesManagers:
            speciesNames.append(species.speciesName)

        return {
            "speciesNames": speciesNames
        }
