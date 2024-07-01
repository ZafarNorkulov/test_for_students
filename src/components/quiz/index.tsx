import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IQuiz } from "../../types/data.models";
import instance from "../../configs/axios.config";
import Timer from "../helperComponents/timer";
import { Empty, Popover } from "antd";

const QuizById = ({
  quizData,
  scienceId,
}: {
  quizData: IQuiz[];
  scienceId: string | undefined;
}) => {
  const [myAnswers, setMyAnswers] = useState<TmyAnswer[]>([]);
  const [remaindTime, setRemaindTime] = useState<number>(1);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [paginationIndex, setPaginationIndex] = useState<number[]>([]);
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
    const response: { data: { message: string } } = await instance({
      url: `api/v1/quiz/answer-check/${scienceId}/`,
      method: "POST",
      data: myAnswers,
    });
    if (response.data.message === "success") {
      navigate("/exams/result/");
      setOpenConfirm(false);
    }
  };
  if (!quizData) {
    return "Loading";
  }
  if (remaindTime == 0) {
    if (typeof window != "undefined") {
      instance({
        url: `api/v1/quiz/answer-check/${scienceId}/`,
        method: "POST",
        data: myAnswers,
      });
      navigate("/exams/result");
    }
  }
  const content = (
    <div className="px-2 py-1 flex flex-col gap-y-6 font-bold confirm-content">
      <h4 className="text-2xl">Testni yakunlaysizmi?</h4>
      <div className="text-end confirm-btns">
        <button
          className="border border-slate-300 px-[7px] m-1 rounded-[4px] leading-3 w-20"
          onClick={() => setOpenConfirm(false)}
        >
          Yo'q
        </button>
        <button
          className="border border-slate-300 px-[7px] m-1 rounded-[4px] leading-3 w-20 bg-blue-600 text-white"
          onClick={SendAnswers}
        >
          Ha
        </button>
      </div>
    </div>
  );
  useEffect(() => {
    if (!quizData || !myAnswers) {
      // Handle the case when quizData or myAnswers is not defined
      return; // Early return
    }

    const indices: number[] = [];
    quizData.forEach((question, index) => {
      const answer = myAnswers.find(
        (answer) => answer.question_id === question.id
      );
      if (answer) {
        indices.push(index);
      }
    });
    setPaginationIndex(indices);
  }, [quizData, myAnswers]);
  return quizData[0] ? (
    <div className="relative">
      <div className="sticky-head active ">
        <div className="w-full grid grid-cols-12 items-end">
          <div className="md:col-span-3 md:flex hidden"></div>
          <div className="pagination md:col-span-7 col-span-12">
            {quizData?.map((_, index) => {
              const isAnswered = paginationIndex.includes(index);
              return (
                <strong
                  key={index}
                  id={`${index}`}
                  className={`pagination__item ${isAnswered ? "active" : ""
                    }`}
                >
                  {index + 1}
                </strong>
              );
            })}
          </div>

          <div className="flex flex-col justify-center items-end md:col-span-2 col-span-12">
            <Timer time={1500} setRemaindTime={setRemaindTime} />
            <Popover
              placement="bottomRight"
              content={content}
              arrow={true}
              trigger={"click"}
              open={openConfirm}
              onOpenChange={() => setOpenConfirm(!openConfirm)}
              className="cursor-pointer flex items-center w-max gap-x-3"
            >
              <button className="bg-blue-500 end-btn ">Testni yakunlash</button>
            </Popover>
          </div>
        </div>
      </div>

      <div className="question_wrap mx-auto container">
        {quizData?.map((item, index) => (
          <div className="question__content" >
            <a href={`#${index}`}></a>
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

      </div>
    </div>
  ) : <div className="h-[70vh] flex items-center justify-center">
    <Empty className="mt-8" />
  </div>

};

export default QuizById;
