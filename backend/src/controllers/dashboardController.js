const CheckIn = require('../models/CheckIn');
const User = require('../models/User');

const getStrictTodayDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

exports.submitCheckIn = async (req, res) => {
  try {
    const payload = req.body;
    const userId = req.user._id; 
    const today = getStrictTodayDate();

    if (
      payload.jam_kerja_per_hari == null || 
      payload.jam_tidur_per_hari == null || 
      !payload.beban_kerja_persepsi || 
      payload.tingkat_stres == null || 
      payload.produktivitas_diri == null
    ) {
      return res.status(400).json({ error: 'Payload ditolak. 5 metrik inti (jam kerja, jam tidur, persepsi beban, stres, produktivitas) wajib diisi.' });
    }

    const existingCheckIn = await CheckIn.findOne({ user: userId, date: today });
    if (existingCheckIn) {
      return res.status(400).json({ error: 'Anda sudah melakukan Check-In hari ini.' });
    }

    let riskLevel = "Low";
    let insight = "Rasio kerja dan pemulihan Anda seimbang. Kapasitas berada di batas aman.";

    if (payload.jam_kerja_per_hari >= 12 || payload.jam_tidur_per_hari <= 5 || payload.tingkat_stres >= 8 || payload.beban_kerja_persepsi === 'Sangat Berat') {
      riskLevel = "High";
      insight = "Indikasi kelelahan ekstrem terdeteksi dari data inti Anda. Risiko burnout sangat tinggi.";
    } else if (payload.jam_kerja_per_hari > 9 || payload.jam_tidur_per_hari < 7 || payload.tingkat_stres >= 6 || payload.beban_kerja_persepsi === 'Berat') {
      riskLevel = "Medium";
      insight = "Beban kognitif mulai menumpuk. Perhatikan kualitas tidur dan jeda aktivitas Anda.";
    }

    const checkInData = {
      user: userId,
      date: today,
      ...payload,
      fatigueRisk: riskLevel,
      insight: insight
    };

    const newCheckIn = await CheckIn.create(checkInData);

    res.status(201).json({
      status: 'success',
      data: {
        risk: newCheckIn.fatigueRisk,
        insight: newCheckIn.insight,
      }
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ error: 'Validasi Check-In Gagal', detail: messages });
    }
    res.status(500).json({ error: 'Gagal memproses Check-In', detail: error.message });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = getStrictTodayDate();

    const todayRecord = await CheckIn.findOne({ user: userId, date: today });
    const hasCheckedInToday = !!todayRecord;
    const user = await User.findById(userId).select('name');
    const pastRecords = await CheckIn.find({ user: userId }).sort({ createdAt: -1 }).limit(7);

    const recordMap = {};
    pastRecords.forEach(record => {
      recordMap[record.date] = record.fatigueRisk;
    });

    const weeklyTrends = [];
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"]; 
    
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date(now);
      targetDate.setDate(now.getDate() - i);
      const strictDate = `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`;
      weeklyTrends.push({
        d: dayNames[targetDate.getDay()],
        r: recordMap[strictDate] || "None"
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: { name: user.name },
        hasCheckedInToday: hasCheckedInToday,
        todayStatus: {
          risk: todayRecord ? todayRecord.fatigueRisk : "Low",
          insight: todayRecord ? todayRecord.insight : "Lengkapi jurnal Anda hari ini untuk melihat analisis AI."
        },
        weeklyTrends: weeklyTrends,
        keyDrivers: [
          { id: 1, label: "Tingkat Beban", desc: "Sinyal stres dan persepsi beban Anda.", iconType: "Briefcase", colorTheme: "orange" },
          { id: 2, label: "Pemulihan", desc: "Durasi tidur sebagai penopang energi.", iconType: "BatteryFull", colorTheme: "indigo" },
        ],
        recommendedActions: [
          { id: 1, label: "Pernapasan Dalam", time: "5 mnt", done: hasCheckedInToday, iconType: "Wind" },
          { id: 2, label: "Jeda Visual", time: "10 mnt", done: false, iconType: "Coffee" },
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Gagal memuat Dashboard', detail: error.message });
  }
};