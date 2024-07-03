import { ReactElement, useEffect } from "react";
import Logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Popover, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../store";
import useGetData from "../hooks/useGetData";
import { IUser } from "../types/data.models";
import SignIn from "../store/auth/service";
import { AUTH_ACTIONS } from "../store/auth";

const UserLayout = ({ children }: { children: ReactElement }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth)
  const navigate = useNavigate();


  const { data: user } = useGetData<IUser>({
    queryKey: ["user"],
    url: "api/v1/user/profile",
    options: { refetchOnWindowFocus: false }
  })
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(SignIn({}));
    }
  }, []);

  const content = (
    <ul className="profile-block">
      <li className="flex item-center gap-x-4 ">
        <Avatar size={40} icon={`${user?.full_name.slice(0, 1).toUpperCase()}`} />
        <div className="flex flex-col items-center">
          <p className="m-0 text-xl ">{user?.full_name}</p>
          <p className="text-sm text-[rgb(108,117,125)] font-medium">
            {user?.group}
          </p>
        </div>
      </li>
      <hr />
      <Link to={"/profile"}>
        <li>Mening profilim</li>
      </Link>

      <li
        onClick={() => {
          dispatch(AUTH_ACTIONS.logout());
          navigate("/signin");
        }}
      >
        Chiqish
      </li>
    </ul>
  );
  if (!auth.isAuthenticated) {
    return <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center"><Spin size="large" /></div>
  }
  return (
    <div>
      <header
        className={`flex items-center justify-between shadow-xl overflow-hidden px-4 py-2 ${typeof window !== "undefined" &&
          window.location.pathname.includes("/exams/test")
          ? ""
          : "mb-5"
          }`}
      >
        <Link
          className="logo flex items-center max-w-[30%] text-[#111] text-[1.1rem] uppercase gap-x-[5px]"
          to={"/"}
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-[22%] rounded-full"
            loading="lazy"
          />
          Buxoro Xalqaro Tibbiyot Texnikumi
        </Link>
        <Popover
          placement="bottomRight"
          content={content}
          arrow={false}
          trigger={"click"}
          className="cursor-pointer  flex items-center w-max gap-x-3"
        >
          <Avatar size={44} icon={`${user?.full_name.slice(0, 1).toUpperCase()}`} />
        </Popover>
      </header>
      {children}
      <footer className="mt-3"></footer>
    </div>
  );
};
export default UserLayout;
