import { Table, TableColumnsType } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import SciencesList from "../../components/sciences_list";



const Exams = () => {
  return (
    <div className="container mx-auto p-6 bg-[#f1f1f1] h-[80vh] rounded-md">
      <SciencesList/>
    </div>
  );
};

export default Exams;
