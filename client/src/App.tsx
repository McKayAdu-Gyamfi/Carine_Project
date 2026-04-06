import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import LivePreview from "./pages/LivePreview";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ManageBookings from "./pages/ManageBookings";
import SettingsPage from "./pages/Settings";
import Saved from "./pages/Saved";
import Layout from "./components/Layout";
import ManagerLayout from "./components/ManagerLayout";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerProperties from "./pages/manager/ManagerProperties";
import ManagerBookings from "./pages/manager/ManagerBookings";
import { ThemeProvider } from "./components/theme-provider";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("userAvatar") !== null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
      <Routes>
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Manager Routes */}
        <Route element={<ProtectedRoute><ManagerLayout /></ProtectedRoute>}>
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/properties" element={<ManagerProperties />} />
          <Route path="/manager/bookings" element={<ManagerBookings />} />
        </Route>
        
        {/* Full-screen routes without bottom nav */}
        <Route path="/login" element={<Login />} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/manage-bookings" element={<ProtectedRoute><ManageBookings /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/live-preview" element={<ProtectedRoute><LivePreview /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}
