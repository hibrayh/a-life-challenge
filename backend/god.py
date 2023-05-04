import logging
import random
import environment
import topography
import creatures.species_manager
from creatures.decision_network import DecisionNetworkSexual, DecisionNetworkAsexual
from creatures.genome import ReproductionType

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


def _determineInverseAction(action):
    convertedRelationship = None
    if action == 'HUNTS':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.IS_HUNTED_BY
    elif action == 'IS_HUNTED_BY':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.HUNTS
    elif action == 'COMPETES_WITH':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.COMPETES_WITH
    elif action == 'WORKS_WITH':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.WORKS_WITH
    elif action == 'PROTECTS':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.DEFENDED_BY
    elif action == 'DEFENDED_BY':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.PROTECTS
    elif action == 'LEECHES':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.LEECHED_OFF_OF
    elif action == 'LEECHED_OFF_OF':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.LEECHES
    elif action == 'NURTURES':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.NURTURED_BY
    elif action == 'NURTURED_BY':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.NURTURES
    else:
        logging.info(
            f"Unknown relationship {action}. Setting default as COMPETES_WITH")
        convertedRelationship = creatures.species_manager.SpeciesRelationship.COMPETES_WITH

    return convertedRelationship


class God:
    def __init__(
            self,
            simulationWidth,
            simulationHeight,
            columnCount,
            rowCount,
            loadExistingSave=False,
            saveData=None):
        self._sexualReproductionDecisionNetwork = DecisionNetworkSexual()
        self._asexualReproductionDecisionNetwork = DecisionNetworkAsexual()
        self._tickSpeed = 0
        self._textToggle = False

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
                decisionNetworkToUse = self._sexualReproductionDecisionNetwork \
                    if savedSpecies['_startingGenome'] == 'Sexual' \
                    else self._asexualReproductionDecisionNetwork
                self._speciesManagers.append(
                    creatures.species_manager.SpeciesManager(
                        None,
                        None,
                        self._simulationWidth,
                        self._simulationHeight,
                        self._environment,
                        decisionNetworkToUse,
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

    def resizeSimulation(self, newWidth, newHeight):
        logging.info(
            f"Resizing simulation to new width of {newWidth} and height of {newHeight}")
        scalingFactorX = newWidth / self._simulationWidth
        scalingFactorY = newHeight / self._simulationHeight

        self._simulationWidth = newWidth
        self._simulationHeight = newHeight

        for speciesManager in self._speciesManagers:
            speciesManager.spawnPointXCoordinate = speciesManager.spawnPointXCoordinate * scalingFactorX
            speciesManager.spawnPointYCoordinate = speciesManager.spawnPointYCoordinate * scalingFactorY

        self._environment.resize(
            newWidth, newHeight, [
                scalingFactorX, scalingFactorY])

    def _getSpeciesManagerFromName(self, speciesName):
        speciesManagerOfInterest = None

        for speciesManager in self._speciesManagers:
            if speciesManager.speciesName == speciesName:
                speciesManagerOfInterest = speciesManager
                break

        return speciesManagerOfInterest

    def createNewSpecies(self, speciesName, startingGenome):
        logging.info(f"Creating new species: {speciesName}")

        decisionNetworkToUse = self._sexualReproductionDecisionNetwork \
            if startingGenome.reproductionType == ReproductionType.SEXUAL \
            else self._asexualReproductionDecisionNetwork

        newSpecies = creatures.species_manager.SpeciesManager(
            speciesName,
            startingGenome,
            self._simulationWidth,
            self._simulationHeight,
            self._environment,
            decisionNetworkToUse)
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
        logging.info(
            f"DEBUG: species1 {speciesOfInterest} species2 {newSpecies}")
        species1 = self._getSpeciesManagerFromName(
            speciesOfInterest)
        species2 = self._getSpeciesManagerFromName(newSpecies)

        if (species1 is None) or (species2 is None):
            logging.info("Could not find species to add relationship to")
        else:
            species1.addSpeciesRelationship(
                newSpecies, newRelationship)
            species2.addSpeciesRelationship(
                speciesOfInterest, _determineInverseAction(newRelationship))

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
        logging.info(
            f"Creating new topography of type {topographyType} with id {topographyId}")

        topLeftXCoordinate = (column) * \
            (self._simulationWidth / self._columnCount)
        topLeftYCoordinate = (row) * \
            (self._simulationHeight / self._rowCount)
        bottomRightXCoordinate = (column + 1) * \
            (self._simulationWidth / self._columnCount)
        bottomRightYCoordinate = (row + 1) * \
            (self._simulationHeight / self._rowCount)
        topRightXCoordinate = bottomRightXCoordinate
        topRightYCoordinate = topLeftYCoordinate
        bottomLeftXCoordinate = topLeftXCoordinate
        bottomLeftYCoordinate = bottomRightYCoordinate

        newTopography = topography.Topography(topLeftXCoordinate,
                                              topLeftYCoordinate,
                                              topRightXCoordinate,
                                              topRightYCoordinate,
                                              bottomLeftXCoordinate,
                                              bottomLeftYCoordinate,
                                              bottomRightXCoordinate,
                                              bottomRightYCoordinate,
                                              topographyId,
                                              column,
                                              row,
                                              topographyType,
                                              self._environment)

        self._environment.addToTopographyRegistry(newTopography)

    def addPresetTopography(self, presetTopographyId):
        logging.info(
            f"Setting topography type to {presetTopographyId} for the entire environment...")
        for row in range(self._rowCount):
            rowList = []
            for column in range(self._columnCount):
                # Define the preset parameters based on the coordinates of the
                # current grid block
                topLeftXCoordinate = (column) * \
                    (self._simulationWidth / self._columnCount)
                topLeftYCoordinate = (row) * \
                    (self._simulationHeight / self._rowCount)
                bottomRightXCoordinate = (column + 1) * \
                    (self._simulationWidth / self._columnCount)
                bottomRightYCoordinate = (row + 1) * \
                    (self._simulationHeight / self._rowCount)
                topRightXCoordinate = bottomRightXCoordinate
                topRightYCoordinate = topLeftYCoordinate
                bottomLeftXCoordinate = topLeftXCoordinate
                bottomLeftYCoordinate = bottomRightYCoordinate

                if presetTopographyId == "Preset1":
                    topographyType = topography.TemplateTopography.FLAT
                    topographyId = f"topography_column{column}_row{row}"
                    logging.info(
                        f"Creating new topography of type {topographyType} with id {topographyId}")
                    newTopography = topography.Topography(
                        topLeftXCoordinate,
                        topLeftYCoordinate,
                        topRightXCoordinate,
                        topRightYCoordinate,
                        bottomLeftXCoordinate,
                        bottomLeftYCoordinate,
                        bottomRightXCoordinate,
                        bottomRightYCoordinate,
                        topographyId,
                        column,
                        row,
                        topographyType,
                        self._environment)

                elif presetTopographyId == "Preset2":
                    topographyType = topography.TemplateTopography.MILD
                    topographyId = f"topography_column{column}_row{row}"
                    logging.info(
                        f"Creating new topography of type {topographyType} with id {topographyId}")
                    newTopography = topography.Topography(
                        topLeftXCoordinate,
                        topLeftYCoordinate,
                        topRightXCoordinate,
                        topRightYCoordinate,
                        bottomLeftXCoordinate,
                        bottomLeftYCoordinate,
                        bottomRightXCoordinate,
                        bottomRightYCoordinate,
                        topographyId,
                        column,
                        row,
                        topographyType,
                        self._environment)

                elif presetTopographyId == "Preset3":
                    topographyType = topography.TemplateTopography.MODERATE
                    topographyId = f"topography_column{column}_row{row}"
                    logging.info(
                        f"Creating new topography of type {topographyType} with id {topographyId}")
                    newTopography = topography.Topography(
                        topLeftXCoordinate,
                        topLeftYCoordinate,
                        topRightXCoordinate,
                        topRightYCoordinate,
                        bottomLeftXCoordinate,
                        bottomLeftYCoordinate,
                        bottomRightXCoordinate,
                        bottomRightYCoordinate,
                        topographyId,
                        column,
                        row,
                        topographyType,
                        self._environment)

                elif presetTopographyId == "Preset4":
                    topographyType = topography.TemplateTopography.EXTREME
                    topographyId = f"topography_column{column}_row{row}"
                    logging.info(
                        f"Creating new topography of type {topographyType} with id {topographyId}")
                    newTopography = topography.Topography(
                        topLeftXCoordinate,
                        topLeftYCoordinate,
                        topRightXCoordinate,
                        topRightYCoordinate,
                        bottomLeftXCoordinate,
                        bottomLeftYCoordinate,
                        bottomRightXCoordinate,
                        bottomRightYCoordinate,
                        topographyId,
                        column,
                        row,
                        topographyType,
                        self._environment)

                elif presetTopographyId == "Randomize":
                    topographyType = random.choice(list([topo for topo in list(
                        topography.TemplateTopography) if topo != topography.TemplateTopography.UNSELECTED]))
                    topographyId = f"topography_column{column}_row{row}"
                    logging.info(
                        f"Creating new topography of type {topographyType} with id {topographyId}")
                    newTopography = topography.Topography(
                        topLeftXCoordinate,
                        topLeftYCoordinate,
                        topRightXCoordinate,
                        topRightYCoordinate,
                        bottomLeftXCoordinate,
                        bottomLeftYCoordinate,
                        bottomRightXCoordinate,
                        bottomRightYCoordinate,
                        topographyId,
                        column,
                        row,
                        topographyType,
                        self._environment)

                self._environment.addToTopographyRegistry(newTopography)
            logging.info(
                f"Topography Preset: '{presetTopographyId}' has been set")

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

    def getCreaturesFromSpecies(self, speciesName):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(speciesName)

        if speciesManagerOfInterest is None:
            logging.info(f"Could not find requested species: {speciesName}")
        else:
            return speciesManagerOfInterest.getCreatures()

    def getCreatureInfo(self, creatureId, speciesOfInterest):
        speciesManagerOfInterest = self._getSpeciesManagerFromName(
            speciesOfInterest)

        if speciesManagerOfInterest is None:
            logging.info(
                f"Could not find requested species: {speciesOfInterest}")
        else:
            return speciesManagerOfInterest.getCreatureGenome(creatureId)

    def getSimulationInfo(self):
        return {
            'creatureRegistry': self._environment.getRegisteredCreatures(),
            'resourceRegistry': self._environment.getRegisteredResources(),
            'lightVisibility': self._environment.getLightVisibility(),
            'timeOfSimulation': self._environment.getTimeOfSimulation(),
        }

    def advanceSimulation(self):
        logging.info("Advancing simulation by a tick")
        self._environment.simulateCreatureBehavior()

    def advanceSimulationByNTicks(self, n):
        logging.info(f"Advancing simulation by {n} ticks")
        self._environment.simulateCreatureBehaviorByNTicks(n)

    def getListOfSpecies(self):
        speciesNames = []

        for species in self._speciesManagers:
            speciesNames.append(species.speciesName)

        return {
            "speciesNames": speciesNames
        }

    def getTimeOfSimulation(self):
        logging.info("Getting the current time of simulation")
        return self._environment.getTimeOfSimulation()

    def getLightVisibility(self):
        logging.info(
            "Getting the visible light factor based on time of simulation")
        return self._environment.getLightVisibility()

    def editTickSpeed(self, ticks):
        logging.info("tickspeed updated to {ticks}")
        self._tickSpeed = ticks

    def getTickSpeed(self):
        return self._tickSpeed
    
    def editTextToggle(self, text):
        logging.info("Show text is now {text}")
        self._textToggle = text

    def getTextToggle(self):
        return self._textToggle

    def getTopographyInfo(self):
        column = 0
        row = 0
        topographyType = topography.TemplateTopography.UNSELECTED
        logging.info(
            "Getting the elevation values of the entire environment region")
        topLeftXCoordinate = (column) * \
            (self._simulationWidth / self._columnCount)
        topLeftYCoordinate = (row) * \
            (self._simulationHeight / self._rowCount)
        bottomRightXCoordinate = (column + 1) * \
            (self._simulationWidth / self._columnCount)
        bottomRightYCoordinate = (row + 1) * \
            (self._simulationHeight / self._rowCount)
        topRightXCoordinate = bottomRightXCoordinate
        topRightYCoordinate = topLeftYCoordinate
        bottomLeftXCoordinate = topLeftXCoordinate
        bottomLeftYCoordinate = bottomRightYCoordinate
        topographyId = f"topography_column{column}_row{row}"
        topo = topography.Topography(topLeftXCoordinate,
                                     topLeftYCoordinate,
                                     topRightXCoordinate,
                                     topRightYCoordinate,
                                     bottomLeftXCoordinate,
                                     bottomLeftYCoordinate,
                                     bottomRightXCoordinate,
                                     bottomRightYCoordinate,
                                     topographyId,
                                     topographyType,
                                     column,
                                     row,
                                     self._environment)
        return {
            'topographyGeography': topo.getGeography(),
            'topographyRegistry': self._environment.getRegisteredTopography()
        }

#myGod = God(1920, 989, 50, 25)
# myGod.addPresetTopography("Randomize")
