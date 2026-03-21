from flask import Flask, request, jsonify
from models.vehicle import Vehicle
from models.intersection import Intersection
from utils.scheduler import run_simulation
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

intersection = Intersection("A1")
@app.route('/')
def home():
    return "Randi ritesh"

@app.route('/add_vehicle',methods=['POST'])
def add_vehicle():
    data = request.json

    v = Vehicle(
        v_type=data["type"],
        lane = data["lane"],
        destination=data.get("destination")
    )

    intersection.add_vehicle(v)
    return jsonify({"status":"added"})

@app.route('/step',methods=['GET'])
def step():
    result = run_simulation(intersection)
    return jsonify(result)

@app.route('/state',methods=['GET'])
def state():
    return jsonify(intersection.get_state())


if __name__=='__main__':
    app.run(debug=True)
