import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "../queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
            <ReactQueryDevtools />

    </QueryClientProvider>
  );
}

export default AppProviders;