import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import AddVehicle from "./pages/AddVehicle";
import AddCategory from "./pages/AddCategory";
import EditVehicle from "./pages/EditVehicle";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeClient from "./pages/HomeClient";
import Categories from "./pages/Categories";
import VehiclesByCategory from "./pages/VehiclesByCategory";
import MyReservations from "./pages/MyReservations";
import AdminReservations from "./pages/AdminReservations";

function Private({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function RoleRoute({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return user.role === role ? children : <Navigate to="/categories" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
  path="/categories/add"
  element={
    <RoleRoute role="admin">
      <AddCategory />
    </RoleRoute>
  }
/>
<Route
  path="/categories/:id/edit-vehicle/:vehicleId"
  element={
    <RoleRoute role="admin">
      <EditVehicle />
    </RoleRoute>
  }
/>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/" element={<Private><RedirectByRole /></Private>} />

          <Route path="/home" element={<RoleRoute role="client"><HomeClient /></RoleRoute>} />
          <Route path="/categories" element={<Private><Categories /></Private>} />
          <Route path="/categories/:id/vehicles" element={<Private><VehiclesByCategory /></Private>} />
          <Route path="/categories/:id/add-vehicle" element={
    <RoleRoute role="admin">
      <AddVehicle />
    </RoleRoute>
  }
/>

          <Route path="/my-reservations" element={<RoleRoute role="client"><MyReservations /></RoleRoute>} />
          <Route path="/admin/reservations" element={<RoleRoute role="admin"><AdminReservations /></RoleRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function RedirectByRole() {
  const { user } = useAuth();
  if (user?.role === "admin") return <Navigate to="/categories" />;
  return <Navigate to="/home" />;
}
