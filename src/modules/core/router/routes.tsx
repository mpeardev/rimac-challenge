import { Routes, Route, Navigate } from "react-router-dom";
import HealthInsurance from "../../health-insurance/HealthInsurance";
import Plans from "../../plans/Plans";
import ProtectedRoutes from "./ProtectedRoutes";
import Summary from "../../summary/Summary";
import { useContext } from "react";
import UserContext from "../states/user/user-context";

export function AppRoutes() {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<HealthInsurance />} />
      <Route
        path="/plans"
        element={
          <ProtectedRoutes authorization={!!user}>
            <Plans />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/summary"
        element={
          <ProtectedRoutes authorization={!!user?.plan}>
            <Summary />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
