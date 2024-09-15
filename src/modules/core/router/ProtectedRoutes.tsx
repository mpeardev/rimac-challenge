import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  authorization: boolean;
  children: React.ReactNode;
}

export default function ProtectedRoutes({
  authorization,
  children,
}: ProtectedRoutesProps) {
  return authorization ? children : <Navigate to="/" />;
}
