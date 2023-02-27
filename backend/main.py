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
                                          float(inputRequest.json['intelligence']),
                                          float(inputRequest.json['selfPreservation']),
                                          float(inputRequest.json['mobility']),
                                          reproType,
                                          float(inputRequest.json['offspringAmount']),
                                          float(inputRequest.json['motivation']),
                                          float(inputRequest.json['maxEnergy']),
                                          float(inputRequest.json['individualism']),
                                          float(inputRequest.json['territorial']),
                                          float(inputRequest.json['fightOrFlight']),
                                          float(inputRequest.json['hostility']),
                                          float(inputRequest.json['scent']),
                                          float(inputRequest.json['stealth']),
                                          float(inputRequest.json['lifeExpectancy']),
                                          float(inputRequest.json['offensiveAbility']),
                                          float(inputRequest.json['defensiveAbility']),
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
def startSimulation():
    global GOD
    GOD = god.God(
        request.json['simulationWidth'],
        request.json['simulationHeight'],
        request.json['columnCount'],
        request.json['rowCount'])
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
