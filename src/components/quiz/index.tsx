import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import "./quiz.scss";

const QuizBySlug = () => {
  const params = useParams();
  console.log(params.slug);

  const [data] = useState<any[]>([
    {
      id: 1,
      questions: [
        {
          id: 25,
          is_active: true,
          title: "HTMLning kengaytmasi qanaqa bo'ladi?",
          answers: [
            {
              id: 23,
              question_id: 25,
              title: "HyperText Markup Language",
            },
            {
              id: 24,
              question_id: 25,
              title: "HyperText Markuped Language",
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="question-content">
      {data[0]?.questions?.map((item: any) => (
        <div key={item?.id}>
          <h4 className="question__title font-semibold text-2xl mb-5">
            {item?.title}
          </h4>
          <div className="answers_list flex flex-col gap-y-1">
            {item?.answers?.map((anw: any) => (
              <label
                key={anw?.id}
                htmlFor="answer"
                className="flex items-center cursor-pointer text-md bg-[#e4e4e4] gap-x-3 py-[18px] px-[15px] rounded-lg"
              >
                <input type="radio" id="answer" className="w-4 h-4 delay-300" />
                {anw.title}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizBySlug;
