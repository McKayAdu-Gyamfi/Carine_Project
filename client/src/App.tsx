import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ManagerLayout from "./components/ManagerLayout";
import { ThemeProvider } from "./components/theme-provider";
import { BookingProvider } from "./contexts/BookingContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastProvider } from "./components/ui/toaster";

const Home = React.lazy(() => import("./pages/Home"));
const Explore = React.lazy(() => import("./pages/Explore"));
const LivePreview = React.lazy(() => import("./pages/LivePreview"));
const Booking = React.lazy(() => import("./pages/Booking"));
const Login = React.lazy(() => import("./pages/Login"));
const Profile = React.lazy(() => import("./pages/Profile"));
const EditProfile = React.lazy(() => import("./pages/EditProfile"));
const ManageBookings = React.lazy(() => import("./pages/ManageBookings"));
const SettingsPage = React.lazy(() => import("./pages/Settings"));
const Saved = React.lazy(() => import("./pages/Saved"));
const ManagerDashboard = React.lazy(() => import("./pages/manager/ManagerDashboard"));
const ManagerProperties = React.lazy(() => import("./pages/manager/ManagerProperties"));
const ManagerBookings = React.lazy(() => import("./pages/manager/ManagerBookings"));
const PaymentDetails = React.lazy(() => import("./pages/PaymentDetails"));

const ScreenLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <ScreenLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ToastProvider>
        <AuthProvider>
          <BookingProvider>
            <Router>
              <Suspense fallback={<ScreenLoader />}>
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
                  <Route path="/payment" element={<ProtectedRoute><PaymentDetails /></ProtectedRoute>} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Suspense>
            </Router>
          </BookingProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
