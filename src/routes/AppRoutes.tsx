import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Stations from "../pages/Stations";
import Employees from "../pages/Employees";
import Shifts from "../pages/Shifts";
import DutyCharts from "../pages/DutyCharts";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/shifts" element={<Shifts />} />
        <Route path="/duty-charts" element={<DutyCharts />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;