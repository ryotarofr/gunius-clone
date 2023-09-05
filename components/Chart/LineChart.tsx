"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
  AreaChart,
  ReferenceLine,
  Area
} from "recharts";
import { Button } from "../ui/button";
import useStore from "@/hooks/useAssessment";

const CustomizedLabel = ({ x, y, stroke, value }: any) => (
  <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
    {value}
  </text>
);


const testData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const LinesChart = () => {

  const { data, fetch }: any = useStore()

  useEffect(() => {
    fetch();
  }, [fetch])

  const formattedData = data.map((item: any) => {
    const date = new Date(item.createdAt);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()} am${date.getHours()}:${date.getMinutes()}`;
    return { createdAt: formattedDate, achievement: item.achievement, impression: item.impression };
  });

  const getAxisYDomain = (from: any, to: any, ref: any, offset: any) => {
    const refData: any = data.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];

    refData.forEach((d: any) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
  };

  const [state, setState] = useState({
    data: formattedData,
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax+1",
    bottom: "dataMin",
    top2: "dataMax+20",
    bottom2: "dataMin-20",
  });

  const zoom = () => {
    let { refAreaLeft, refAreaRight } = state;
    const { data } = state;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setState((prevState) => ({
        ...prevState,
        refAreaLeft: "",
        refAreaRight: ""
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "cost", 1);
    const [bottom2, top2] = getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      "impression",
      50
    );

    setState((prevState) => ({
      ...prevState,
      refAreaLeft: "",
      refAreaRight: "",
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      bottom2,
      top2
    }));
  };

  const zoomOut = () => {
    const { data } = state;
    setState((prevState) => ({
      ...prevState,
      data: data.slice(),
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top: "dataMax+1",
      bottom: "dataMin-1",
      top2: "dataMax+50",
      bottom2: "dataMin-50"
    }));
  };
  return (
    <div className="flex justify-center mt-10 mx-2" style={{ userSelect: "none" }}>
      <div className="w-full">
        <div className="flex justify-center">
          <Button
            className="text-white"
            onClick={zoomOut}
          >
            Zoom Out
          </Button>
        </div>
        <ResponsiveContainer width={"100%"} height={400} >
          <LineChart
            // width={800}
            // height={400}
            data={state.data}
            onMouseDown={(e: any) => setState({ ...state, refAreaLeft: e.activeLabel })}
            onMouseMove={(e: any) =>
              state.refAreaLeft &&
              setState({ ...state, refAreaRight: e.activeLabel })
            }
            onMouseUp={zoom}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              allowDataOverflow
              dataKey="createdAt"
              domain={[state.left, state.right]}
              type="category"
            />
            <YAxis
              allowDataOverflow
              domain={[state.bottom, state.top]}
              type="number"
              yAxisId="1"
            />
            <YAxis
              orientation="right"
              allowDataOverflow
              domain={[state.bottom2, state.top2]}
              type="number"
              yAxisId="2"
            />
            <Tooltip />
            <Line
              yAxisId="1"
              type="natural"
              dataKey="achievement"
              stroke="#8884d8"
              animationDuration={300}
              label={<CustomizedLabel />}
            />
            <Line
              yAxisId="2"
              type="natural"
              dataKey="pv"
              stroke="#82ca9d"
              animationDuration={300}
            />

            {state.refAreaLeft && state.refAreaRight ? (
              <ReferenceArea
                yAxisId="1"
                x1={state.refAreaLeft}
                x2={state.refAreaRight}
                strokeOpacity={0.3}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LinesChart;
