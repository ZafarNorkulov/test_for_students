import { ReactElement } from "react";
import Logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/auth";
import { Modal } from "antd";
import { useAppDispatch } from "../store";
const UserLayout = ({ children }: { children: ReactElement }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure logout?",
      // icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(logout());
        navigate("/signin");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div>
      <header className="w-screen flex items-center justify-between">
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
        <button className="bg-blue-500 text-white" onClick={showDeleteConfirm}>
          Logout
        </button>
      </header>
      {children}
    </div>
  );
};
export default UserLayout;
