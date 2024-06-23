import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IQuiz } from "../../types/data.models";
import instance from "../../configs/axios.config";
import Timer from "../helperComponents/timer";

const QuizById = ({
  quizData,
  scienceId,
}: {
  quizData: IQuiz[];
  scienceId: string | undefined;
}) => {
  const [myAnswers, setMyAnswers] = useState<TmyAnswer[]>([]);
  const [remaindTime, setRemaindTime] = useState<number>(1);
  const navigate = useNavigate();
  // !!! TYPES
  type TmyAnswer = { question_id: number; answer_id: number };

  const handleSetMyAnswers = ({
    question_id,
    answer_id,
  }: {
    question_id: number;
    answer_id: number;
  }) => {
    const existingAnswerIndex = myAnswers.findIndex(
      (ans) => ans.question_id === question_id
    );
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...myAnswers];
      updatedAnswers[existingAnswerIndex] = { question_id, answer_id };
      setMyAnswers(updatedAnswers);
    } else {
      setMyAnswers([...myAnswers, { question_id, answer_id }]);
    }
  };

  // Effect to load saved answers from localStorage on component mount
  useEffect(() => {
    const storedAnswers = localStorage.getItem("quizAnswers");
    if (storedAnswers) {
      setMyAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  // Effect to save answers to localStorage whenever myAnswers changes
  useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(myAnswers));
  }, [myAnswers]);

  // Effect to clear localStorage when component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem("quizAnswers");
    };
  }, []);
  const SendAnswers = async () => {
    const response: { message: string } = await instance({
      url: `api/v1/quiz/answer-check/${scienceId}/`,
      method: "POST",
      data: myAnswers,
    });
    if (response.message === "success") {
      navigate("/exams/result");
    }
  };
  if (!quizData) {
    return "Loading";
  }
  if (remaindTime == 0) {
    if (typeof window != "undefined") {
      navigate("/exams/result");
    }
  }

  return (
    <div>
      <div className="pagination">
        {
          quizData?.map((_,index)=>(

            <strong key={index}>{index+1}</strong>
          ))
        }
      </div>
      <div className="w-full">
        <p className="ml-auto w-max">
          <Timer time={1800} setRemaindTime={setRemaindTime} />
        </p>
      </div>
      <div className="question_wrap">
        {quizData?.map((item, index) => (
          <div className="question__content">
            <h4 className="question__title">
              {index + 1}. {item?.title}
            </h4>
            <div className="answers__list">
              {item?.answers?.map((anw, anwIndex) => (
                <label
                  key={anwIndex}
                  htmlFor={`answer${item?.id}-${anwIndex}`}
                  className="answer__item"
                >
                  <input
                    type="radio"
                    name={`answer${item?.id}`}
                    id={`answer${item?.id}-${anwIndex}`}
                    checked={myAnswers?.some(
                      (answer) =>
                        answer.question_id === item.id &&
                        answer.answer_id === anw.id
                    )}
                    onClick={() =>
                      handleSetMyAnswers({
                        question_id: item?.id,
                        answer_id: anw?.id,
                      })
                    }
                  />
                  {anw?.answer}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button onClick={SendAnswers} className="bg-blue-500 text-white ">
          Testni yakunlash
        </button>
      </div>
    </div>
  );
};

export default QuizById;
