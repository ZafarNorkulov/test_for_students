import { useState } from "react";
import { IQuiz } from "../../types/data.models";

const QuizById = ({ quizData }: { quizData: IQuiz[] }) => {
  const [answers,setAnswers] = useState([])
  
  return (
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
                  
                />
                {anw?.answer}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizById;
