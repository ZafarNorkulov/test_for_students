import { Table, TableColumnsType } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface DataType {
  key: number;
  number: number;
  lesson_name: string;
  result: string;
  questions: string;
  time: string;
  actions: JSX.Element;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "№",
    dataIndex: "number",
    width: 50,
  },
  {
    title: "Fan nomi",
    dataIndex: "lesson_name",
  },
  {
    title: "Natija",
    dataIndex: "result",
    render: (text) => <p className="text-neutral-400">{text}</p>,
    width: 100,
  },
  {
    title: "Savollar soni",
    dataIndex: "questions",
    width: 150,
  },
  {
    title: "Berilgan vaqt",
    dataIndex: "time",
    width: 150,
  },

  {
    title: "Amallar",
    dataIndex: "actions",
    width: 120,
  },
];
interface dynamicType {
  id: number;
  lesson_name: string;
  result: string;
  questions: number;
  time: 30;
}
const dynamicData: dynamicType[] = [
  {
    id: 1,
    lesson_name: "Matematika",
    result: "0/0",
    questions: 25,
    time: 30,
  },
];
const data: DataType[] = dynamicData.map((item, index) => ({
  key: item.id,
  number: index + 1,
  lesson_name: item.lesson_name,
  result: item.result,
  questions: `${item.questions} ta`,
  time: `${item.time} daqiqa`,
  actions: (
    <Link to={`/exams/test/${item?.lesson_name.toLowerCase()}`}>
      <button className="bg-blue-500 text-white">Boshlash</button>
    </Link>
  ),
}));

const Exams = () => {
  return (
    <div className="container mx-auto p-6 bg-[#f1f1f1] h-[80vh] rounded-md">
      <Table columns={columns} dataSource={data} bordered pagination={false} />
    </div>
  );
};

export default Exams;
