import Login from "../pages/auth/login";
import Exams from "../pages/exams/index.tsx";
import QuestionResult from "../pages/exams/result/index.tsx";
import TestByName from "../pages/exams/test/testByScienceId.tsx";
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
  {
    name: "Exams",
    path: "/exams",
    component: Exams,
    structure: "layout",
  },
  {
    name: "Test",
    path: `/exams/test/:slug`,
    component: TestByName,
    structure: "layout",
  },
  {
    name: "QuestionResult",
    path: `/exams/result`,
    component: QuestionResult,
    structure: "layout",
  },

];
