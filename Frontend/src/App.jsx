import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/User/HomePage/HomePage";
import Signup from "./Pages/User/Signup/Signup";
import Login from "./Pages/User/Login/Login";
import ProfilePage from "./Pages/User/ProfilePage/ProfilePage";
import AdminLogin from "./Pages/Admin/Login/AdminLogin";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouteAdmin from "./Components/PrivateRouteAdmin/PrivateRouteAdmin";

const App = () => {
  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        {/* user-Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        {/* Admin-routes */}
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRouteAdmin>
              <Dashboard />
            </PrivateRouteAdmin>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
