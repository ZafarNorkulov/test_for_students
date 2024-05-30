import { Card } from "antd";
import TestImg from "../assets/test-img.png";
import { Link } from "react-router-dom";
const Home = () => {
  const { Meta } = Card;
  const cards = [
    {
      title: "Imtihon",
      img: TestImg,
      url: "exam",
    },
  ];
  return (
    <div>
      <div className="container-fluid home mx-5">
        <div className="grid grid-cols-12">
          {cards?.map((item) => (
            <Link to={item?.url} className="col-span-2">
              <Card
                hoverable
                className=" py-5"
                cover={<img alt="example" src={item?.img} />}
              >
                <Meta title={item?.title} />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
