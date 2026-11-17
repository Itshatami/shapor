import { Route, Routes } from "react-router-dom";

import AuthPage from "../features/auth/AuthPage";

function Router() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default Router;
