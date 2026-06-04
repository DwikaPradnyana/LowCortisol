import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import seaborn as sns
import re

# ─────────────────────────────────────────────────────────────
# KONFIGURASI HALAMAN
# ─────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="Dashboard Analisis Burnout Karyawan",
    page_icon="🔥",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ─────────────────────────────────────────────────────────────
# KUSTOM CSS — LIGHT THEME
# ─────────────────────────────────────────────────────────────
st.markdown("""
<style>
/* ── Font ── */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
html, body, [class*="css"] { font-family: 'Inter', sans-serif; }

/* ── App background ── */
.stApp { background: #f6f8fa; color: #1f2328; }

/* ── Sidebar ── */
[data-testid="stSidebar"] {
    background: linear-gradient(180deg, #ffffff 0%, #f6f8fa 100%);
    border-right: 2px solid #d0d7de;
}
[data-testid="stSidebar"] * { color: #1f2328 !important; }
[data-testid="stSidebar"] .stRadio label { color: #1f2328 !important; font-weight: 500; }

/* ── Metric Cards ── */
[data-testid="metric-container"] {
    background: #ffffff !important;
    background-color: #ffffff !important;
    border: 1px solid #d0d7de !important;
    border-radius: 12px !important;
    padding: 16px 20px !important;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08) !important;
}
/* Force semua elemen di dalam metric ke warna gelap */
[data-testid="metric-container"] * { color: #1f2328 !important; }
[data-testid="metric-container"] > div { background: transparent !important; }
/* Label (judul metrik) */
[data-testid="metric-container"] label,
[data-testid="stMetricLabel"],
[data-testid="stMetricLabel"] p,
[data-testid="stMetricLabel"] div {
    color: #656d76 !important;
    font-size: 13px !important;
}
/* Nilai metrik */
[data-testid="stMetricValue"],
[data-testid="stMetricValue"] > div,
[data-testid="stMetricValue"] p {
    color: #1f2328 !important;
    font-size: 28px !important;
    font-weight: 700 !important;
}
/* Delta (angka persentase di bawah) */
[data-testid="stMetricDelta"] svg { fill: #1a7f37 !important; }
[data-testid="stMetricDelta"] { color: #1a7f37 !important; }

/* ── Judul seksi ── */
h1 { color: #bc4c00 !important; font-weight: 800; font-size: 2.2rem !important; }
h2 { color: #0969da !important; font-weight: 700; }
h3 { color: #0969da !important; font-weight: 600; }

/* ── Divider ── */
hr { border-color: #d0d7de; }

/* ── Insight box ── */
.insight-box {
    background: #ffffff;
    border-left: 4px solid #bc4c00;
    border-radius: 8px;
    padding: 14px 18px;
    margin: 12px 0;
    color: #1f2328;
    font-size: 14px;
    line-height: 1.6;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.insight-box b { color: #bc4c00; }

/* ── Tab ── */
[data-baseweb="tab-list"] { gap: 4px; }
[data-baseweb="tab"] {
    background: #ffffff;
    border-radius: 8px;
    color: #656d76 !important;
    border: 1px solid #d0d7de;
}
[aria-selected="true"] {
    background: linear-gradient(135deg, #bc4c00, #953900) !important;
    color: #fff !important;
    border-color: transparent !important;
}
</style>
""", unsafe_allow_html=True)

# ─────────────────────────────────────────────────────────────
# LOAD & BERSIHKAN DATA
# ─────────────────────────────────────────────────────────────
NOISE = {"-", "?", "tidak tahu", "Tidak Tahu", ""}

def to_nan(series):
    return series.apply(lambda x: np.nan if str(x).strip() in NOISE else x)

def std_gender(x):
    if pd.isna(x): return np.nan
    v = str(x).strip().lower()
    if v in {"l","laki","laki-laki","pria","male","cowo","lk"}: return "Laki-laki"
    if v in {"p","perempuan","wanita","female","cewe","pr"}:    return "Perempuan"
    return np.nan

def std_edu(x):
    if pd.isna(x): return np.nan
    v = str(x).strip().lower().replace("-","").replace(" ","")
    m = {"sd":"SD","smp":"SMP","sma":"SMA","smk":"SMA","smasmk":"SMA",
         "d3":"D3","diploma3":"D3","s1":"S1","sarjana":"S1",
         "s2":"S2","magister":"S2","s3":"S3","doktor":"S3"}
    return m.get(v, np.nan)

def std_marital(x):
    if pd.isna(x): return np.nan
    v = str(x).strip().lower()
    if v in {"belum menikah","lajang","single"}:                 return "Belum Menikah"
    if v in {"menikah","married"}:                               return "Menikah"
    if v in {"cerai","divorced","duda","janda","duda/janda"}:    return "Cerai/Duda/Janda"
    return np.nan

def std_company(x):
    if pd.isna(x): return np.nan
    v = str(x).strip().lower()
    m = {"swasta":"Swasta","corporate":"Swasta","korporat":"Swasta",
         "bumn":"BUMN","badan usaha milik negara":"BUMN",
         "startup":"Startup","freelance":"Freelance"}
    return m.get(v, np.nan)

def std_wfh(x):
    if pd.isna(x): return np.nan
    v = str(x).strip().lower()
    if v in {"ya","y","yes","iya"}:                                           return "Ya"
    if v in {"tidak","t","no","nope"}:                                        return "Tidak"
    if v in {"hybrid","campuran","kadang","tergantung","wfh & wfo","wfh&wfo"}: return "Hybrid"
    return np.nan

def std_workload(x):
    if pd.isna(x): return np.nan
    v = str(x).strip().lower()
    if v in {"ringan","sangat ringan","normal"}:     return "Ringan"
    if v in {"sedang","medium"}:                     return "Sedang"
    if v in {"berat","heavy","tinggi","overload"}:   return "Berat"
    if v in {"sangat berat","overwhelmed"}:          return "Sangat Berat"
    return np.nan

def std_smoke(x):
    if pd.isna(x): return np.nan
    v = str(x).strip().lower()
    if v in {"ya","yes","iya","merokok"}:        return "Ya"
    if v in {"tidak","no","tidak merokok"}:      return "Tidak"
    if v in {"kadang","social smoker","sosial"}: return "Kadang"
    return np.nan

def std_job_sec(x):
    if pd.isna(x): return np.nan
    v = str(x).strip().lower()
    m = {"sangat tidak aman":"Sangat Tidak Aman","tidak aman":"Tidak Aman",
         "khawatir":"Tidak Aman","sangat khawatir":"Sangat Tidak Aman",
         "netral":"Cukup Aman","cukup aman":"Cukup Aman",
         "aman":"Aman","sangat aman":"Sangat Aman"}
    return m.get(v, np.nan)

@st.cache_data
def load_data():
    df = pd.read_csv("dataAIBaru.csv")
    df = df.drop_duplicates()
    df = df.drop(columns=["employee_id"])

    df["jenis_kelamin"]       = to_nan(df["jenis_kelamin"]).apply(std_gender)
    df["pendidikan_terakhir"] = to_nan(df["pendidikan_terakhir"]).apply(std_edu)
    df["status_pernikahan"]   = to_nan(df["status_pernikahan"]).apply(std_marital)
    df["tipe_perusahaan"]     = to_nan(df["tipe_perusahaan"]).apply(std_company)
    df["status_wfh"]          = to_nan(df["status_wfh"]).apply(std_wfh)
    df["beban_kerja_persepsi"]= to_nan(df["beban_kerja_persepsi"]).apply(std_workload)
    df["status_merokok"]      = to_nan(df["status_merokok"]).apply(std_smoke)
    df["keamanan_pekerjaan"]  = to_nan(df["keamanan_pekerjaan"]).apply(std_job_sec)

    for col in ["departemen","keluhan_fisik_utama","riwayat_kesehatan_mental"]:
        df[col] = to_nan(df[col]).str.strip().str.title()

    numeric_bounds = {
        "usia"                          : (15, 70),
        "lama_bekerja_tahun"            : (0,  50),
        "jam_kerja_per_hari"            : (0,  24),
        "jam_lembur_per_hari"           : (0,  16),
        "jam_tidur_per_hari"            : (0,  24),
        "kualitas_tidur"                : (0,  10),
        "frekuensi_olahraga_per_minggu" : (0,  14),
        "jam_layar_per_hari"            : (0,  24),
        "tingkat_stres"                 : (0,  10),
        "kepuasan_kerja"                : (0,  10),
        "work_life_balance"             : (0,  10),
        "produktivitas_diri"            : (0,  10),
        "dukungan_atasan"               : (0,  10),
        "frekuensi_meeting_per_hari"    : (0,  20),
        "jumlah_deadline_per_minggu"    : (0,  50),
        "frekuensi_konflik_kerja"       : (0,  10),
    }
    for col, (lo, hi) in numeric_bounds.items():
        df[col] = (
            pd.to_numeric(df[col], errors="coerce")
            .clip(lower=lo, upper=hi)
            .round(0)
            .astype("Int64")
        )
    for col in numeric_bounds:
        if df[col].isna().any():
            median_val = int(df[col].dropna().median())
            df[col] = df[col].fillna(median_val)

    cat_cols = [
        "jenis_kelamin","pendidikan_terakhir","status_pernikahan",
        "departemen","tipe_perusahaan","status_wfh","beban_kerja_persepsi",
        "status_merokok","keluhan_fisik_utama","riwayat_kesehatan_mental","keamanan_pekerjaan",
    ]
    for col in cat_cols:
        if df[col].isna().any():
            mode_val = df[col].mode()
            if len(mode_val) > 0:
                df[col] = df[col].fillna(mode_val[0])

    burnout_map = {"Low": 1, "Medium": 2, "High": 3}
    df["tingkat_burnout"] = df["tingkat_burnout_label"].map(burnout_map)
    return df

df = load_data()

# ─────────────────────────────────────────────────────────────
# WARNA PALET — LIGHT THEME
# ─────────────────────────────────────────────────────────────
PALETTE_BURNOUT = {"Low": "#1a7f37", "Medium": "#d4a72c", "High": "#d1242f"}
BG_CHART   = "#ffffff"
COLOR_GRID = "#d0d7de"
COLOR_TEXT = "#656d76"
COLOR_BAR  = "#0969da"
COLOR_LINE = "#bc4c00"

def apply_light_style(ax, title="", xlabel="", ylabel=""):
    ax.set_facecolor(BG_CHART)
    ax.figure.set_facecolor(BG_CHART)
    ax.tick_params(colors="#1f2328", labelsize=9)
    ax.xaxis.label.set_color(COLOR_TEXT)
    ax.yaxis.label.set_color(COLOR_TEXT)
    ax.title.set_color("#1f2328")
    for spine in ax.spines.values():
        spine.set_edgecolor(COLOR_GRID)
    ax.yaxis.grid(True, color=COLOR_GRID, linewidth=0.7, linestyle="--", alpha=0.8)
    ax.set_axisbelow(True)
    if title:  ax.set_title(title, fontsize=11, fontweight="bold", color="#1f2328", pad=10)
    if xlabel: ax.set_xlabel(xlabel, fontsize=9, color=COLOR_TEXT)
    if ylabel: ax.set_ylabel(ylabel, fontsize=9, color=COLOR_TEXT)

def insight(text, color="#bc4c00"):
    st.markdown(
        f'<div class="insight-box" style="border-left-color:{color}">{text}</div>',
        unsafe_allow_html=True,
    )

# ─────────────────────────────────────────────────────────────
# SIDEBAR NAVIGASI
# ─────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("## 🔥 Dashboard Burnout")
    st.markdown("---")
    menu = st.radio(
        "Navigasi",
        [
            "📊 Overview",
            "👤 Demografi",
            "🏢 Pekerjaan",
            "⚖️ Beban Kerja",
            "🌿 Gaya Hidup",
            "🧠 Psikologis",
            "💊 Kesehatan",
            "📝 Kesimpulan",
        ],
        label_visibility="collapsed",
    )
    st.markdown("---")
    st.markdown(
        "<small style='color:#656d76'>Data: 18.000 karyawan<br>Sumber: dataAIBaru.csv</small>",
        unsafe_allow_html=True,
    )

# ─────────────────────────────────────────────────────────────
# STATISTIK DASAR
# ─────────────────────────────────────────────────────────────
n_total  = len(df)
n_low    = (df["tingkat_burnout_label"] == "Low").sum()
n_medium = (df["tingkat_burnout_label"] == "Medium").sum()
n_high   = (df["tingkat_burnout_label"] == "High").sum()

# ─────────────────────────────────────────────────────────────
# HELPER: grouped bar dengan label angka
# ─────────────────────────────────────────────────────────────
def plot_grouped_bar(dist_df, title, figsize=(5, 4)):
    """dist_df: DataFrame dengan kolom Low/Medium/High, index = kategori."""
    fig, ax = plt.subplots(figsize=figsize)
    x = np.arange(len(dist_df.index))
    w = 0.25
    for i, cat in enumerate(["Low", "Medium", "High"]):
        if cat in dist_df.columns:
            vals = dist_df[cat].values
            bars = ax.bar(x + i * w, vals, w,
                          label=cat, color=PALETTE_BURNOUT[cat],
                          edgecolor="#ffffff", linewidth=0.6)
            # Label angka di atas setiap bar
            for bar, v in zip(bars, vals):
                if v > 0:
                    ax.text(
                        bar.get_x() + bar.get_width() / 2,
                        bar.get_height() + max(vals) * 0.01,
                        f"{int(v):,}",
                        ha="center", va="bottom",
                        fontsize=7, color="#1f2328", fontweight="500",
                    )
    ax.set_xticks(x + w)
    ax.set_xticklabels(dist_df.index, fontsize=8)
    leg = ax.legend(fontsize=8, facecolor=BG_CHART, edgecolor=COLOR_GRID)
    for txt in leg.get_texts():
        txt.set_color("#1f2328")
    apply_light_style(ax, title, "", "Jumlah Karyawan")
    return fig

# ─────────────────────────────────────────────────────────────
# HELPER: line chart dengan label angka di setiap titik
# ─────────────────────────────────────────────────────────────
def plot_line_burnout(data, x_col, title, xlabel, color=None, figsize=(7, 4),
                      label_step=1, label_fmt="{:.2f}"):
    """
    data    : DataFrame dengan kolom x_col dan 'tingkat_burnout'
    label_step : tampilkan label setiap N titik (1 = semua)
    """
    if color is None:
        color = COLOR_LINE
    fig, ax = plt.subplots(figsize=figsize)
    xs = data[x_col].astype(int).values
    ys = data["tingkat_burnout"].values

    ax.plot(xs, ys, color=color, linewidth=2.2, marker="o",
            markersize=5, markerfacecolor="#ffffff", markeredgecolor=color, markeredgewidth=1.5)
    ax.fill_between(xs, ys, alpha=0.12, color=color)

    # Label angka di setiap titik
    for idx, (xi, yi) in enumerate(zip(xs, ys)):
        if idx % label_step == 0:
            ax.annotate(
                label_fmt.format(yi),
                (xi, yi),
                textcoords="offset points",
                xytext=(0, 8),
                ha="center", fontsize=7.5, color=color, fontweight="600",
            )

    ax.set_ylim(0.5, 3.5)
    ax.axhline(2, color=COLOR_GRID, linewidth=1, linestyle="--")
    apply_light_style(ax, title, xlabel, "Rata-rata Burnout (1=Low, 3=High)")
    return fig


# ══════════════════════════════════════════════════════════════
# HALAMAN 1 — OVERVIEW
# ══════════════════════════════════════════════════════════════
if menu == "📊 Overview":
    st.title("📊 Overview — Tingkat Burnout Karyawan")
    st.markdown(
        "Dashboard ini menyajikan analisis **komprehensif** tingkat burnout "
        "18.000 karyawan berdasarkan faktor demografis, pekerjaan, beban kerja, "
        "gaya hidup, psikologis, dan kesehatan."
    )

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Total Karyawan",  f"{n_total:,}")
    c2.metric("Burnout Rendah",  f"{n_low:,}",    f"{n_low/n_total*100:.1f}%")
    c3.metric("Burnout Sedang",  f"{n_medium:,}", f"{n_medium/n_total*100:.1f}%")
    c4.metric("Burnout Tinggi",  f"{n_high:,}",   f"{n_high/n_total*100:.1f}%")

    st.markdown("---")

    col_l, col_r = st.columns(2)

    # Pie chart distribusi
    with col_l:
        fig, ax = plt.subplots(figsize=(5, 4))
        labels  = ["Low", "Medium", "High"]
        sizes   = [n_low, n_medium, n_high]
        colors  = [PALETTE_BURNOUT[l] for l in labels]
        wedges, texts, autotexts = ax.pie(
            sizes, labels=labels, colors=colors,
            autopct="%1.1f%%", startangle=140,
            wedgeprops=dict(edgecolor="#ffffff", linewidth=2),
        )
        for t in texts:
            t.set_color("#1f2328"); t.set_fontsize(10)
        for at in autotexts:
            at.set_color("#ffffff"); at.set_fontsize(9); at.set_fontweight("bold")
        ax.set_facecolor(BG_CHART); fig.set_facecolor(BG_CHART)
        ax.set_title("Distribusi Tingkat Burnout", fontsize=11, fontweight="bold", color="#1f2328")
        st.pyplot(fig); plt.close()

    # Bar chart distribusi dengan angka
    with col_r:
        fig, ax = plt.subplots(figsize=(5, 4))
        bars = ax.bar(labels, sizes, color=colors, edgecolor="#ffffff", linewidth=0.8)
        for bar, val in zip(bars, sizes):
            ax.text(bar.get_x() + bar.get_width()/2,
                    bar.get_height() + n_total * 0.005,
                    f"{val:,}\n({val/n_total*100:.1f}%)",
                    ha="center", fontsize=9, color="#1f2328", fontweight="600")
        apply_light_style(ax, "Jumlah per Kategori Burnout", "Kategori", "Jumlah Karyawan")
        st.pyplot(fig); plt.close()

    st.markdown("---")
    st.markdown("### 💡 Ringkasan Temuan Utama")
    cols = st.columns(3)
    with cols[0]:
        insight("<b>Burnout Tinggi (High):</b> 33,3% karyawan mengalami burnout tinggi — perlu perhatian serius.")
    with cols[1]:
        insight("<b>Faktor Terkuat:</b> Persepsi beban kerja, stres, dan work-life balance paling berpengaruh.")
    with cols[2]:
        insight("<b>Rekomendasi:</b> Program kesejahteraan kerja, fleksibilitas, dan dukungan psikologis.")


# ══════════════════════════════════════════════════════════════
# HALAMAN 2 — DEMOGRAFI (PB 1)
# ══════════════════════════════════════════════════════════════
elif menu == "👤 Demografi":
    st.title("👤 Demografi & Tingkat Burnout")
    st.markdown(
        "**Pertanyaan Bisnis 1:** Apakah faktor demografis seperti jenis kelamin, usia, "
        "pendidikan terakhir, dan status pernikahan memengaruhi tingkat burnout karyawan?"
    )
    st.markdown("---")

    tab1, tab2, tab3, tab4 = st.tabs(
        ["⚧ Jenis Kelamin", "📅 Usia", "🎓 Pendidikan", "💍 Status Pernikahan"]
    )

    # ── Tab 1: Jenis Kelamin ──
    with tab1:
        gender_burnout = (
            df.groupby("jenis_kelamin")["tingkat_burnout"].mean()
            .sort_values(ascending=False)
        )
        gender_dist = (
            df.groupby(["jenis_kelamin", "tingkat_burnout_label"])
            .size().unstack(fill_value=0)
        )
        col_a, col_b = st.columns(2)
        with col_a:
            fig, ax = plt.subplots(figsize=(5, 4))
            bars = ax.bar(gender_burnout.index, gender_burnout.values,
                          color=[COLOR_BAR, "#bc4c00"], edgecolor="#ffffff", linewidth=0.8)
            for bar, v in zip(bars, gender_burnout.values):
                ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+0.02,
                        f"{v:.2f}", ha="center", fontsize=11, color="#1f2328", fontweight="bold")
            ax.set_ylim(0, 3)
            apply_light_style(ax, "Rata-rata Burnout per Jenis Kelamin", "", "Rata-rata Burnout")
            st.pyplot(fig); plt.close()
        with col_b:
            st.pyplot(plot_grouped_bar(gender_dist, "Distribusi Burnout per Jenis Kelamin"))
            plt.close()
        insight(
            "<b>Temuan:</b> Laki-laki memiliki rata-rata burnout sedikit lebih tinggi (2.01) "
            "dibandingkan perempuan (1.99). Perbedaan sangat kecil — jenis kelamin bukan "
            "faktor dominan, namun distribusi burnout tinggi cukup merata antar gender."
        )

    # ── Tab 2: Usia ──
    with tab2:
        df["kelompok_usia"] = pd.cut(
            df["usia"].astype(float),
            bins=[15, 25, 35, 45, 55, 70],
            labels=["15-25", "26-35", "36-45", "46-55", "56-70"],
        )
        age_burnout = (
            df.groupby("kelompok_usia", observed=True)["tingkat_burnout"]
            .mean().reset_index()
        )
        age_dist = (
            df.groupby(["kelompok_usia", "tingkat_burnout_label"], observed=True)
            .size().unstack(fill_value=0)
        )

        col_a, col_b = st.columns(2)
        with col_a:
            fig, ax = plt.subplots(figsize=(5, 4))
            bars = ax.bar(age_burnout["kelompok_usia"].astype(str),
                          age_burnout["tingkat_burnout"],
                          color=COLOR_BAR, edgecolor="#ffffff", linewidth=0.8)
            for bar, v in zip(bars, age_burnout["tingkat_burnout"]):
                ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+0.02,
                        f"{v:.2f}", ha="center", fontsize=9, color="#1f2328", fontweight="bold")
            ax.set_ylim(0, 3)
            apply_light_style(ax, "Rata-rata Burnout per Kelompok Usia", "Kelompok Usia", "Rata-rata Burnout")
            st.pyplot(fig); plt.close()
        with col_b:
            st.pyplot(plot_grouped_bar(age_dist, "Distribusi Burnout per Kelompok Usia"))
            plt.close()
        insight(
            "<b>Temuan:</b> Kelompok usia 36-45 memiliki rata-rata burnout tertinggi. "
            "Usia produktif menengah menghadapi lebih banyak tekanan dan tanggung jawab."
        )

    # ── Tab 3: Pendidikan ──
    with tab3:
        edu_order = ["SD", "SMP", "SMA", "D3", "S1", "S2", "S3"]
        edu_burnout = (
            df.groupby("pendidikan_terakhir")["tingkat_burnout"].mean()
            .reindex([e for e in edu_order if e in df["pendidikan_terakhir"].unique()])
            .reset_index()
        )
        edu_dist = (
            df.groupby(["pendidikan_terakhir", "tingkat_burnout_label"])
            .size().unstack(fill_value=0)
        )
        edu_dist = edu_dist.reindex([e for e in edu_order if e in edu_dist.index])

        col_a, col_b = st.columns(2)
        with col_a:
            fig, ax = plt.subplots(figsize=(5, 4))
            bars = ax.bar(edu_burnout["pendidikan_terakhir"], edu_burnout["tingkat_burnout"],
                          color=COLOR_BAR, edgecolor="#ffffff", linewidth=0.8)
            for bar, v in zip(bars, edu_burnout["tingkat_burnout"]):
                ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+0.02,
                        f"{v:.2f}", ha="center", fontsize=9, color="#1f2328", fontweight="bold")
            ax.set_ylim(0, 3)
            apply_light_style(ax, "Rata-rata Burnout per Pendidikan", "Pendidikan Terakhir", "Rata-rata Burnout")
            st.pyplot(fig); plt.close()
        with col_b:
            st.pyplot(plot_grouped_bar(edu_dist, "Distribusi Burnout per Pendidikan"))
            plt.close()
        insight(
            "<b>Temuan:</b> Tingkat pendidikan tidak menunjukkan perbedaan burnout yang signifikan. "
            "Burnout lebih dipengaruhi kondisi kerja daripada latar belakang pendidikan."
        )

    # ── Tab 4: Status Pernikahan ──
    with tab4:
        marital_burnout = (
            df.groupby("status_pernikahan")["tingkat_burnout"].mean()
            .sort_values(ascending=False)
        )
        marital_dist = (
            df.groupby(["status_pernikahan", "tingkat_burnout_label"])
            .size().unstack(fill_value=0)
        )
        marital_dist = marital_dist.loc[marital_burnout.index]

        col_a, col_b = st.columns(2)
        with col_a:
            fig, ax = plt.subplots(figsize=(5, 4))
            clrs = [COLOR_BAR, "#bc4c00", "#d1242f"][:len(marital_burnout)]
            bars = ax.bar(marital_burnout.index, marital_burnout.values,
                          color=clrs, edgecolor="#ffffff", linewidth=0.8)
            for bar, v in zip(bars, marital_burnout.values):
                ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+0.02,
                        f"{v:.2f}", ha="center", fontsize=10, color="#1f2328", fontweight="bold")
            ax.set_ylim(0, 3); plt.xticks(fontsize=8, rotation=10)
            apply_light_style(ax, "Rata-rata Burnout per Status Pernikahan", "", "Rata-rata Burnout")
            st.pyplot(fig); plt.close()
        with col_b:
            fig = plot_grouped_bar(marital_dist, "Distribusi Burnout per Status Pernikahan")
            plt.xticks(rotation=10, fontsize=7)
            st.pyplot(fig); plt.close()
        insight(
            "<b>Temuan:</b> Karyawan belum menikah memiliki burnout sedikit lebih tinggi. "
            "Dukungan emosional dari pasangan diduga membantu menurunkan burnout."
        )


# ══════════════════════════════════════════════════════════════
# HALAMAN 3 — PEKERJAAN (PB 2)
# ══════════════════════════════════════════════════════════════
elif menu == "🏢 Pekerjaan":
    st.title("🏢 Faktor Pekerjaan & Tingkat Burnout")
    st.markdown(
        "**Pertanyaan Bisnis 2:** Bagaimana departemen, tipe perusahaan, status WFH, "
        "dan lama bekerja memengaruhi tingkat burnout karyawan?"
    )
    st.markdown("---")

    tab1, tab2, tab3, tab4 = st.tabs(
        ["🏬 Departemen", "🏭 Tipe Perusahaan", "🏠 Status WFH", "📆 Lama Bekerja"]
    )

    with tab1:
        dept_burnout = (
            df.groupby("departemen")["tingkat_burnout"].mean()
            .sort_values(ascending=False).reset_index()
        )
        col_a, col_b = st.columns([3, 2])
        with col_a:
            fig, ax = plt.subplots(figsize=(7, 5))
            colors_dept = [COLOR_BAR if i < 3 else "#d0d7de" for i in range(len(dept_burnout))]
            bars = ax.barh(dept_burnout["departemen"][::-1],
                           dept_burnout["tingkat_burnout"][::-1],
                           color=colors_dept[::-1], edgecolor="#ffffff", linewidth=0.8)
            for bar, v in zip(bars, dept_burnout["tingkat_burnout"][::-1]):
                ax.text(bar.get_width() + 0.01,
                        bar.get_y() + bar.get_height()/2,
                        f"{v:.3f}", va="center", fontsize=9,
                        color="#1f2328", fontweight="600")
            ax.set_xlim(0, 3)
            apply_light_style(ax, "Rata-rata Burnout per Departemen", "Rata-rata Burnout", "Departemen")
            st.pyplot(fig); plt.close()
        with col_b:
            st.markdown("### Top 3 Departemen")
            for _, row in dept_burnout.head(3).iterrows():
                st.metric(row["departemen"], f"{row['tingkat_burnout']:.3f}")
            insight("<b>HR, Marketing, Finance</b> memiliki burnout tertinggi.")

    with tab2:
        company_burnout = (
            df.groupby("tipe_perusahaan")["tingkat_burnout"].mean()
            .sort_values(ascending=False)
        )
        company_dist = (
            df.groupby(["tipe_perusahaan", "tingkat_burnout_label"])
            .size().unstack(fill_value=0)
        )
        col_a, col_b = st.columns(2)
        with col_a:
            fig, ax = plt.subplots(figsize=(5, 4))
            clrs = [COLOR_BAR, "#d4a72c", "#1a7f37", "#bc4c00"][:len(company_burnout)]
            bars = ax.bar(company_burnout.index, company_burnout.values,
                          color=clrs, edgecolor="#ffffff", linewidth=0.8)
            for bar, v in zip(bars, company_burnout.values):
                ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+0.02,
                        f"{v:.3f}", ha="center", fontsize=10, color="#1f2328", fontweight="bold")
            ax.set_ylim(0, 3)
            apply_light_style(ax, "Rata-rata Burnout per Tipe Perusahaan", "", "Rata-rata Burnout")
            st.pyplot(fig); plt.close()
        with col_b:
            st.pyplot(plot_grouped_bar(company_dist, "Distribusi Burnout per Tipe Perusahaan"))
            plt.close()
        insight(
            "<b>Startup</b> memiliki burnout tertinggi — tekanan target cepat, "
            "jam panjang, dan multitasking. BUMN/Swasta lebih stabil dan lebih rendah burnout-nya."
        )

    with tab3:
        wfh_burnout = (
            df.groupby("status_wfh")["tingkat_burnout"].mean()
            .sort_values(ascending=False)
        )
        wfh_dist = (
            df.groupby(["status_wfh", "tingkat_burnout_label"])
            .size().unstack(fill_value=0)
        )
        col_a, col_b = st.columns(2)
        with col_a:
            fig, ax = plt.subplots(figsize=(5, 4))
            clrs = [COLOR_BAR, "#bc4c00", "#1a7f37"][:len(wfh_burnout)]
            bars = ax.bar(wfh_burnout.index, wfh_burnout.values,
                          color=clrs, edgecolor="#ffffff", linewidth=0.8)
            for bar, v in zip(bars, wfh_burnout.values):
                ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+0.02,
                        f"{v:.3f}", ha="center", fontsize=10, color="#1f2328", fontweight="bold")
            ax.set_ylim(0, 3)
            apply_light_style(ax, "Rata-rata Burnout per Status WFH", "Status WFH", "Rata-rata Burnout")
            st.pyplot(fig); plt.close()
        with col_b:
            st.pyplot(plot_grouped_bar(wfh_dist, "Distribusi Burnout per Status WFH"))
            plt.close()
        insight(
            "<b>WFH Penuh</b> memiliki burnout paling rendah. Fleksibilitas kerja dari "
            "rumah membantu mengurangi tekanan dan kelelahan fisik karyawan."
        )

    with tab4:
        work_year_burnout = (
            df.groupby("lama_bekerja_tahun")["tingkat_burnout"]
            .mean().reset_index()
        )
        work_year_burnout = work_year_burnout[work_year_burnout["lama_bekerja_tahun"] <= 20]
        fig = plot_line_burnout(
            work_year_burnout, "lama_bekerja_tahun",
            "Rata-rata Burnout berdasarkan Lama Bekerja (0-20 tahun)",
            "Lama Bekerja (tahun)",
            label_step=2, label_fmt="{:.2f}",
        )
        st.pyplot(fig); plt.close()
        insight(
            "<b>Pola burnout tidak linear.</b> Burnout cenderung meningkat pada masa kerja "
            "10-19 tahun — fase kejenuhan dan akumulasi stres jangka panjang."
        )


# ══════════════════════════════════════════════════════════════
# HALAMAN 4 — BEBAN KERJA (PB 3)
# ══════════════════════════════════════════════════════════════
elif menu == "⚖️ Beban Kerja":
    st.title("⚖️ Beban Kerja & Tingkat Burnout")
    st.markdown(
        "**Pertanyaan Bisnis 3:** Apakah jam kerja, jam lembur, frekuensi meeting, "
        "jumlah deadline, konflik kerja, dan persepsi beban kerja berkaitan dengan "
        "meningkatnya burnout karyawan?"
    )
    st.markdown("---")

    tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
        "⏰ Jam Kerja", "🌙 Lembur", "📅 Meeting",
        "📌 Deadline", "⚡ Konflik", "🧱 Persepsi Beban"
    ])

    def beban_line(col_name, title, xlabel, filter_max=None, step=1):
        data = (
            df.groupby(col_name)["tingkat_burnout"].mean().reset_index()
        )
        if filter_max:
            data = data[data[col_name] <= filter_max]
        return plot_line_burnout(data, col_name, title, xlabel,
                                 label_step=step, label_fmt="{:.2f}")

    with tab1:
        st.pyplot(beban_line("jam_kerja_per_hari",
                             "Burnout vs Jam Kerja per Hari", "Jam Kerja / Hari", 15, step=1))
        plt.close()
        insight(
            "<b>Hubungan sangat kuat dan positif.</b> Karyawan dengan 12-14 jam kerja/hari "
            "nyaris mencapai burnout maksimum (3.00)."
        )

    with tab2:
        st.pyplot(beban_line("jam_lembur_per_hari",
                             "Burnout vs Jam Lembur per Hari", "Jam Lembur / Hari", step=1))
        plt.close()
        insight(
            "<b>Lembur adalah faktor utama burnout.</b> Lembur 4-5 jam/hari membawa "
            "burnout mendekati level tertinggi (≈2.97)."
        )

    with tab3:
        st.pyplot(beban_line("frekuensi_meeting_per_hari",
                             "Burnout vs Frekuensi Meeting per Hari", "Meeting / Hari", 10, step=1))
        plt.close()
        insight(
            "<b>5-7 meeting/hari mendorong burnout ke level tinggi.</b> Meeting berlebihan "
            "mengurangi fokus kerja dan meningkatkan kelelahan mental."
        )

    with tab4:
        st.pyplot(beban_line("jumlah_deadline_per_minggu",
                             "Burnout vs Jumlah Deadline per Minggu", "Deadline / Minggu", 8, step=1))
        plt.close()
        insight(
            "<b>Deadline menumpuk = burnout melonjak.</b> 5-7 deadline/minggu membawa "
            "burnout ke level tinggi. Tekanan target berpengaruh sangat besar."
        )

    with tab5:
        st.pyplot(beban_line("frekuensi_konflik_kerja",
                             "Burnout vs Frekuensi Konflik Kerja", "Frekuensi Konflik (1-10)", step=1))
        plt.close()
        insight(
            "<b>Konflik kerja meningkatkan burnout secara linear.</b> Lingkungan tidak "
            "harmonis mempercepat kelelahan emosional karyawan."
        )

    with tab6:
        workload_order = ["Ringan", "Sedang", "Berat", "Sangat Berat"]
        persepsi_burnout = (
            df.groupby("beban_kerja_persepsi")["tingkat_burnout"].mean()
            .reindex([w for w in workload_order if w in df["beban_kerja_persepsi"].unique()])
        )
        fig, ax = plt.subplots(figsize=(6, 4))
        clrs = ["#1a7f37", "#d4a72c", "#d1242f", "#8a1a1a"][:len(persepsi_burnout)]
        bars = ax.bar(persepsi_burnout.index, persepsi_burnout.values,
                      color=clrs, edgecolor="#ffffff", linewidth=0.8)
        for bar, v in zip(bars, persepsi_burnout.values):
            ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+0.03,
                    f"{v:.2f}", ha="center", fontsize=12, color="#1f2328", fontweight="bold")
        ax.set_ylim(0, 3.5)
        apply_light_style(ax, "Rata-rata Burnout per Persepsi Beban Kerja",
                          "Persepsi Beban Kerja", "Rata-rata Burnout")
        st.pyplot(fig); plt.close()
        insight(
            "<b>Persepsi beban kerja adalah prediktor terkuat burnout.</b> Karyawan "
            "yang merasa beban 'Sangat Berat' mencapai burnout maksimum (3.00)."
        )


# ══════════════════════════════════════════════════════════════
# HALAMAN 5 — GAYA HIDUP (PB 4)
# ══════════════════════════════════════════════════════════════
elif menu == "🌿 Gaya Hidup":
    st.title("🌿 Gaya Hidup & Tingkat Burnout")
    st.markdown(
        "**Pertanyaan Bisnis 4:** Bagaimana pola tidur, olahraga, penggunaan layar, "
        "dan kebiasaan merokok memengaruhi tingkat burnout karyawan?"
    )
    st.markdown("---")

    tab1, tab2, tab3, tab4, tab5 = st.tabs(
        ["😴 Jam Tidur", "⭐ Kualitas Tidur", "🏃 Olahraga", "📱 Layar", "🚬 Merokok"]
    )

    def lifestyle_line(col_name, title, xlabel, filter_range=None, color=None, step=1):
        data = df.groupby(col_name)["tingkat_burnout"].mean().reset_index()
        if filter_range:
            data = data[(data[col_name] >= filter_range[0]) & (data[col_name] <= filter_range[1])]
        return plot_line_burnout(data, col_name, title, xlabel,
                                 color=color or COLOR_LINE, label_step=step, label_fmt="{:.2f}")

    with tab1:
        st.pyplot(lifestyle_line("jam_tidur_per_hari", "Burnout vs Jam Tidur per Hari",
                                 "Jam Tidur / Hari", (3, 12), step=1))
        plt.close()
        insight(
            "<b>Kurang tidur ↑ Burnout.</b> Tidur 3-4 jam/hari → burnout ~3.0. "
            "Tidur 8-9 jam/hari → burnout rendah. Kualitas istirahat adalah kunci."
        )

    with tab2:
        st.pyplot(lifestyle_line("kualitas_tidur", "Burnout vs Kualitas Tidur",
                                 "Kualitas Tidur (1=Buruk, 10=Sangat Baik)", (1, 10), step=1))
        plt.close()
        insight(
            "<b>Kualitas tidur berbanding terbalik dengan burnout.</b> Kualitas 1-3 → "
            "burnout hampir maksimum. Kualitas 8-9 → burnout sangat rendah."
        )

    with tab3:
        st.pyplot(lifestyle_line("frekuensi_olahraga_per_minggu", "Burnout vs Frekuensi Olahraga",
                                 "Olahraga per Minggu", (0, 7),
                                 color="#1a7f37", step=1))
        plt.close()
        insight(
            "<b>Olahraga rutin menurunkan burnout drastis.</b> Tidak olahraga → burnout ~2.85. "
            "Olahraga 4-6x/minggu → burnout ~1.10."
        )

    with tab4:
        st.pyplot(lifestyle_line("jam_layar_per_hari", "Burnout vs Jam Layar per Hari",
                                 "Jam Layar / Hari", (2, 14), step=2))
        plt.close()
        insight(
            "<b>Penggunaan layar kurang berpengaruh langsung.</b> Polanya tidak konsisten — "
            "jam layar lebih dipengaruhi jenis pekerjaan daripada kondisi burnout."
        )

    with tab5:
        smoke_burnout = (
            df.groupby("status_merokok")["tingkat_burnout"].mean()
            .sort_values(ascending=False)
        )
        fig, ax = plt.subplots(figsize=(5, 4))
        clrs = [COLOR_BAR, "#bc4c00", "#1a7f37"][:len(smoke_burnout)]
        bars = ax.bar(smoke_burnout.index, smoke_burnout.values,
                      color=clrs, edgecolor="#ffffff", linewidth=0.8)
        for bar, v in zip(bars, smoke_burnout.values):
            ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+0.02,
                    f"{v:.3f}", ha="center", fontsize=10, color="#1f2328", fontweight="bold")
        ax.set_ylim(0, 3)
        apply_light_style(ax, "Rata-rata Burnout per Status Merokok", "Status Merokok", "Rata-rata Burnout")
        st.pyplot(fig); plt.close()
        insight(
            "<b>Perokok memiliki burnout sedikit lebih tinggi</b>, namun selisihnya kecil. "
            "Merokok bukan faktor utama burnout."
        )


# ══════════════════════════════════════════════════════════════
# HALAMAN 6 — PSIKOLOGIS (PB 5)
# ══════════════════════════════════════════════════════════════
elif menu == "🧠 Psikologis":
    st.title("🧠 Faktor Psikologis & Tingkat Burnout")
    st.markdown(
        "**Pertanyaan Bisnis 5:** Bagaimana tingkat stres, kepuasan kerja, work-life balance, "
        "produktivitas diri, dukungan atasan, dan keamanan pekerjaan memengaruhi burnout?"
    )
    st.markdown("---")

    tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
        "😰 Stres", "😊 Kepuasan Kerja", "⚖️ Work-Life Balance",
        "💪 Produktivitas", "👔 Dukungan Atasan", "🔒 Keamanan Kerja"
    ])

    def psiko_line(col_name, title, xlabel, color=COLOR_LINE):
        data = (
            df.groupby(col_name)["tingkat_burnout"].mean()
            .reset_index().sort_values(col_name)
        )
        return plot_line_burnout(data, col_name, title, xlabel, color=color, label_step=1)

    with tab1:
        st.pyplot(psiko_line("tingkat_stres", "Burnout vs Tingkat Stres",
                             "Tingkat Stres (1=Rendah, 10=Sangat Tinggi)", color="#d1242f"))
        plt.close()
        insight(
            "<b>Stres adalah prediktor burnout terkuat.</b> Level stres 8-9 → burnout ≈3.0. "
            "Intervensi pengurangan stres adalah prioritas utama."
        )

    with tab2:
        st.pyplot(psiko_line("kepuasan_kerja", "Burnout vs Kepuasan Kerja",
                             "Kepuasan Kerja (1=Rendah, 10=Tinggi)", color="#1a7f37"))
        plt.close()
        insight(
            "<b>Kepuasan tinggi = burnout rendah.</b> Kepuasan 1-2 → burnout ~3.0. "
            "Apresiasi dan lingkungan nyaman kunci menurunkan burnout."
        )

    with tab3:
        st.pyplot(psiko_line("work_life_balance", "Burnout vs Work-Life Balance",
                             "Work-Life Balance (1=Buruk, 10=Sangat Baik)", color="#1a7f37"))
        plt.close()
        insight(
            "<b>WLB buruk = burnout sangat tinggi.</b> Pola konsisten dan sangat kuat. "
            "Keseimbangan kerja-kehidupan adalah faktor kritis pencegah burnout."
        )

    with tab4:
        st.pyplot(psiko_line("produktivitas_diri", "Burnout vs Persepsi Produktivitas Diri",
                             "Produktivitas Diri (1=Rendah, 10=Tinggi)", color="#1a7f37"))
        plt.close()
        insight(
            "<b>Burnout memperburuk persepsi produktivitas.</b> Karyawan burnout tinggi "
            "merasa tidak produktif — siklus negatif yang perlu diputus."
        )

    with tab5:
        st.pyplot(psiko_line("dukungan_atasan", "Burnout vs Dukungan Atasan",
                             "Dukungan Atasan (1=Tidak Ada, 10=Sangat Tinggi)", color="#1a7f37"))
        plt.close()
        insight(
            "<b>Dukungan atasan berbanding terbalik dengan burnout.</b> Kepemimpinan "
            "supportif adalah investasi penting dalam kesehatan tim."
        )

    with tab6:
        sec_order = ["Sangat Tidak Aman", "Tidak Aman", "Cukup Aman", "Aman", "Sangat Aman"]
        sec_burnout = (
            df.groupby("keamanan_pekerjaan")["tingkat_burnout"].mean()
            .reindex([s for s in sec_order if s in df["keamanan_pekerjaan"].unique()])
        )
        fig, ax = plt.subplots(figsize=(7, 4))
        clrs = ["#8a1a1a", "#d1242f", "#d4a72c", "#0969da", "#1a7f37"][:len(sec_burnout)]
        bars = ax.bar(range(len(sec_burnout)), sec_burnout.values,
                      color=clrs, edgecolor="#ffffff", linewidth=0.8)
        ax.set_xticks(range(len(sec_burnout)))
        ax.set_xticklabels(sec_burnout.index, fontsize=8, rotation=12)
        for bar, v in zip(bars, sec_burnout.values):
            ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+0.03,
                    f"{v:.2f}", ha="center", fontsize=9, color="#1f2328", fontweight="bold")
        ax.set_ylim(0, 3.5)
        apply_light_style(ax, "Rata-rata Burnout per Keamanan Pekerjaan", "", "Rata-rata Burnout")
        st.pyplot(fig); plt.close()
        insight(
            "<b>Pekerjaan tidak aman = burnout paling tinggi (2.76).</b> Ketidakpastian "
            "karier menciptakan tekanan psikologis kronis."
        )


# ══════════════════════════════════════════════════════════════
# HALAMAN 7 — KESEHATAN (PB 6)
# ══════════════════════════════════════════════════════════════
elif menu == "💊 Kesehatan":
    st.title("💊 Riwayat Kesehatan & Tingkat Burnout")
    st.markdown(
        "**Pertanyaan Bisnis 6:** Apakah riwayat kesehatan mental dan keluhan fisik utama "
        "berkaitan dengan tingkat burnout karyawan?"
    )
    st.markdown("---")

    tab1, tab2 = st.tabs(["🧠 Riwayat Kesehatan Mental", "🩺 Keluhan Fisik Utama"])

    with tab1:
        mental_burnout = (
            df.groupby("riwayat_kesehatan_mental")["tingkat_burnout"].mean()
            .sort_values(ascending=False)
        )
        mental_dist = (
            df.groupby(["riwayat_kesehatan_mental", "tingkat_burnout_label"])
            .size().unstack(fill_value=0)
        )
        mental_dist = mental_dist.loc[mental_burnout.index]

        col_a, col_b = st.columns(2)
        with col_a:
            fig, ax = plt.subplots(figsize=(6, 4))
            clrs_h = [
                PALETTE_BURNOUT["High"] if v > 2 else
                PALETTE_BURNOUT["Medium"] if v > 1.5 else
                PALETTE_BURNOUT["Low"]
                for v in mental_burnout.values[::-1]
            ]
            bars = ax.barh(mental_burnout.index[::-1], mental_burnout.values[::-1],
                           color=clrs_h, edgecolor="#ffffff", linewidth=0.8)
            for bar, v in zip(bars, mental_burnout.values[::-1]):
                ax.text(bar.get_width() + 0.02,
                        bar.get_y() + bar.get_height()/2,
                        f"{v:.3f}", va="center", fontsize=9, color="#1f2328", fontweight="600")
            ax.set_xlim(0, 3.5)
            apply_light_style(ax, "Rata-rata Burnout per Riwayat Kesehatan Mental",
                              "Rata-rata Burnout", "")
            st.pyplot(fig); plt.close()
        with col_b:
            fig = plot_grouped_bar(mental_dist, "Distribusi Burnout per Riwayat Kesehatan Mental",
                                   figsize=(6, 4))
            plt.xticks(rotation=15, fontsize=7)
            st.pyplot(fig); plt.close()
        insight(
            "<b>Kecemasan = burnout maksimum (3.00).</b> Individu dengan kecemasan lebih mudah "
            "mengalami tekanan emosional dan kelelahan mental. Program dukungan psikologis sangat diperlukan."
        )

    with tab2:
        physical_burnout = (
            df.groupby("keluhan_fisik_utama")["tingkat_burnout"].mean()
            .sort_values(ascending=False)
        )
        physical_dist = (
            df.groupby(["keluhan_fisik_utama", "tingkat_burnout_label"])
            .size().unstack(fill_value=0)
        )
        physical_dist = physical_dist.loc[physical_burnout.index]

        col_a, col_b = st.columns(2)
        with col_a:
            fig, ax = plt.subplots(figsize=(6, 5))
            clrs_p = [
                PALETTE_BURNOUT["High"] if v >= 2.5 else
                PALETTE_BURNOUT["Medium"] if v >= 1.7 else
                PALETTE_BURNOUT["Low"]
                for v in physical_burnout.values[::-1]
            ]
            bars = ax.barh(physical_burnout.index[::-1], physical_burnout.values[::-1],
                           color=clrs_p, edgecolor="#ffffff", linewidth=0.8)
            for bar, v in zip(bars, physical_burnout.values[::-1]):
                ax.text(bar.get_width() + 0.02,
                        bar.get_y() + bar.get_height()/2,
                        f"{v:.2f}", va="center", fontsize=8, color="#1f2328", fontweight="600")
            ax.set_xlim(0, 3.5)
            apply_light_style(ax, "Rata-rata Burnout per Keluhan Fisik", "Rata-rata Burnout", "")
            st.pyplot(fig); plt.close()
        with col_b:
            fig = plot_grouped_bar(physical_dist, "Distribusi Burnout per Keluhan Fisik",
                                   figsize=(6, 5))
            plt.xticks(rotation=20, fontsize=6)
            st.pyplot(fig); plt.close()
        insight(
            "<b>Kelelahan & Mata Lelah = burnout tertinggi (3.00).</b> Burnout berdampak nyata "
            "pada fisik. Karyawan tanpa keluhan fisik memiliki burnout paling rendah. "
            "<b>Kesehatan fisik dan mental saling berkaitan erat.</b>"
        )


# ══════════════════════════════════════════════════════════════
# HALAMAN 8 — KESIMPULAN
# ══════════════════════════════════════════════════════════════
elif menu == "📝 Kesimpulan":
    st.title("📝 Kesimpulan & Rekomendasi")
    st.markdown("---")

    st.markdown("### 📊 Faktor-Faktor yang Memengaruhi Burnout")
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("#### 🔴 Faktor Risiko Tinggi")
        risiko = {
            "Persepsi Beban Sangat Berat":  "Burnout 3.00 (maksimum)",
            "Stres Level 8-9":              "Burnout mendekati 3.00",
            "Work-Life Balance Buruk":      "Burnout hampir 3.00",
            "Lembur Intens (4-5 jam/hari)": "Burnout ≈2.97",
            "Jam Kerja 12-14 jam/hari":     "Burnout hampir maksimum",
            "Riwayat Kecemasan":            "Burnout 3.00",
            "Keluhan Kelelahan/Mata Lelah": "Burnout 3.00",
        }
        for f, d in risiko.items():
            st.markdown(
                f'<div class="insight-box" style="border-left-color:#d1242f">'
                f'<b>{f}</b><br>{d}</div>', unsafe_allow_html=True
            )

    with col2:
        st.markdown("#### 🟢 Faktor Pelindung")
        pelindung = {
            "Tidur 8-9 jam/hari":         "Burnout turun ke level rendah",
            "Olahraga 4-6x/minggu":       "Burnout ≈1.10",
            "Kepuasan Kerja Tinggi":       "Burnout sangat rendah",
            "WFH Penuh":                   "Burnout paling rendah",
            "Dukungan Atasan Kuat":        "Burnout menurun signifikan",
            "Keamanan Pekerjaan Terjamin": "Burnout rendah dan stabil",
            "Work-Life Balance Baik":      "Burnout mendekati 1.00",
        }
        for f, d in pelindung.items():
            st.markdown(
                f'<div class="insight-box" style="border-left-color:#1a7f37">'
                f'<b>{f}</b><br>{d}</div>', unsafe_allow_html=True
            )

    st.markdown("---")
    st.markdown("### 💡 Rekomendasi Strategis")
    recs = [
        ("🎯 Kelola Beban Kerja",
         "Batasi jam kerja berlebih, deadline menumpuk, dan lembur intens. "
         "Terapkan manajemen proyek yang realistis dan alokasi tugas adil."),
        ("🧘 Program Kesejahteraan Mental",
         "Sediakan akses konseling psikologis, pelatihan mindfulness, dan "
         "program pengelolaan stres. Prioritaskan karyawan dengan riwayat kecemasan."),
        ("🏠 Fleksibilitas Kerja",
         "Pertimbangkan model WFH atau hybrid lebih luas. WFH penuh berkorelasi "
         "dengan burnout paling rendah."),
        ("💪 Promosi Gaya Hidup Sehat",
         "Fasilitasi program olahraga, edukasi tidur berkualitas. Subsidisi gym "
         "atau olahraga kelompok."),
        ("👔 Kepemimpinan Supportif",
         "Latih atasan dalam empati dan komunikasi mendukung. Burnout turun "
         "signifikan ketika karyawan merasa didukung pimpinan."),
        ("🔒 Keamanan Karier",
         "Komunikasikan rencana karier yang jelas dan transparan. Ketidakpastian "
         "pekerjaan menciptakan stres kronis yang memperburuk burnout."),
    ]
    cols = st.columns(2)
    for i, (judul, isi) in enumerate(recs):
        with cols[i % 2]:
            st.markdown(
                f'<div class="insight-box" style="border-left-color:#0969da">'
                f'<b>{judul}</b><br><br>{isi}</div>', unsafe_allow_html=True
            )

    st.markdown("---")
    st.markdown("### 📈 Statistik Ringkas")
    c1, c2, c3, c4, c5 = st.columns(5)
    c1.metric("Total Karyawan",    f"{n_total:,}")
    c2.metric("Burnout Low",       f"{n_low:,} ({n_low/n_total*100:.1f}%)")
    c3.metric("Burnout Medium",    f"{n_medium:,} ({n_medium/n_total*100:.1f}%)")
    c4.metric("Burnout High",      f"{n_high:,} ({n_high/n_total*100:.1f}%)")
    c5.metric("Avg Burnout Score", f"{df['tingkat_burnout'].mean():.2f} / 3.00")