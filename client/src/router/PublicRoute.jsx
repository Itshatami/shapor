import { Navigate } from "react-router-dom";
import { useProfile } from "../features/auth/hooks/useAuth";
import Loader from "../shared/components/Loader";

function PublicRoute({ children }) {
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) return <Loader />;

  if (isError) {
    return <p>خطا در دریافت اطلاعات کاربر</p>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;