import numpy as np
import tensorflow as tf
import joblib

from app.config import (
    MODEL_PATH,
    TARGET_ENCODER_PATH
)

@tf.keras.utils.register_keras_serializable()
class SmartFeatureAttention(tf.keras.layers.Layer):

    def __init__(self, **kwargs):
        super(SmartFeatureAttention, self).__init__(**kwargs)

    def build(self, input_shape):

        self.w = self.add_weight(
            name='feature_weight',
            shape=(input_shape[-1],),
            initializer='ones',
            trainable=True
        )

        super(SmartFeatureAttention, self).build(input_shape)

    def call(self, inputs):

        activated_weights = tf.nn.sigmoid(self.w)

        return inputs * activated_weights


def production_smooth_loss(y_true, y_pred):
    return tf.keras.losses.categorical_crossentropy(y_true, y_pred)


# Load model sekali saat startup
model = tf.keras.models.load_model(
    MODEL_PATH,
    custom_objects={
        'SmartFeatureAttention': SmartFeatureAttention,
        'production_smooth_loss': production_smooth_loss
    }
)

target_encoder = joblib.load(TARGET_ENCODER_PATH)

def predict_burnout(processed_input):

    prediction_prob = model.predict(
        processed_input,
        verbose=0
    )

    predicted_class_idx = np.argmax(
        prediction_prob,
        axis=1
    )[0]

    confidence_score = float(
        np.max(prediction_prob) * 100
    )

    burnout_label = target_encoder.inverse_transform(
        [predicted_class_idx]
    )[0]

    probabilities = {
        str(target_encoder.classes_[i]): f"{prob * 100:.2f}%"
        for i, prob in enumerate(prediction_prob[0])
    }

    return {
        "prediksi_level": burnout_label,
        "kepastian_ai": f"{confidence_score:.2f}%",
        "probabilitas_detail": probabilities
    }