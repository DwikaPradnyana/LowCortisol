import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "model/model_burnout_production.keras")
ENCODER_PATH = os.path.join(BASE_DIR, "model/onehot_encoder.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "model/scaler.pkl")
TARGET_ENCODER_PATH = os.path.join(BASE_DIR, "model/le_target.pkl")
FEATURE_NAMES_PATH = os.path.join(BASE_DIR, "model/feature_names.pkl")