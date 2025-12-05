from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and features
model = joblib.load("rf_model.pkl")
features = joblib.load("features.pkl")

@app.route("/", methods=["GET"])
def home():
    return {"message": "Backend is running!"}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        # Ensure correct features
        df = df[features]
        pred = model.predict(df)[0]
        return jsonify({"prediction": float(pred)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
