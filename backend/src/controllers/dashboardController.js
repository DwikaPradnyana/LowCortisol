const CheckIn = require('../models/CheckIn');
const User = require('../models/User');
const { classifyBurnoutRisk } = require('../services/mlService');
const { generateDailyInsight } = require('../services/insightEngine');

const getStrictTodayDate = (offsetDays = 0) => {
  const d = new Date();
  d.setUTCHours(d.getUTCHours() + 7);
  
  if (offsetDays !== 0) {
    d.setUTCDate(d.getUTCDate() + offsetDays);
  }

  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// @desc    Submit Daily Check-In
// @route   POST /api/dashboard/checkin
exports.submitCheckIn = async (req, res) => {
  try {
    const payload = req.body;
    const userId = req.user._id;
    const today = getStrictTodayDate();
    const existingCheckIn = await CheckIn.findOne({ user: userId, date: today });
    if (existingCheckIn) {
      return res.status(400).json({ error: 'Check-In untuk hari ini sudah direkam.' });
    }

    const userProfile = await User.findById(userId);
    if (!userProfile || !userProfile.onboarding_completed) {
      return res.status(403).json({ error: 'Akses ditolak. Selesaikan Onboarding Profil Anda terlebih dahulu.' });
    }

    const riskLabel = await classifyBurnoutRisk(userProfile, payload);

    const { todayStatus } = generateDailyInsight(riskLabel, payload, payload);

    const checkInData = {
      user: userId,
      date: today,
      ...payload,
      fatigueRisk: riskLabel,
      insight: todayStatus.insight
    };

    const newCheckIn = await CheckIn.create(checkInData);

    return res.status(201).json({
      status: 'success',
      data: {
        risk: newCheckIn.fatigueRisk,
        insight: newCheckIn.insight,
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Check-In ganda terdeteksi. Data hari ini sudah diamankan.' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ error: 'Payload Check-In tidak sesuai kontrak ML', detail: messages });
    }
    console.error("[Submit CheckIn Error]:", error);
    return res.status(500).json({ error: 'Gagal memproses Check-In', detail: error.message });
  }
};

// @desc    Get Dashboard Data
// @route   GET /api/dashboard
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = getStrictTodayDate();

    const user = await User.findById(userId).select('name');
    if (!user) return res.status(404).json({ error: 'Akses ditolak. User tidak valid.' });

    const todayRecord = await CheckIn.findOne({ user: userId, date: today });
    const hasCheckedInToday = !!todayRecord;
    
    const sevenDaysAgo = getStrictTodayDate(-6);
    const pastRecords = await CheckIn.find({ 
      user: userId,
      date: { $gte: sevenDaysAgo } 
    }).select('date fatigueRisk'); 

    const recordMap = {};
    pastRecords.forEach(record => { recordMap[record.date] = record.fatigueRisk; });

    const weeklyTrends = [];
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"]; 
    
    for (let i = 6; i >= 0; i--) {
      const strictDate = getStrictTodayDate(-i);
      const d = new Date();
      d.setUTCHours(d.getUTCHours() + 7);
      d.setUTCDate(d.getUTCDate() - i);
      
      weeklyTrends.push({
        d: dayNames[d.getUTCDay()],
        r: recordMap[strictDate] || "None"
      });
    }

    let todayStatus = { risk: "Low", insight: "Isi jurnal hari ini untuk melihat analisis." };
    let personalInsight = null;
    let recommendation = null;

    if (hasCheckedInToday) {
      const insights = generateDailyInsight(todayRecord.fatigueRisk, todayRecord, todayRecord);
      todayStatus = insights.todayStatus;
      personalInsight = insights.personalInsight;
      recommendation = insights.recommendation;
    }

    return res.status(200).json({
      status: 'success',
      data: {
        user: { name: user.name },
        hasCheckedInToday,
        weeklyTrends,
        todayStatus,
        personalInsight,
        recommendation
      }
    });

  } catch (error) {
    console.error("[Dashboard Load Error]:", error);
    return res.status(500).json({ error: 'Gagal memuat Dashboard', detail: error.message });
  }
};