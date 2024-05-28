import { Form, Input } from "antd";
import React from "react";
import { useAppDispatch } from "../../store";
import SignIn from "../../store/auth/service";

const Login = () => {
  const dispatch = useAppDispatch();

  type FieldType = {
    login: string;
    password: string;
  };

  const onFinish = async (e: FieldType) => {
    try {
      await dispatch(SignIn({ data: e, type: "login" }));
    } catch (error) {
      console.log(error)
    }
  };

  const [form] = Form.useForm<FieldType>();
  return (
    <div className="w-full h-[100vh] p-[10px] flex items-center justify-center ">
      <div className="w-[400px] flex flex-col gap-y-3 ">
        <svg
          stroke="currentColor"
          className="mx-auto"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="70px"
          width="70px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"></path>
        </svg>
        <h3 className="text-2xl font-semibold">Login</h3>
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item
            label="J.SH.Sh.I.R:"
            name="login"
            rules={[
              { required: true, message: "Iltimos J.SH.SH.I.R ni kiriting" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Parol:"
            name="password"
            rules={[
              {
                required: true,
                message: "Iltimos passport seriya va raqamni kiriting",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <button className="bg-blue-500 px-8 float-end text-white">
            Kirish
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
