import pandas as pd
import joblib

from app.config import (
    ENCODER_PATH,
    SCALER_PATH,
    FEATURE_NAMES_PATH
)

# Load assets sekali saja saat startup
encoder = joblib.load(ENCODER_PATH)
scaler = joblib.load(SCALER_PATH)
feature_names = joblib.load(FEATURE_NAMES_PATH)

CAT_COLS = [
    'jenis_kelamin',
    'pendidikan_terakhir',
    'status_pernikahan',
    'departemen',
    'tipe_perusahaan',
    'status_wfh',
    'beban_kerja_persepsi',
    'status_merokok',
    'riwayat_kesehatan_mental',
    'keluhan_fisik_utama',
    'keamanan_pekerjaan'
]

def preprocess_input(input_data: dict):

    df_input = pd.DataFrame([input_data])

    num_cols = [
        col for col in df_input.columns
        if col not in CAT_COLS
    ]

    encoded_cat = encoder.transform(df_input[CAT_COLS])

    encoded_df = pd.DataFrame(
        encoded_cat,
        columns=encoder.get_feature_names_out(CAT_COLS)
    )

    final_df = pd.concat(
        [df_input[num_cols].reset_index(drop=True), encoded_df],
        axis=1
    )

    final_df = final_df.reindex(
        columns=feature_names,
        fill_value=0
    )

    scaled_input = scaler.transform(final_df)

    return scaled_input