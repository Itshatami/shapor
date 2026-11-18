import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./shared/layouts/MainLayout";
import Router from "./router/Router";
import AppProviders from "./app/providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <MainLayout>
          <Router />
        </MainLayout>
        <Toaster />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
