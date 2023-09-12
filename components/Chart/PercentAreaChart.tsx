import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    month: '01/01',
    negative: 4000,
    positive: 2400,
    Neutral: 2400,
  },
  {
    month: '01/02',
    negative: 3000,
    positive: 1398,
    Neutral: 2210,
  },
  {
    month: '01/03',
    negative: 2000,
    positive: 9800,
    Neutral: 2290,
  },
  {
    month: '01/04',
    negative: 2780,
    positive: 3908,
    Neutral: 2000,
  },
  {
    month: '01/05',
    negative: 1890,
    positive: 4800,
    Neutral: 2181,
  },
  {
    month: '01/06',
    negative: 2390,
    positive: 3800,
    Neutral: 2500,
  },
  {
    month: '01/07',
    negative: 3490,
    positive: 4300,
    Neutral: 2100,
  },
];

const toPercent = (decimal: number, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const renderTooltipContent = (o: any) => {
  const { payload, label } = o;
  const total = payload.reduce((result: number, entry: any) => result + entry.value, 0);

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};


export const PercentAreaChart = () => {

  return (
    <div className='max-w-4xl mx-auto mt-10'>
      <div className='text-center'>
        <span className='text-white text-2xl border-b italic font-bold'>Your emotions</span>
      </div>
      <div className='w-full flex justify-center text-white'>
        <ResponsiveContainer width={"90%"} height={400}>
          <AreaChart
            // width={500}
            // height={400}
            data={data}
            stackOffset="expand"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" type="category" />
            <YAxis tickFormatter={toPercent} />
            <Tooltip content={renderTooltipContent} />
            <Area type="monotone" dataKey="negative" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="positive" stackId="1" stroke="#ffc658" fill="#ffc658" />
            <Area type="monotone" dataKey="Neutral" stackId="1" stroke="#82ca9d" fill="#82ca9d" />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div >
  );
}

