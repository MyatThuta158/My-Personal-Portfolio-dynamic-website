import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSideBarMenu from "../Layouts/AdminSideBarMenu";
import AdminDashboard from "../Components/AdminDashboard";
import SettingIntro from "../Components/SettingIntro";
import Projects from "../Components/Projects";
import ProjectUpdate from "../Components/ProjectUpdate";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminSideBarMenu />}>
        <Route path="/LandingInfo" element={<SettingIntro />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/ProjectUpdate/:id" element={<ProjectUpdate />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
