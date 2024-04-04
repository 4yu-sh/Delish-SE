import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SuperAdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin && userInfo.isSuperAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default SuperAdminRoute;
