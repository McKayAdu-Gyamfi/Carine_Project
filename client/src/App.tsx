import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import HostelDetails from "./pages/HostelDetails";
import LivePreview from "./pages/LivePreview";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ManageBookings from "./pages/ManageBookings";
import SettingsPage from "./pages/Settings";
import Layout from "./components/Layout";
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
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Full-screen routes without bottom nav */}
        <Route path="/login" element={<Login />} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/manage-bookings" element={<ProtectedRoute><ManageBookings /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/hostel-details" element={<ProtectedRoute><HostelDetails /></ProtectedRoute>} />
        <Route path="/live-preview" element={<ProtectedRoute><LivePreview /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}
