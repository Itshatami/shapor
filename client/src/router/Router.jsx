import { Route, Routes } from "react-router-dom";

import AuthPage from "../features/auth/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import { logout } from "../features/auth/services/auth.service";
import PublicRoute from "./PublicRoute";

// موقتاً برای تست
function HomePage() {
  return <h1>Home Page</h1>;
}

function ProfilePage() {
  
  return( 
    <div>
      <h1>Profile Page</h1>
      <button onClick={()=> logout()}>logout</button>
    </div>
  );
}

function Router() {
  return (
    <Routes>
     <Route
  path="/auth"
  element={
    <PublicRoute>
      <AuthPage />
    </PublicRoute>
  }
/>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Router;