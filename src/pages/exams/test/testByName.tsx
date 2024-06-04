import React, { useState } from "react";

const TestByName = () => {
  const [data] = useState<any[]>([
    {
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
    <div className="container mx-auto">
      <div className="pagination">Pagination</div>
      <div className="quiz-wrapper border border-[rgba(255,255,255,.)] rounded-md px-4 py-3">
        {data[0]?.questions?.map((item: any) => (
          <div>
            <h4 className="question">{item?.title}</h4>
            <ul className="answers">
              {item?.answers?.map((anw: any) => (
                <li>{anw.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestByName;
