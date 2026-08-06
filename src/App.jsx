import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import Booking from './pages/Booking'
import Bookings from './pages/Bookings'          // ← ADD
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import ProviderDashboard from './pages/ProviderDashboard'
import ResetPassword from './pages/ResetPassword'
import Splash from './pages/Splash'
import ProtectedRoute from './components/ProtectedRoute'
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/service/:id" element={<ProtectedRoute><ServiceDetail /></ProtectedRoute>} />
          <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />  {/* ← ADD */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><ProviderDashboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App