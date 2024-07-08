import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/index.css";
import "./assets/styles/import.scss"
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store/index.ts";
import { Analytics } from '@vercel/analytics/react';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Analytics />
      </QueryClientProvider>
    </Provider>
  </Router>
);
