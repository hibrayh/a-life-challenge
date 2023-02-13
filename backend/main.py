from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask import request
import god
import creatures.genome
import creatures.species_manager


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


@api.route('/start-simulation')
def startSimulation():
    global GOD
    GOD = god.God()
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


@api.route('/get-food-info')
@cross_origin()
def getFoodInfo():
    global GOD
    return jsonify(GOD.getFoodInfo())

@api.route('/get-topography-info')
@cross_origin()
def getTopographyInfo():
    global GOD
    return jsonify(GOD.getTopographyInfo())


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
