"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export const GetAssessmentByUser = () => {
  const [asessment, setAssessment] = useState()
  // useEffect(() => {
  //   axios.get("/api/assessment")
  //     .then(response => {
  //       const resData = response.data.getAllAssesmentByUser.map((item: any) => item.achievement)
  //       setAssessment(resData)
  //       console.log("aaaaaa", response.data.getAllAssesmentByUser);

  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  return (
    <div className="text-white">asessment:{asessment}</div>
  )
}