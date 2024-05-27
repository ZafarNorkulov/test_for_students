import { RoutesTypeElement } from "./types";
import UserLayout from "../layouts/userLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../store";
import { private_routes, public_routes } from "./routes";

function RenderComponent(MyComponent: RoutesTypeElement) {
  const Component = MyComponent.component;
  if (MyComponent.structure === "layout") {
    return (
      <UserLayout>
        <Component />
      </UserLayout>
    );
  }
  return <Component />;
}

const RoutesMiddleware = () => {
  const render_route = (element: RoutesTypeElement) => {
    return <Route key={element.path} path={element.path} element={RenderComponent(element)} />;
  };
  let token = localStorage.getItem("access_token");
  const auth = useAppSelector((state) => state.auth);

  if (token || auth.isAuthenticated) {
    return (
      <Routes>
        {private_routes.length &&
          private_routes.map((element) => {
             return render_route(element);
          })}
        <Route path="/signin" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {public_routes?.length &&
        public_routes.map((element) => {
          console.log(element)
          return render_route(element);
        })}
      <Route
        path="*"
        element={
          <Navigate
            to={
              localStorage.getItem("access_token")
                ? `${window.location.pathname}${window.location.search || ""}`
                : "/signin"
            }
            replace
          />
        }
      />
    </Routes>
  );
};
export default RoutesMiddleware;
