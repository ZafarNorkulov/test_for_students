import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import { IAnswers, IQuiz } from "../../types/data.models";

const QuizById = ({ quizData }: { quizData: IQuiz[] }) => {
  return (
    <div className="question__content">
      {quizData?.map((item, index) => (
        <>
          <h4 className="question__title">
            {index + 1}. {item?.title}
          </h4>
          <div className="answers__list">
            {item?.answers?.map((anw) => (
              <label key={index}>
                <input type="radio" />
                {anw?.answer}
              </label>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default QuizById;
