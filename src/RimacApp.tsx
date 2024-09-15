import { HashRouter as Router } from "react-router-dom";
import { AppRoutes } from "./modules/core/router/routes";

export default function RimacApp() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
