from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.form.to_dict()
    print("Received data:", data)

    response_data = {
        "status": "success",
        "message": "Data processing completed successfully",
        "data": data
    }

    return jsonify(response_data)

@app.route('/test')
def test_route():
    return jsonify({'message': 'Hello, this is a test route!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
