import { Navigate } from "react-router-dom";

import { useProfile } from "../features/auth/hooks/useAuth";
import Loader from "../shared/components/Loader";

function ProtectedRoute({ children }) {
  const { data: user, isLoading, isError } = useProfile();
  console.log({"message":"Protected Route",
    user,
    isLoading,
    isError,
  });

  if (isLoading) return <Loader />;

  if (isError) return <p>خطا در دریافت اطلاعات کاربر</p>;

  if (!user) return <Navigate to="/auth" replace />;

  return children;
}

export default ProtectedRoute;
