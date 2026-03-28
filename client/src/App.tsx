import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import HostelDetails from "./pages/HostelDetails";
import LivePreview from "./pages/LivePreview";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Full-screen routes without bottom nav */}
        <Route path="/login" element={<Login />} />
        <Route path="/hostel-details" element={<HostelDetails />} />
        <Route path="/live-preview" element={<LivePreview />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}
