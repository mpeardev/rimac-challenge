import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RimacApp from "./RimacApp.tsx";
import "./styles/main.scss";
import { UserProvider } from "./modules/core/states/user/user-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RimacApp />
    </UserProvider>
  </StrictMode>
);
