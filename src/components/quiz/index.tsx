import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
// import "./quiz.scss";

const QuizBySlug = () => {
  const params = useParams();
  console.log(params.slug);

  // const [data] = useState<any[]>([
  //   {
  //     id: 1,
  //     questions: [
  //       {
  //         id: 25,
  //         is_active: true,
  //         title: "HTMLning kengaytmasi qanaqa bo'ladi?",
  //         answers: [
  //           {
  //             id: 23,
  //             question_id: 25,
  //             title: "HyperText Markup Language",
  //           },
  //           {
  //             id: 24,
  //             question_id: 25,
  //             title: "HyperText Markuped Language",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);

  const { data } = useGetData({
    queryKey: ["questions"],
    url: `api/v1/quiz/questions/`,
  });
  console.log(data);

  return <div className="question-content"></div>;
};

export default QuizBySlug;
