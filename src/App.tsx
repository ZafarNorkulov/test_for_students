import { useEffect } from "react";
import "./App.scss";
import RoutesMiddleware from "./routes/routes_middleware";
import { useAppDispatch } from "./store";
import SignIn from "./store/auth/service";

function App() {
  const { pathname } = window.location;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname !== "/signin") {
      dispatch(SignIn({ data: null, type: "" }));
    }
  }, []);
  return (
    <>
      <RoutesMiddleware />
    </>
  );
}

export default App;
