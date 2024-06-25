import useGetData from "../../../hooks/useGetData";
import { IQuestionResult } from "../../../types/data.models";

const QuizResult = () => {
  const scienceId = localStorage.getItem("scienceId");

  const { data: result } = useGetData<IQuestionResult>({
    queryKey: ["questions"],
    url: `api/v1/quiz/answer/${1}`,

  });
  console.log(result)
  return (
    <div>QuizResult</div>
  )
}

export default QuizResult