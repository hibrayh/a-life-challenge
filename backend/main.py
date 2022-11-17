from flask import Flask
from flask_cors import CORS, cross_origin

api = Flask(__name__)
cors = CORS(api)
api.config["CORS_HEADERS"] = "Content-Type"


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
