from flask import Flask
from flask_cors import CORS, cross_origin

api = Flask(__name__)
cors = CORS(api)
api.config["CORS_HEADERS"] = "Content-Type"


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
