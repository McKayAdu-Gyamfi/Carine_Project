import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ManagerLayout from "./components/ManagerLayout";
import { ThemeProvider } from "./components/theme-provider";
import { BookingProvider } from "./contexts/BookingContext";
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
const ManagerClients = React.lazy(() => import("./pages/manager/ManagerClients"));
const ManagerPayouts = React.lazy(() => import("./pages/manager/ManagerPayouts"));
const ManagerCancelRefund = React.lazy(() => import("./pages/manager/ManagerCancelRefund"));
const ManagerProfile = React.lazy(() => import("./pages/manager/ManagerProfile"));
const PaymentDetails = React.lazy(() => import("./pages/PaymentDetails"));

const AdminLayout = React.lazy(() => import("./components/AdminLayout"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = React.lazy(() => import("./pages/admin/AdminUsers"));
const AdminHostels = React.lazy(() => import("./pages/admin/AdminHostels"));
const AdminSchools = React.lazy(() => import("./pages/admin/AdminSchools"));
const AdminRoomTours = React.lazy(() => import("./pages/admin/AdminRoomTours"));
const AdminSettings = React.lazy(() => import("./pages/admin/AdminSettings"));

const ScreenLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
      <ToastProvider>
        <BookingProvider>
        <Router>
        <Suspense fallback={<ScreenLoader />}>
        <Routes>
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manage-bookings" element={<ManageBookings />} />
        </Route>

        {/* Manager Routes */}
        <Route element={<ProtectedRoute><ManagerLayout /></ProtectedRoute>}>
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/properties" element={<ManagerProperties />} />
          <Route path="/manager/bookings" element={<ManagerBookings />} />
          <Route path="/manager/clients" element={<ManagerClients />} />
          <Route path="/manager/payouts" element={<ManagerPayouts />} />
          <Route path="/manager/profile" element={<ManagerProfile />} />
          <Route path="/manager/cancel-refund/:id" element={<ManagerCancelRefund />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/hostels" element={<AdminHostels />} />
          <Route path="/admin/schools" element={<AdminSchools />} />
          <Route path="/admin/room-tours" element={<AdminRoomTours />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
        
        {/* Full-screen routes without bottom nav */}
        <Route path="/login" element={<Login />} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/live-preview" element={<ProtectedRoute><LivePreview /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><PaymentDetails /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </Suspense>
      </Router>
        </BookingProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
