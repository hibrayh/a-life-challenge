import logging
from generated_comm_files import backend_api_pb2, backend_api_pb2_grpc
from god import God
from creatures.genome import Genome, Receptors, ReproductionType
from creatures.species_manager import SpeciesRelationship
import grpc
import topography
from concurrent import futures
import os
import json


def _convertRequestToGenome(request):
    receptor_list = []
    if request.canSee:
        receptor_list.append(Receptors.VISION)
    if request.canSmell:
        receptor_list.append(Receptors.SMELL)
    if request.canHear:
        receptor_list.append(Receptors.HEAR)

    reproType = ReproductionType.SEXUAL if request.reproductionType == "sexual" else ReproductionType.ASEXUAL

    return Genome(
        request.visibility,
        request.maxHealth,
        receptor_list,
        request.sightAbility,
        request.smellAbility,
        request.hearingAbility,
        request.sightRange,
        request.smellRange,
        request.hearingRange,
        request.reactionTime,
        request.impulsivity,
        request.selfPreservation,
        request.mobility,
        reproType,
        request.reproductionCooldown,
        request.offspringAmount,
        request.motivation,
        request.maxEnergy,
        request.metabolism,
        request.individualism,
        request.territorial,
        request.fightOrFlight,
        request.hostility,
        request.scent,
        request.stealth,
        request.lifeExpectancy,
        request.maturity,
        request.offensiveAbility,
        request.defensiveAbility,
        request.effectFromHost,
        request.effectFromParasite,
        request.protecting,
        request.nurturing,
        request.effectFromBeingNurtured,
        request.shortTermMemoryAccuracy,
        request.shortTermMemoryCapacity,
        request.shape,
        request.color,
    )


def _convertGenomeToRequest(inputGenome):
    return backend_api_pb2.GenomeInfo(
        visibility=inputGenome.visibility,
        maxHealth=inputGenome.maxHealth,
        canSee=Receptors.VISION in inputGenome.receptors,
        canSmell=Receptors.SMELL in inputGenome.receptors,
        canHear=Receptors.HEAR in inputGenome.receptors,
        sightAbility=inputGenome.sightAbility,
        smellAbility=inputGenome.smellAbility,
        hearingAbility=inputGenome.hearingAbility,
        sightRange=inputGenome.sightRange,
        smellRange=inputGenome.smellRange,
        hearingRange=inputGenome.hearingRange,
        reactionTime=inputGenome.reactionTime,
        impulsivity=inputGenome.impulsivity,
        selfPreservation=inputGenome.selfPreservation,
        mobility=inputGenome.mobility,
        reproductionType=inputGenome.reproductionType,
        reproductionCooldown=inputGenome.reproductionCooldown,
        offspringAmount=inputGenome.offspringAmount,
        motivation=inputGenome.motivation,
        maxEnergy=inputGenome.maxEnergy,
        metabolism=inputGenome.metabolism,
        individualism=inputGenome.individualism,
        territorial=inputGenome.territorial,
        fightOrFlight=inputGenome.fightOrFlight,
        hostility=inputGenome.hostility,
        scent=inputGenome.scent,
        stealth=inputGenome.stealth,
        lifeExpectancy=inputGenome.lifeExpectancy,
        maturity=inputGenome.maturity,
        offensiveAbility=inputGenome.offensiveAbility,
        defensiveAbility=inputGenome.defensiveAbility,
        effectFromHost=inputGenome.effectFromHost,
        effectFromParasite=inputGenome.effectFromParasite,
        protecting=inputGenome.protecting,
        nurturing=inputGenome.nurturing,
        effectFromBeingNurtured=inputGenome.effectFromBeingNurtured,
        shortTermMemoryAccuracy=inputGenome.shortTermMemoryAccuracy,
        shortTermMemoryCapacity=inputGenome.shortTermMemoryCapacity,
        shape=inputGenome.shape,
        color=inputGenome.color,
    )


def _convertRequestToSpeciesRelationship(inputRelationship):
    convertedRelationship = None
    if inputRelationship == 'hunts':
        convertedRelationship = SpeciesRelationship.HUNTS
    elif inputRelationship == 'hunted by':
        convertedRelationship = SpeciesRelationship.IS_HUNTED_BY
    elif inputRelationship == 'competes with':
        convertedRelationship = SpeciesRelationship.COMPETES_WITH
    elif inputRelationship == 'works with':
        convertedRelationship = SpeciesRelationship.WORKS_WITH
    elif inputRelationship == 'protects':
        convertedRelationship = SpeciesRelationship.PROTECTS
    elif inputRelationship == 'defended by':
        convertedRelationship = SpeciesRelationship.DEFENDED_BY
    elif inputRelationship == 'leeches':
        convertedRelationship = SpeciesRelationship.LEECHES
    elif inputRelationship == 'leeched by':
        convertedRelationship = SpeciesRelationship.LEECHED_OFF_OF
    elif inputRelationship == 'nurtures':
        convertedRelationship = SpeciesRelationship.NURTURES
    elif inputRelationship == 'nurtured by':
        convertedRelationship = SpeciesRelationship.NURTURED_BY
    else:
        logging.info(
            f"Unknown relationship {inputRelationship}. Setting default as COMPETES_WITH")
        convertedRelationship = SpeciesRelationship.COMPETES_WITH

    return convertedRelationship


class BackendServicer(backend_api_pb2_grpc.BackendServicer):
    god = None

    def StartSimulation(self, request, context):
        logging.info("Starting simulation")
        self.god = God(
            request.simulationWidth,
            request.simulationHeight,
            request.columnCount,
            request.rowCount)
        return backend_api_pb2.StartSimulationReply(simStarted=True)

    def SaveSimulation(self, request, context):
        logging.info("Saving simulation")
        save = json.dumps(self.god.save(), indent=4)

        return backend_api_pb2.SaveSimulationReply(saveInfo=save)

    def LoadSimulation(self, request, context):
        logging.info("Loading existing simulation")
        filename = request.filePath + '.json'

        saveData = None
        if os.path.isfile(filename):
            with open(filename, "r") as savefile:
                saveData = json.load(savefile)

            self.god = God(
                0,
                0,
                0,
                0,
                loadExistingSave=True,
                saveData=saveData)
        else:
            logging.info(f"No file of name {filename} was found to load from")

        return backend_api_pb2.LoadSimulationReply(simLoaded=True)

    def ResizeSimulation(self, request, context):
        logging.info("Loading simulation")
        self.god.resizeSimulation(request.newXDimension, request.newYDimension)
        return backend_api_pb2.ResizeSimulationReply(simResized=True)

    def GetEnvironmentInfo(self, request, context):
        logging.info("Getting environment info")
        return self.god.getSimulationInfo()

    def GetSimulationProgressionSpeed(self, request, context):
        logging.info("Getting current simulation progression speed")
        return backend_api_pb2.GetSimulationProgressionSpeedReply(
            simulationSpeed=self.god.getTickSpeed())

    def ChangeSimulationProgressionSpeed(self, request, context):
        logging.info("Changing simulation progression speed")
        self.god.editTickSpeed(request.newSimulationSpeed)
        return backend_api_pb2.ChangeSimulationProgressionSpeedReply(
            simulationSpeedChanged=True)

    def CreateNewSpecies(self, request, context):
        logging.info("Creating new species")
        self.god.createNewSpecies(
            request.speciesName,
            _convertRequestToGenome(
                request.initialGenome))
        logging.info("Spawning initial creatures of new species")
        self.god.massCreateCreatures(
            request.speciesName,
            request.initialNumberToSpawn)
        return backend_api_pb2.CreateNewSpeciesReply(speciesCreated=True)

    def CreateNewCreature(self, request, context):
        logging.info("Creating new creature")
        
        for i in range(request.initialNumberToSpawn):
            self.god.createNewCreature(
                request.speciesName,
                _convertRequestToGenome(
                    request.genome))

        return backend_api_pb2.CreateNewCreatureReply(creatureCreated=True)

    def GetSpeciesList(self, request, context):
        logging.info("Fetching list of species")
        return backend_api_pb2.GetSpeciesListReply(
            species=self.god.getListOfSpecies())

    def DefineNewSpeciesRelationship(self, request, context):
        logging.info("Defining new species relationship")
        self.god.addSpeciesRelationship(
            request.sourceSpecies,
            request.destinationSpecies,
            _convertRequestToSpeciesRelationship(
                request.relationship))
        return backend_api_pb2.DefineNewSpeciesRelationshipReply(
            setNewRelationship=True)

    def GetSpeciesInfo(self, request, context):
        logging.info("Fetching species info")
        return backend_api_pb2.SpeciesInfo(
            speciesName=request.speciesOfInterest,
            genomeTemplate=_convertGenomeToRequest(
                self.god.getSpeciesGenome(
                    request.speciesOfInterest)),
            creatures=self.god.getCreaturesFromSpecies(
                request.speciesOfInterest))

    def GetCreatureInfo(self, request, context):
        logging.info("Fetching creature info")
        return backend_api_pb2.CreatureInfo(
            id=request.creatureOfInterest,
            species=request.species,
            genome=_convertGenomeToRequest(
                self.god.getCreatureInfo(
                    request.creatureOfInterest,
                    request.species)))

    def CreateTopography(self, request, context):
        logging.info("Creating new topography")
        self.god.addNewTopography(
            request.type,
            request.column,
            request.row)
        return backend_api_pb2.CreateTopographyReply(topographyAdded=True)

    def DeleteTopography(self, request, context):
        logging.info("Deleting topography")
        self.god.removeTopography(request.column, request.row)
        return backend_api_pb2.DeleteTopographyReply(topographyDeleted=True)

    def GetTopography(self, request, context):
        logging.info("Fetching topography")
        return self.god.getTopographyInfo()

    def SetTopography(self, request, context):
        logging.info("Setting entire topography registry")
        self.god.setTopographyInfo(request)
        return backend_api_pb2.CreateSetTopographyReply(topographySet=True)

    def DefineTopographyTemplate(self, request, context):
        logging.info("Defining new topography preset")
        self.god.defineNewTopographyPreset(
            request.name,
            request.elevationAmplitude,
            request.resourceDensity,
            request.resourceReplenishment,
            request.resourceColor,
            request.resourceShape)
        return backend_api_pb2.DefineTopographyTemplateReply(
            presetDefined=True)

    def GetTopographyTemplates(self, request, context):
        logging.info("Getting a list of topography presets")
        templateInfo = self.god.getTopographyPresets()
        return backend_api_pb2.GetTopographyTemplatesReply(
            templateName=templateInfo[0], color=templateInfo[1])

    def AdvanceSimulation(self, request, context):
        logging.info("Advancing simulation")
        self.god.advanceSimulationByNTicks(request.stepsToAdvance)
        return backend_api_pb2.AdvanceSimulationReply(simulationAdvanced=True)

    def GetTextToggle(self, request, context):
        logging.info("Getting text toggle mode")
        return backend_api_pb2.GetTextToggleReply(
            textToggle=self.god.getTextToggle())

    def UpdateTextToggle(self, request, context):
        logging.info("Changing text toggle mode")
        self.god.editTextToggle(request.newTextToggle)
        return backend_api_pb2.UpdateTextToggleReply(textToggled=True)

    def GetUpdateFlag(self, request, context):
        logging.info("Getting update flag")
        return backend_api_pb2.GetUpdateFlagReply(
            updateFlag=self.god.getSimulationUpdateFlag())

    def EditUpdateFlag(self, request, context):
        logging.info("Updating update flag")
        self.god.flagSimulationUpdate(request.newUpdateFlag)
        return backend_api_pb2.EditUpdateFlagReply(updatedFlag=True)

    def GetTimeOfSimulation(self, request, context):
        logging.info("Fetching simulation time")
        return backend_api_pb2.GetTimeOfSimulationReply(
            timeOfSimulation=self.god.getTimeOfSimulation())

    def GetLightVisibility(self, request, context):
        logging.info("Fetching light visibility")
        return backend_api_pb2.GetLightVisibilityReply(
            lightVisibility=self.god.getLightVisibility())


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    backend_api_pb2_grpc.add_BackendServicer_to_server(
        BackendServicer(), server)
    server.add_insecure_port('[::]:39516')
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    print("Simulation started on port 39516")
    serve()
