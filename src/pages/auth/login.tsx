import { Form, Input, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import SignIn from "../../store/auth/service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const auth = useAppSelector(state => state.auth)
  type FieldType = {
    username: string;
    password: string;
  };

  const onFinish = async (values: FieldType) => {
    try {
      await dispatch(SignIn({ data: values }));
    } catch (err) {
      console.log(err);
      message.error("Login failed. Please check your credentials.");

    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!(token && auth.isAuthenticated)) {
      navigate("/signin")
    }
  }, [auth.isAuthenticated])

  const [form] = Form.useForm<FieldType>();
  return (
    <div className="relative isolate overflow-hidden bg-white py-24 px-6 sm:py-32 lg:px-8 h-[100vh]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
      <div className="max-w-2xl lg:max-w-4xl mx-auto flex flex-col gap-y-3 bg-slate-100 py-10 px-5 rounded-xl">
        <figure className="flex justify-center">
          <div className="w-[400px] flex flex-col gap-y-8">
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
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              style={{ maxWidth: 600 }}
              autoComplete="off"
              size="large"
            >
              <Form.Item
                label="J.SH.Sh.I.R:"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Iltimos J.SH.SH.I.R ni kiriting",
                  },
                ]}
              >
                <Input className="px-[11px] py-[6px] w-full" />
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
                <Input.Password className="px-[11px] py-[6px] w-full" />
              </Form.Item>
              <button className="bg-blue-500 px-8 float-end text-white">
                Kirish
              </button>
            </Form>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default Login;
