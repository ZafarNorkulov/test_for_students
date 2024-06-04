import { useEffect } from "react";
import RoutesMiddleware from "./routes/routes_middleware";
import { useAppDispatch } from "./store";
import SignIn from "./store/auth/service";

const App = () => {
  const { pathname } = window.location;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname !== "/signin") {
      dispatch(SignIn({ data: null, type: "" }));
    }
  }, []);

  return (
    <div>
      <RoutesMiddleware />
    </div>
  );
};

export default App;
