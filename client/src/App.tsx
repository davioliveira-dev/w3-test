import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tasks } from "./modules/Tasks";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="bottom-center"
        style={{ minWidth: "30vw" }}
        autoClose={2500}
        closeOnClick
        pauseOnHover
      />
      <Tasks />
    </QueryClientProvider>
  );
}

export default App;
