from flask import Flask
from flask_cors import CORS, cross_origin
import god
import creatures.genome

api = Flask(__name__)
cors = CORS(api)
api.config["CORS_HEADERS"] = "Content-Type"

GOD = None

def _convertRequestToGenome(request):
    receptorsList = []

    if request.form['canSee'] == 'true':
        receptorsList.append(creatures.genome.Receptors.VISION)
    if request.form['canSmell'] == 'true':
        receptorsList.append(creatures.genome.Receptors.SMELL)
    if request.form['canHear'] == 'true':
        receptorsList.append(creatures.genome.Receptors.HEAR)
    
    inputGenome = creatures.genome.Genome(int(request.form['visibility']),
        int(request.form['maxHealth']),
        receptorsList,
        int(request.form['sightAbility']),
        int(request.form['smellAbility']),
        int(request.form['hearingAbility']),
        int(request.form['sightRange']),
        int(request.form['smellRange']),
        int(request.form['hearingRange']),
        int(request.form['reactionTime']),
        int(request.form['intelligence']),
        int(request.form['selfPreservation']),
        int(request.form['mobility']),
        int(request.form['reproductionType']),
        int(request.form['offspringAmount']),
        int(request.form['motivation']),
        int(request.form['maxEnergy']),
        int(request.form['individualism']),
        int(request.form['territorial']),
        int(request.form['fightOrFlight']),
        int(request.form['hostility']),
        int(request.form['scent']),
        int(request.form['stealth']),
        int(request.form['lifeExpectancy']),
        int(request.form['offensiveAbility']),
        int(request.form['defensiveAbility']),
        int(request.form['shape']),
        int(request.form['color'])
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
    GOD = god.God()


@api.route('/create-new-species', methods=['POST'])
@cross_origin()
def createNewSpecies():
    initialGenome = _convertRequestToGenome(request)
    GOD.createNewSpecies(request.form['speciesName'], initialGenome)


@api.route('/delete-species', methods=['POST'])
@cross_origin()
def deleteSpecies():
    GOD.deleteSpecies(request.form['speciesName'])


@api.route('/create-new-creature', methods=['POST'])
@cross_origin()
def createNewCreature():
    initialGenome = _convertRequestToGenome(request)
    GOD.createNewCreature(request.form['speciesName'], initialGenome)
    

@api.route('/delete-creature', methods=['POST'])
@cross_origin()
def deleteCreature():
    GOD.deleteCreature(request.form['speciesName'], request.form['creatureId'])
