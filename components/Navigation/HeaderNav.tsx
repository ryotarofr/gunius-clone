"use client"

import { useState } from "react"
import Calendar from "../Calendar/Calendar"
import LinesChart from "../Chart/LineChart"
import { Button } from "../ui/button"
import { PercentAreaChart } from "../Chart/PercentAreaChart"
import SimpleRadarChart from "../Chart/SimpleRadarChart"
import StackedBarChart from "../Chart/Barchart"


export const HeaderNav = () => {
  const [nav1, setNav1] = useState(true)
  const [nav2, setNav2] = useState(false)

  const hanhleChange1 = () => {
    setNav1(true)
    setNav2(false)
  }

  const hanhleChange2 = () => {
    setNav1(false)
    setNav2(true)
  }
  return (
    <div>
      <div className="text-white text-center">
        <Button className={`mx-2 text-xl font-bold font-sans border border-slate-${nav1 ? '50' : '500'}`} variant="ghost" onClick={hanhleChange1}>Calendar</Button >
        <Button className={`mx-2 text-xl font-bold font-sans border border-slate-${nav2 ? '50' : '500'}`} variant="ghost" onClick={hanhleChange2} >Chart</Button >
      </div>
      {nav1 && <><Calendar /></>}
      {nav2 && <>
        <div className="p-3 mx-auto text-center mt-10 bg-amber-100/30 max-w-xs border border-white">
          <div className="text-white text-2xl font-bold italic">~Status~</div>
          <div className="text-white text-xl">Total of <span className="text-emerald-200 font-bold text-2xl">10</span> days.</div>
        </div>
        {/* <LinesChart /> */}
        <PercentAreaChart />
        <StackedBarChart />
        <SimpleRadarChart />
      </>}


    </div>
  )
}