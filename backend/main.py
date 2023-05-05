from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask import request
import logging
import json
import god
import topography
import creatures.genome
import creatures.species_manager
import os.path


logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s %(asctime)s - %(message)s')


api = Flask(__name__)
cors = CORS(api)
api.config["CORS_HEADERS"] = "Content-Type"

GOD = None


def _convertRequestToGenome(inputRequest):
    receptorsList = []

    if inputRequest.json['canSee'] == 'on':
        receptorsList.append(creatures.genome.Receptors.VISION)
    if inputRequest.json['canSmell'] == 'on':
        receptorsList.append(creatures.genome.Receptors.SMELL)
    if inputRequest.json['canHear'] == 'on':
        receptorsList.append(creatures.genome.Receptors.HEAR)

    reproType = None
    if inputRequest.json['reproductionType'] == 'sexual':
        reproType = creatures.genome.ReproductionType.SEXUAL
    else:
        reproType = creatures.genome.ReproductionType.ASEXUAL

    inputGenome = creatures.genome.Genome(float(inputRequest.json['visibility']),
                                          float(inputRequest.json['maxHealth']),
                                          receptorsList,
                                          float(inputRequest.json['sightAbility']),
                                          float(inputRequest.json['smellAbility']),
                                          float(inputRequest.json['hearingAbility']),
                                          float(inputRequest.json['sightRange']),
                                          float(inputRequest.json['smellRange']),
                                          float(inputRequest.json['hearingRange']),
                                          float(inputRequest.json['reactionTime']),
                                          float(inputRequest.json['impulsivity']),
                                          float(inputRequest.json['selfPreservation']),
                                          float(inputRequest.json['mobility']),
                                          reproType,
                                          float(inputRequest.json['reproductionCooldown']),
                                          float(inputRequest.json['offspringAmount']),
                                          float(inputRequest.json['motivation']),
                                          float(inputRequest.json['maxEnergy']),
                                          float(inputRequest.json['metabolism']),
                                          float(inputRequest.json['individualism']),
                                          float(inputRequest.json['territorial']),
                                          float(inputRequest.json['fightOrFlight']),
                                          float(inputRequest.json['hostility']),
                                          float(inputRequest.json['scent']),
                                          float(inputRequest.json['stealth']),
                                          float(inputRequest.json['lifeExpectancy']),
                                          float(inputRequest.json['maturity']),
                                          float(inputRequest.json['offensiveAbility']),
                                          float(inputRequest.json['defensiveAbility']),
                                          float(inputRequest.json['effectFromHost']),
                                          float(inputRequest.json['effectFromParasite']),
                                          float(inputRequest.json['protecting']),
                                          float(inputRequest.json['nurturing']),
                                          float(inputRequest.json['effectFromBeingNurtured']),
                                          float(inputRequest.json['shortTermMemoryAccuracy']),
                                          float(inputRequest.json['shortTermMemoryCapacity']),
                                          inputRequest.json['shape'],
                                          inputRequest.json['color']
                                          )

    return inputGenome


def _convertRequestToTopographyType(inputTopography):
    convertedTopographyType = None
    if inputTopography == 'flat':
        convertedTopographyType = topography.TemplateTopography.FLAT
    elif inputTopography == 'mild':
        convertedTopographyType = topography.TemplateTopography.MILD
    elif inputTopography == 'moderate':
        convertedTopographyType = topography.TemplateTopography.MODERATE
    elif inputTopography == 'extreme':
        convertedTopographyType = topography.TemplateTopography.EXTREME
    else:
        logging.info(
            f"Unknown topography type {inputTopography}. Setting default of FLAT")
        convertedTopographyType = topography.TemplateTopography.FLAT

    return convertedTopographyType


def _convertRequestToSpeciesRelationship(inputRelationship):
    convertedRelationship = None
    if inputRelationship == 'hunts':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.HUNTS
    elif inputRelationship == 'hunted by':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.IS_HUNTED_BY
    elif inputRelationship == 'competes with':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.COMPETES_WITH
    elif inputRelationship == 'works with':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.WORKS_WITH
    elif inputRelationship == 'protects':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.PROTECTS
    elif inputRelationship == 'defended by':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.DEFENDED_BY
    elif inputRelationship == 'leeches':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.LEECHES
    elif inputRelationship == 'leeched by':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.LEECHED_OFF_OF
    elif inputRelationship == 'nurtures':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.NURTURES
    elif inputRelationship == 'nurtured by':
        convertedRelationship = creatures.species_manager.SpeciesRelationship.NURTURED_BY
    else:
        logging.info(
            f"Unknown relationship {inputRelationship}. Setting default as COMPETES_WITH")
        convertedRelationship = creatures.species_manager.SpeciesRelationship.COMPETES_WITH

    return convertedRelationship


@api.route('/get-info')
@cross_origin()
def return_dummy_info():
    response_body = {
        "creatureId": "boop",
        "species": "Shlorpians",
        "movement": 0,
        "birth": 1,
        "locationX": "50",
        "locationY": "50",
        "shape": "square",
        "color": "blue",
    }

    return response_body


@api.route('/start-simulation', methods=['POST'])
@cross_origin()
def startSimulation():
    global GOD
    GOD = god.God(
        request.json['simulationWidth'],
        request.json['simulationHeight'],
        request.json['columnCount'],
        request.json['rowCount'])
    return "Success", 201


@api.route('/resize-simulation', methods=['POST'])
@cross_origin()
def resizeSimulation():
    global GOD
    GOD.resizeSimulation(request.json['newWidth'], request.json['newHeight'])
    return "Success", 201


@api.route('/create-new-species', methods=['POST'])
@cross_origin()
def createNewSpecies():
    global GOD
    initialGenome = _convertRequestToGenome(request)
    GOD.createNewSpecies(request.json['speciesName'], initialGenome)
    return "Success", 201


@api.route('/delete-species', methods=['POST'])
@cross_origin()
def deleteSpecies():
    global GOD
    GOD.deleteSpecies(request.json['speciesName'])
    return "Success", 201


@api.route('/create-new-creature', methods=['POST'])
@cross_origin()
def createNewCreature():
    global GOD
    initialGenome = _convertRequestToGenome(request)
    GOD.createNewCreature(request.json['speciesName'], initialGenome)
    return "Success", 201


@api.route('/mass-create-more-creatures', methods=['POST'])
@cross_origin()
def massCreateMoreCreatures():
    global GOD
    GOD.massCreateCreatures(
        request.json['speciesName'], int(
            request.json['numberOfNewCreatures']))
    return "Success", 201


@api.route('/delete-creature', methods=['POST'])
@cross_origin()
def deleteCreature():
    global GOD
    GOD.deleteCreature(request.json['speciesName'], request.json['creatureId'])
    return "Success", 201


@api.route('/edit-species-genome', methods=['POST'])
@cross_origin()
def editSpecies():
    global GOD
    newGenome = _convertRequestToGenome(request)
    GOD.editSpeciesGenome(request.json['speciesName'], newGenome)
    return "Success", 201


@api.route('/rename-species', methods=['POST'])
@cross_origin()
def renameSpecies():
    global GOD
    GOD.renameSpecies(
        request.json['originalSpeciesName'],
        request.json['newSpeciesName'])
    return "Success", 201


@api.route('/add-species-relationship', methods=['POST'])
@cross_origin()
def addSpeciesRelationship():
    global GOD
    GOD.addSpeciesRelationship(
        request.json['speciesOfInterest'],
        request.json['newSpecies'],
        creatures.species_manager.SpeciesRelationship(
            int(
                request.json['newRelationship'])))
    return "Success", 201


@api.route('/edit-creature-genome', methods=['POST'])
@cross_origin()
def editCreatureGenome():
    global GOD
    newGenome = _convertRequestToGenome(request)
    GOD.editCreatureGenome(
        request.json['species'],
        request.json['creatureId'],
        newGenome)
    return "Success", 201


@api.route('/get-simulation-info')
@cross_origin()
def getSimulationInfo():
    global GOD
    return jsonify(GOD.getSimulationInfo())


@api.route('/advance-simulation')
@cross_origin()
def advanceSimulation():
    global GOD
    GOD.advanceSimulation()
    return "Success", 201


@api.route('/advance-simulation-by-n-ticks', methods=['POST'])
@cross_origin()
def advanceSimulationByNTicks():
    global GOD
    GOD.advanceSimulationByNTicks(int(request.json['ticks']))
    return "Success", 201


@api.route('/update-tick-speed', methods=['POST'])
@cross_origin()
def updateSimulationTickSpeed():
    global GOD
    GOD.editTickSpeed(int(request.json['ticks']))
    return "Success", 201


@api.route('/get-tick-speed')
@cross_origin()
def getTickSpeed():
    return jsonify(GOD.getTickSpeed())


@api.route('/update-text-toggle', methods=['POST'])
@cross_origin()
def updateTextToggle():
    global GOD
    GOD.editTextToggle(int(request.json['toggle']))
    return "Success", 201


@api.route('/get-text-toggle')
@cross_origin()
def getTextToggle():
    return jsonify(GOD.getTextToggle())


@api.route('/flag-simulation-update', methods=['POST'])
@cross_origin()
def editSimulationUpdate():
    global GOD
    GOD.flagSimulationUpdate(int(request.json['update']))
    return "Success", 201


@api.route('/get-simulation-update-flag')
@cross_origin()
def getSimulationUpdateFlag():
    #logging.info(f"{GOD.getSimulationUpdateFlag()}")
    return jsonify(GOD.getSimulationUpdateFlag())


@api.route('/get-list-of-species')
@cross_origin()
def getListOfSpecies():
    global GOD
    return jsonify(GOD.getListOfSpecies())


@api.route('/get-species-genome', methods=['POST'])
@cross_origin()
def getSpeciesGenome():
    global GOD
    return jsonify(GOD.getSpeciesGenome(request.json['speciesOfInterest']))


@api.route('/get-creature-list-from-species', methods=['POST'])
@cross_origin()
def getCreatureListFromSpecies():
    global GOD
    return jsonify(
        GOD.getCreaturesFromSpecies(
            request.json['speciesOfInterest']))


@api.route('/get-creature-genome', methods=['POST'])
@cross_origin()
def getCreatureGenome():
    global GOD
    return jsonify(
        GOD.getCreatureInfo(
            request.json['creatureOfInterest'],
            request.json['speciesOfInterest']))


@api.route('/save-simulation', methods=['POST'])
@cross_origin()
def saveSimulation():
    global GOD
    logging.info(
        f"Saving simulation state to {request.json['filename'] + '.json'}")
    save = json.dumps(GOD.save(), indent=4)

    with open(request.json['filename'] + '.json', "w") as savefile:
        savefile.write(save)

    return "Success", 201


@api.route('/load-simulation', methods=['POST'])
@cross_origin()
def loadSimulation():
    global GOD
    filename = request.json['filename'] + '.json'
    logging.info(f"Loading simulation state from {filename}")
    saveData = None

    if os.path.isfile(filename):
        with open(filename, "r") as savefile:
            saveData = json.load(savefile)

        GOD = god.God(0, 0, 0, 0, loadExistingSave=True, saveData=saveData)
    else:
        logging.info(f"No file of name {filename} was found to load from")

    return "Success", 201


@api.route('/create-new-topography', methods=['POST'])
@cross_origin()
def createNewTopography():
    global GOD
    logging.info(
        f"Adding new topography type {request.json['topographyType']}")
    GOD.addNewTopography(
        _convertRequestToTopographyType(
            request.json['topographyType']),
        request.json['column'],
        request.json['row'])

    return "Success", 201


@api.route('/remove-topography', methods=['POST'])
@cross_origin()
def removeTopography():
    global GOD
    logging.info(
        f"Removing topography from column {request.json['column']}, row {request.json['row']}")
    GOD.removeTopography(request.json['column'], request.json['row'])

    return "Success", 201


@api.route('/add-preset-topography', methods=['POST'])
@cross_origin()
def addPresetTopography():
    global GOD
    GOD.addPresetTopography(request.json['presetTopographyId'])

    return "Success", 201


@api.route('/time-of-simulation')
@cross_origin()
def timeOfSimulation():
    global GOD
    return jsonify(GOD.getTimeOfSimulation())


@api.route('/get-light-visibility')
@cross_origin()
def getLightVisibility():
    global GOD
    return jsonify(GOD.getLightVisibility())


@api.route('/get-topography-info', methods=['GET'])
@cross_origin()
def getTopographyInfo():
    global GOD
    return jsonify(GOD.getTopographyInfo())


@api.route('/define-new-species-relationship', methods=['POST'])
@cross_origin()
def defineNewSpeciesRelationship():
    global GOD
    GOD.addSpeciesRelationship(
        request.json['species1'],
        request.json['species2'],
        _convertRequestToSpeciesRelationship(
            request.json['relationship']))

    return "Success", 201
