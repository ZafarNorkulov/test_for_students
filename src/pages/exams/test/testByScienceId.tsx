import { useParams } from "react-router-dom";
import QuizById from "../../../components/quiz";
import useGetData from "../../../hooks/useGetData";
import { IQuiz } from "../../../types/data.models";

const TestByName = () => {
  const params = useParams();
  const { data: quizData } = useGetData<IQuiz[]>({
    queryKey: ["questions"],
    url: `api/v1/quiz/test/${params.slug}`,
  });
  console.log(params);
  return (
    <div className="container mx-auto">
      <div className="pagination">Pagination</div>
      {quizData && <QuizById quizData={quizData} />}
    </div>
  );
};

export default TestByName;
