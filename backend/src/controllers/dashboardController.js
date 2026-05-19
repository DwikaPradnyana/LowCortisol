const CheckIn = require('../models/CheckIn');
const User = require('../models/User');

const getStrictTodayDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

// @desc    Submit form Check-In dan simpan ke Database
// @route   POST /api/dashboard/checkin
// @access  Private (Membutuhkan JWT Token)
exports.submitCheckIn = async (req, res) => {
  try {
    const { workHours, sleepHours, cognitiveLoad } = req.body;
    const userId = req.user._id; 
    const today = getStrictTodayDate();

    // 1. Validasi Input Dasar
    if (workHours == null || sleepHours == null || cognitiveLoad == null) {
      return res.status(400).json({ error: 'Input tidak lengkap (workHours, sleepHours, cognitiveLoad wajib diisi).' });
    }

    // 2. Validasi Duplikasi Harian
    const existingCheckIn = await CheckIn.findOne({ user: userId, date: today });
    if (existingCheckIn) {
      return res.status(400).json({ error: 'Anda sudah melakukan Check-In hari ini.' });
    }

    // 3. Simulasi Prediksi Model ML 
    // (Akan diganti dengan panggilan ke file .h5 nanti jika diperlukan)
    let riskLevel = "Low";
    let insight = "Kualitas tidur dan jam kerjamu seimbang. Kapasitas berada di batas aman.";

    if (workHours >= 10 || sleepHours <= 5 || cognitiveLoad >= 4) {
      riskLevel = "High";
      insight = "Model AI mendeteksi rasio kerja-istirahat yang ekstrem. Risiko burnout sangat tinggi. Wajib kurangi beban hari ini.";
    } else if (workHours > 8 || sleepHours < 7 || cognitiveLoad >= 3) {
      riskLevel = "Medium";
      insight = "Beban mulai terakumulasi. Pastikan mengambil jeda layar secara berkala untuk memulihkan kapasitas kognitif.";
    }

    // 4. Simpan ke MongoDB Atlas
    const newCheckIn = await CheckIn.create({
      user: userId,
      date: today,
      workHours,
      sleepHours,
      cognitiveLoad,
      fatigueRisk: riskLevel,
      insight: insight
    });

    res.status(201).json({
      status: 'success',
      data: {
        risk: newCheckIn.fatigueRisk,
        insight: newCheckIn.insight,
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Gagal memproses Check-In', detail: error.message });
  }
};

// @desc    Ambil Agregasi Data Dashboard
// @route   GET /api/dashboard
// @access  Private (Membutuhkan JWT Token)
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = getStrictTodayDate();

    // 1. Cek status Check-In hari ini
    const todayRecord = await CheckIn.findOne({ user: userId, date: today });
    const hasCheckedInToday = !!todayRecord;

    // 2. Ambil data User
    const user = await User.findById(userId).select('name');

    // 3. Ambil Histori 7 Hari Terakhir dari Database
    const pastRecords = await CheckIn.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(7);

    // --- PERBAIKAN LOGIKA WEEKLY TRENDS ---
    // Buat peta (map) data berdasarkan tanggal untuk pencarian instan (O(1))
    const recordMap = {};
    pastRecords.forEach(record => {
      recordMap[record.date] = record.fatigueRisk;
    });

    const weeklyTrends = [];
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"]; // Array standar Date.getDay() (Minggu = 0)
    
    // Loop mundur dari hari ini (0) sampai 6 hari yang lalu (6)
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date(now);
      targetDate.setDate(now.getDate() - i);
      
      const strictDate = `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`;
      const dayInitial = dayNames[targetDate.getDay()];
      
      // Jika tanggal tersebut ada di recordMap, ambil nilainya. Jika tidak, "None".
      weeklyTrends.push({
        d: dayInitial,
        r: recordMap[strictDate] || "None"
      });
    }
    // ---------------------------------------

    // 5. Susun Respons
    res.status(200).json({
      status: 'success',
      data: {
        user: { name: user.name },
        hasCheckedInToday: hasCheckedInToday,
        todayStatus: {
          risk: todayRecord ? todayRecord.fatigueRisk : "Low",
          insight: todayRecord 
            ? todayRecord.insight 
            : "Silakan lakukan Check-In untuk mendapatkan analisis risiko Anda hari ini."
        },
        weeklyTrends: weeklyTrends,
        keyDrivers: [
          { id: 1, label: "Tingkat Beban", desc: "Berdasarkan input kognitif Anda minggu ini.", iconType: "Briefcase", colorTheme: "orange" },
          { id: 2, label: "Pola Tidur", desc: "Konsistensi waktu pemulihan Anda.", iconType: "BatteryFull", colorTheme: "indigo" },
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