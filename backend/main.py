from flask import Flask, render_template
from flask_cors import CORS, cross_origin
import god 
import creatures.genome
import environment

api = Flask(__name__)
cors = CORS(api)
api.config["CORS_HEADERS"] = "Content-Type"


@api.route('/main-menu')
@api.route("/")
def main_menu():
    return render_template("menu.html")


@api.route('/get-info')
@cross_origin()
def return_dummy_info():
    response_body = {
        "creatureId": "0A34D2",
        "species": "Shlorpians",
        "location": "(x, y)",
        "shape": "square",
        "color": "blue",
    }

    return response_body


@api.route('/env-info')
@cross_origin()
def environment_info():
    environment_details = {
        "topographyId": "Grasslands",
        "lightVisibility": "100%",
        "resources": "[water, food]",
        "timeofSim": "Daytime",
    }
    return environment_details
