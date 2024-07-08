import { Skeleton, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import { IAllowSciences } from "../../types/data.models";

const SciencesList = () => {
  interface DataType {
    key: number;
    number: number;
    name: string;
    questions: string;
    time: string;
    actions: JSX.Element;
  }

  const { data: scienses, isLoading } = useGetData<IAllowSciences[]>({
    queryKey: ["sciences"],
    url: `api/v1/quiz/exam/ `,
  });
  // const [scienceIds, setScienceIds] = useState<{ science_id: number, index: number }[]>([])
  // useEffect(() => {
  //   // Use useEffect to perform the state update once, after scienses is initialized
  //   if (scienses) {
  //     setScienceIds(
  //       scienses.map((item, idx) => ({ science_id: item.id, index: idx }))
  //     );
  //   }
  // }, [scienses])
  // console.log(scienceIds);
  // const scienceId = 1
  // const { data: result } = useGetData<IQuestionResult>({
  //   queryKey: ["questions"],
  //   url: `api/v1/quiz/answer/${scienceId}`,

  // });

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
    // {
    //   title: "Natija",
    //   dataIndex: "result",
    //   render: (text) => <p className="text-neutral-400">{text}</p>,
    //   width: 100,
    // },
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

  const data: DataType[] = (scienses ?? []).map(
    (item: IAllowSciences, index) => ({
      key: item.id,
      number: index + 1,
      name: item?.science?.name,
      // result: result && result?.question_result ? `${result?.question_result}/30` : "-/-",
      questions: `30 ta`,
      time: `25 daqiqa`,
      actions: (
        <Link to={`/exams/test/${item?.science?.id}`}>
          <button
            className="bg-blue-500 text-white disabled:bg-opacity-80 disabled:cursor-not-allowed"
            disabled={!item?.is_exam}
          >
            Boshlash
          </button>
        </Link>
      ),
    })
  );
  return (
    isLoading ? (
      <div className="bg-white p-5" >
        <Skeleton active title={false} paragraph={{ rows: 4 }} />
      </div>

    ) :
      (<Table columns={columns} dataSource={data} bordered pagination={false} />)
  );
};

export default SciencesList;
