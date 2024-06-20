import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/index.css";
import "./assets/styles/import.scss"
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store/index.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "online",
      retry: false, // default: 3
      refetchOnWindowFocus: false, // default: true
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </Router>
);
