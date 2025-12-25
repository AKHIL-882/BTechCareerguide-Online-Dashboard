import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const createClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

const QueryProvider = ({ children }) => {
  const [queryClient] = useState(createClient);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
