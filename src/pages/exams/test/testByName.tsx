import React, { useState } from "react";
import QuizBySlug from "../../../components/quiz";
import { useParams } from "react-router-dom";

const TestByName = () => {


  return (
    <div className="container mx-auto">
      <div className="pagination">Pagination</div>
     <QuizBySlug/>
    </div>
  );
};

export default TestByName;
