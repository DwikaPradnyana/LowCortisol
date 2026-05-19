import axios from 'axios';

// Ini adalah URL untuk Back-End Express Anda nanti.
// Saat tim Data/Back-End selesai, Anda hanya perlu mengubah variabel ini.
// Contoh: const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'MOCK_MODE'; 

/**
 * Fungsi utilitas untuk mensimulasikan koneksi jaringan (delay)
 * Mencegah UI terlihat instan sehingga kita bisa menguji state 'loading'
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  /**
   * Simulasi Login
   * @param {Object} credentials - { email, password }
   */
  async login(credentials) {
    // Jika backend asli sudah siap, hapus blok IF ini dan gunakan axios.post
    if (API_BASE_URL === 'MOCK_MODE') {
      await delay(1200); // Simulasi koneksi 1.2 detik

      // Validasi palsu
      if (!credentials.email || !credentials.password) {
        throw new Error('Email dan password tidak boleh kosong');
      }
      if (credentials.password.length < 6) {
        throw new Error('Password harus minimal 6 karakter');
      }

      // Mengembalikan response sukses palsu (Mock JWT Token)
      return {
        data: {
          token: 'mock_jwt_token_789xyz',
          user: {
            id: 'usr_123',
            name: credentials.email.split('@')[0], // Ambil nama dari email
            email: credentials.email
          }
        }
      };
    }

    // Kode asli yang akan berjalan saat Back-End siap:
    /*
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response;
    */
  },

  /**
   * Simulasi Register
   * @param {Object} userData - { name, email, password }
   */
  async register(userData) {
    if (API_BASE_URL === 'MOCK_MODE') {
      await delay(1500); // Simulasi proses lebih lama untuk register

      if (!userData.name || !userData.email || !userData.password) {
        throw new Error('Semua kolom harus diisi');
      }

      return {
        data: {
          message: 'Registrasi berhasil',
          token: 'mock_jwt_token_new_user',
          user: {
            id: 'usr_999',
            name: userData.name,
            email: userData.email
          }
        }
      };
    }

    // Kode asli:
    /*
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response;
    */
  }
};