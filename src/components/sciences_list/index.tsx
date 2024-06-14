import { Table, TableColumnsType } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import useGetData from "../../hooks/useGetData";

const SciencesList = () => {
  interface DataType {
    key: number;
    number: number;
    name: string;
    result: string;
    questions: string;
    time: string;
    actions: JSX.Element;
  }


  const { data: scienses } = useGetData<SciencesType[]>({
    queryKey: ["sciences"],
    url: `api/v1/quiz/sciences/`,
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "№",
      dataIndex: "number",
      width: 50,
    },
    {
      title: "Fan nomi",
      dataIndex: "name",
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
  interface SciencesType {
    id: number;
    science_id: string;
    is_active: boolean;
    name: string;
    group: number[];
  }


  const data: DataType[] = (scienses ?? []).map(
    (item: SciencesType, index) => ({
      key: item.id,
      number: index + 1,
      name: item.name,
      result: "0/0",
      questions: `30 ta`,
      time: `25 daqiqa`,
      actions: (
        <Link to={`/exams/test/${item?.name.toLowerCase()}`}>
          <button className="bg-blue-500 text-white disabled:bg-opacity-80 disabled:cursor-not-allowed" disabled={!item?.is_active}>Boshlash</button>
        </Link>
      ),
    })
  );
  return (
    <Table columns={columns} dataSource={data} bordered pagination={false} />
  );
};

export default SciencesList;
