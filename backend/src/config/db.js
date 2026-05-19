const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Kredensial MONGO_URI tidak ditemukan di dalam file .env");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`[DATABASE] MongoDB Terkoneksi: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[DATABASE ERROR] Koneksi Gagal: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;