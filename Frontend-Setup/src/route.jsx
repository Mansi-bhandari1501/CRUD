import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BaseLayout from "./Layout/BaseLayout";
import Owner from "./pages/Owner";
import Signup from "./pages/Signup/signup";
import Login from "./pages/Login/login";
// import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import NotFound from "./pages/AccessDenial";

const RouteComponent = () => {
  const userRole = useSelector((state) => state?.user?.user?.role_details?.name);
  const token = useSelector((state) => state?.user?.token);
  console.log(token)
  return (
<Routes>
  {!token ? (
    <Route path="/" element={<BaseLayout />}>
      <Route path="" element={<Navigate to="/login" />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Route>
  ) : (
    <>
      
        <Route path="/owner" element={<BaseLayout />}>
          <Route path="panel" element={<Owner />} />
          <Route path="*" element={<Navigate to="/owner/panel" />} />
        </Route>
    </>
  )}
  <Route path="/access-denied" element={<NotFound />} />
</Routes>
  );
};

export default RouteComponent;
