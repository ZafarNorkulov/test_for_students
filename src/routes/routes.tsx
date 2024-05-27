import Login from "../pages/auth/login";
import Home from "../pages/index.tsx";

export const public_routes = [
  {
    name: "Login",
    path: "/signin",
    component: Login,
    structure: "",
  },
];
export const private_routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    structure: "layout",
  },
];
