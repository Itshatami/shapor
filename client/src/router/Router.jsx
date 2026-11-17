import { Route, Routes } from "react-router-dom";

import AuthPage from "../features/auth/AuthPage";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../features/auth/services/auth.service";
import Loader from "../shared/components/Loader";

function Router() {
//   const { data, isLoading } = useQuery({ queryKey: ["get-profile"], queryFn: getProfile });
//   console.log({ data, isLoading });
//   if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default Router;
