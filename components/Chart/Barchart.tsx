import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const testdata = [
  { nega: 'label', negaaverage: 40 },
  { posi: 'label', posiaverage: 24 },
  { nuet: 'label', nuetaverage: 20 },
]

const data = [
  { nega: '1', a: 50, b: 20, c: 10 },
  { posi: '2', a: 50, b: 40, c: 10 },
  { nuet: '3', a: 50, b: 20, c: 10 },
];

const data2 = data.map(item => {
  const key = Object.keys(item)[0] as keyof typeof item; // キーの型を明示的に指定
  const sum = item.a + item.b + item.c;
  return { [key]: item[key], sum };
});

console.log(data2);

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

export default function StackedBarChart() {
  return (
    <div className='max-w-4xl mx-auto mt-10'>
      <div className='text-center'>
        <span className='text-white text-xl italic font-bold'>Mean of emotional distribution</span>
      </div>
      <div className='w-full flex justify-center text-white'>
        <ResponsiveContainer width={"80%"} height={200}>
          <BarChart layout="vertical" data={testdata}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" />
            <YAxis hide dataKey="nega" type="category" />
            <YAxis hide dataKey="posi" type="category" />
            <YAxis hide dataKey="nuet" type="category" />

            <Tooltip />
            <Legend />
            <Bar dataKey="negaaverage" stackId="negaaverage" fill="#8884d8" radius={[0, 40, 40, 0]} />
            <Bar dataKey="posiaverage" stackId="negaaverage" fill="#ffc658" radius={[0, 40, 40, 0]} />
            <Bar dataKey="nuetaverage" stackId="negaaverage" fill="#82ca9d" radius={[0, 40, 40, 0]} />
            {/* <Bar dataKey="c" stackId="a" fill="black" radius={[0, 10, 10, 0]} /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
