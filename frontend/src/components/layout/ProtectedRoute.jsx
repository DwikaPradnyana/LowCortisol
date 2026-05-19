import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Mengecek apakah token 'paspor' ada di Local Storage
  const isAuthenticated = localStorage.getItem("token") !== null;

  // Jika tidak ada token, tendang kembali ke halaman otentikasi
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Jika ada token, izinkan render komponen anak (AppLayout & Dashboard)
  return <Outlet />;
}