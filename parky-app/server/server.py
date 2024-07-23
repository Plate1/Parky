from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import json
app = Flask(__name__)

# ???? idk what's going on
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/school-and-lots', methods=['GET'])
def get_geojson_data():
    data = []

    f = open('./data/band-lot.geojson')
    data.append(json.load(f))
    f.close()

    f = open('./data/front-lot.geojson')
    data.append(json.load(f))
    f.close()

    f = open('./data/stadium-lot.geojson')
    data.append(json.load(f))
    f.close()

    if data: 
        return data
    else:
        return "Error 404"
    
@app.route('/api/student-data', methods=['GET'])
def get_student_data():
    f = open('./data/test/V3test175.json')
    data = json.load(f)
    f.close()

    if data:
        return data
    else:
        return "Error 404"

@app.route('/api/notifications', methods=['GET'])
def get_notifications():
    f = open('./data/notifications.json')
    data = json.load(f)
    f.close()

    if (data):
        return data
    else:
        return "Error 404"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
