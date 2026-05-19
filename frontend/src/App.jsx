import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './components/layout/Background';
import TopNavbar from './components/layout/TopNavbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

// Halaman Publik
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Insights from './pages/Insights';
import Auth from './pages/Auth';

// Halaman Private
import Dashboard from './pages/Dashboard'; 
import CheckIn from './pages/CheckIn';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <Background />
        
        <Routes>
          {/* --- RUTE PUBLIK --- */}
          <Route path="/" element={<><TopNavbar /><Home /></>} />
          <Route path="/how-it-works" element={<><TopNavbar /><HowItWorks /></>} />
          <Route path="/insights" element={<><TopNavbar /><Insights /></>} />
          <Route path="/auth" element={<><TopNavbar /><Auth /></>} />

          {/* --- RUTE PRIVATE --- */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route path="/dashboard/checkin" element={<CheckIn />} />
              <Route path="/dashboard/insights" element={<div className="p-8">Insights Page</div>} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;