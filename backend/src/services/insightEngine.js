exports.generateDailyInsight = (mlLabel, coreData = {}, optionalData = {}) => {
  const riskLabel = mlLabel || "Low";

  // 1. Primary Insight (Status Keseluruhan)
  let primaryText = "Keseimbangan ritme kerja dan pemulihanmu terpantau stabil.";
  if (riskLabel === 'High') primaryText = "Kapasitas kognitif dan fisikmu beroperasi di batas toleransi maksimal.";
  else if (riskLabel === 'Medium') primaryText = "Terdeteksi akumulasi beban. Pemulihan mulai tertinggal dari aktivitas.";

  const todayStatus = { risk: riskLabel, insight: primaryText };

  // 2. Evaluasi Paralel (Mencari semua faktor kontributor)
  const contributors = [];
  const tidur = Number(coreData.jam_tidur_per_hari) || 0;
  const stres = Number(coreData.tingkat_stres) || 0;
  const kerja = Number(coreData.jam_kerja_per_hari) || 0;
  const beban = coreData.beban_kerja_persepsi || 'Ringan';
  const produktivitas = Number(coreData.produktivitas_diri) || 0;

  // A. Recovery Deficit
  if (tidur > 0 && tidur < 7) {
    let desc = `Durasi tidurmu (${tidur} jam) berada di bawah ambang pemulihan optimal.`;
    if (optionalData.kualitas_tidur && optionalData.kualitas_tidur < 5) desc += ` Kualitas tidur yang rendah memperburuk defisit ini.`;
    contributors.push({ id: 'sleep', title: 'Defisit Pemulihan', iconType: 'MoonStars', severity: tidur < 5 ? 90 : 70, desc });
  }

  // B. Mental Load
  if (stres >= 7) {
    let desc = `Tekanan mental tercatat pada level tinggi (${stres}/10).`;
    if (optionalData.frekuensi_meeting_per_hari >= 4) desc += ` Rangkaian meeting yang padat membebani kapasitas kognitif.`;
    contributors.push({ id: 'stress', title: 'Beban Mental Akut', iconType: 'Brain', severity: stres >= 8 ? 85 : 65, desc });
  }

  // C. Operational Overload
  if (kerja >= 9 || beban === 'Sangat Berat' || beban === 'Berat') {
    let desc = `Jam kerja aktual (${kerja} jam) dengan persepsi beban '${beban}' melampaui kapasitas wajar.`;
    if (optionalData.jam_lembur_per_hari > 0) desc += ` Tambahan lembur ${optionalData.jam_lembur_per_hari} jam menguras sisa energimu.`;
    contributors.push({ id: 'work', title: 'Overload Operasional', iconType: 'Briefcase', severity: kerja >= 10 ? 80 : 60, desc });
  }

  // D. Cognitive Fatigue (Contradiction)
  if (produktivitas > 0 && produktivitas <= 5 && kerja >= 8) {
    contributors.push({ id: 'cognitive', title: 'Kelelahan Kognitif', iconType: 'Warning', severity: 75, desc: `Kerja panjang tidak menghasilkan output yang proporsional (Produktivitas: ${produktivitas}/10).` });
  }

  // 3. Sorting & Synthesis
  contributors.sort((a, b) => b.severity - a.severity);

  let personalInsight = { 
    iconType: "Sparkle", 
    title: "Ritme Stabil", 
    description: "Tidak terdeteksi deviasi negatif yang signifikan pada indikator utamamu hari ini.",
    factors: [] // Tambahan data untuk UI Density
  };
  
  let recommendation = { 
    iconType: "Check", 
    title: "Pertahankan Ritme", 
    time: "Hari ini", 
    description: "Lanjutkan rutinitas positifmu. Pertahankan batas waktu kerjamu saat ini.",
    basis: "Pola Stabil"
  };

  if (contributors.length === 1) {
    const top = contributors[0];
    personalInsight = {
      iconType: top.iconType,
      title: top.title,
      description: top.desc,
      factors: [top.title]
    };
    recommendation = getRecommendation(top.id);
  } else if (contributors.length >= 2) {
    const top1 = contributors[0];
    const top2 = contributors[1];
    
    // SINTESIS RELASIONAL
    personalInsight = {
      iconType: top1.iconType, // Menggunakan ikon penyumbang paling parah
      title: "Akumulasi Beban",
      description: `${top1.desc} Ditambah dengan ${top2.title.toLowerCase()}, kombinasi ini secara signifikan memperlambat proses recovery-mu.`,
      factors: [top1.title, top2.title]
    };
    recommendation = getRecommendation(top1.id, true);
  }

  return { todayStatus, personalInsight, recommendation };
};

// Helper internal untuk memetakan rekomendasi secara spesifik berdasarkan kontributor utama
function getRecommendation(primaryDriverId, isAccumulated = false) {
  const urgency = isAccumulated ? "Sangat Penting" : "Disarankan";
  switch (primaryDriverId) {
    case 'sleep':
      return { iconType: "MoonStars", title: "Prioritaskan Tidur Malam Ini", time: urgency, description: "Pemulihan fisik adalah prioritas mutlak. Hentikan paparan layar 1 jam sebelum tidur dan hindari kompensasi kerja malam.", basis: "Defisit Pemulihan" };
    case 'stress':
      return { iconType: "Wind", title: "Protokol Dekompresi Mental", time: urgency, description: "Ambil jarak fisik dari area kerjamu. Lakukan pernapasan 4-7-8 selama 5 menit untuk mereset sistem saraf simpatikmu.", basis: "Beban Mental Akut" };
    case 'work':
      return { iconType: "Stack", title: "Enforce Hard Cut-off", time: urgency, description: "Tentukan batas waktu berhenti kerja yang kaku hari ini. Produktivitas tambahan tidak akan efektif dalam kondisi energi terkuras.", basis: "Overload Operasional" };
    case 'cognitive':
      return { iconType: "Coffee", title: "Jeda Konteks", time: urgency, description: "Memaksakan diri saat kelelahan kognitif hanya akan memicu kesalahan. Beralih ke tugas administratif ringan atau hentikan pekerjaan total.", basis: "Kelelahan Kognitif" };
    default:
      return { iconType: "Check", title: "Jaga Keseimbangan", time: "Hari ini", description: "Pertahankan rasio kerja dan istirahat yang sudah berjalan baik.", basis: "Ritme Stabil" };
  }
}