import { Spin } from "antd"

const Loader = () => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center"><Spin size="large" /></div>
  )
}

export default Loader