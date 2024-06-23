import { useNavigate, useParams } from "react-router-dom";
import QuizById from "../../../components/quiz";
import useGetData from "../../../hooks/useGetData";
import { IQuiz } from "../../../types/data.models";
import Timer from "../../../components/helperComponents/timer";
import { useState } from "react";
const TestByName = () => {
  const [remaindTime, setRemaindTime] = useState<number>(1);

  const params = useParams();
  const navigate = useNavigate();
  const { data: quizData } = useGetData<IQuiz[]>({
    queryKey: ["questions"],
    url: `api/v1/quiz/test/${params.slug}`,
  });
  if (remaindTime == 0) {
    if (typeof window != "undefined") {
      navigate("/exams/result");
    }
  }
  return (
    <div className="container mx-auto w-full">
      <div className="pagination">Pagination</div>
      <div className="w-full">
        <p className="ml-auto w-max">
          <Timer time={1800} setRemaindTime={setRemaindTime} />
        </p>
      </div>
      {quizData && <QuizById quizData={quizData} scienceId={params.slug} />}
    </div>
  );
};

export default TestByName;
