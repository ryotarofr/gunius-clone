"use client"

function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <h2>
      {format(props.displayMonth, 'MMM yyy')}
      <div className='flex flex-row gap-6 my-4'>
        <div
          className='cursor-pointer hover:border hover:border-violet-700 px-4 py-2 rounded-full'
          // disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
        >
          Previous
        </div>
        <div
          className='cursor-pointer hover:border hover:border-violet-700 px-4 py-2 rounded-full'
          // disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
        >
          Next
        </div>
      </div>
    </h2>
  );
}


const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 1px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: gray;
    color: #b71adb;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;

// 祝日の配列（仮）
const holidays = [
  new Date(2023, 7, 10), // 元日
  new Date(2023, 7, 11), // 成人の日
  new Date(2023, 7, 12), // 建国記念の日
  // ...以下省略
];



import { format, getDate } from 'date-fns';
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker';

import style from "./Calendar.module.css"

import { useEffect, useState } from 'react';

import 'react-day-picker/dist/style.css';
import { EvaluationType } from '@prisma/client';
import { useDateStore } from '@/hooks/SelectDateStore';
import axios from 'axios';




interface Item {
  id: number;
  naisei: string;
  created_at: string
  evaluation_type: EvaluationType
  // 他のプロパティがあればここに追加
}


export default function Calendar() {
  // const today = new Date();
  // const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  // const selectedDay = useDateStore();
  const selectedDay = useDateStore((state) => state.selectedDay);
  const setSelectedDay = useDateStore((state) => state.setSelectedDay);
  // const footer = selectedDay ? (
  //   <p className='text-lg'>select : {format(selectedDay, 'yyyy-MM-dd')}.</p>
  // ) : (
  //   <p>Please pick a day.</p>
  // );

  // console.log("selectday", selectedDay);

  // const [naisei, setNaisei] = useState("");
  // const [dataAll, setDataAll] = useState<Item[]>([]);
  // const [createdAt, setCreatedAt] = useState([]);
  // const [evaluationType, setEvaluationType] = useState([]);

  // const [naiseiByIdData, setnNiseiByIdData] = useState<string>('')

  // const footerDate = footer.props.children[1]
  // console.log("footer:", footer.props.children[1]);
  // const footerDate = footer.props.children[1]

  // useEffect(() => {

  //   const apiUrl = `/api/naisei/${footerDate}`;
  //   axios.get(apiUrl)
  //     .then(response => {
  //       const resNaisei = response.data.getNaiseiCreatedAt.map((item: any) => item.naisei)
  //       setNaisei(resNaisei);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, [footerDate]);
  // const inputDate = createdAt.map((item: any) => item.created_at)

  // const inputevEluationType = evaluationType.map((item: any) => item.evaluation_type)


  // const dateArray = inputDate.map((dateTimeString: any) => new Date(dateTimeString));

  // const evaluationTypeA = []
  // const evaluationTypeZ: any = [new Date(2023, 7, 10)]
  // const evaluationTypeB = []
  // const evaluationTypeC = []
  // const evaluationTypeD = []
  // const evaluationTypeE = []

  // for (let i = 0; i < inputevEluationType.length; i++) {
  //   const type = inputevEluationType[i];
  //   const date = dateArray[i];

  //   if (type === "A") {
  //     evaluationTypeA.push(date);
  //   } else if (type === "B") {
  //     evaluationTypeB.push(date);
  //   } else if (type === "C") {
  //     evaluationTypeC.push(date);
  //   } else if (type === "D") {
  //     evaluationTypeD.push(date);
  //   } else if (type === "E") {
  //     evaluationTypeE.push(date);
  //   }
  // }


  // console.log("evaluationTypeA", evaluationTypeB);
  // console.log("evaluationTypeAAAA", inputevEluationType);
  // console.log("evaluationTypeZ", evaluationTypeZ);

  // const createdNaiseievaluationType = data.map((item: any) => item.evaluation_type)
  // console.log("aaaaaa", createdNaiseievaluationType.length);
  // console.log("aaaa", new Date(2023, 7, 10));
  // console.log("evaluationTypeA", evaluationTypeA);


  // const bgColorClass = inputevEluationType.length === 1

  // const modifiers = {
  //   // today: (day: any) => day.getDate() === new Date().getDate(),
  //   // weekend: (day: any) => day.getDay() === 0 || day.getDay() === 6,
  //   // holiday: (day: any) => holidays.some(h => h.getTime() === day.getTime()),
  //   evaluationA: evaluationTypeA,
  //   evaluationB: evaluationTypeB,
  //   evaluationC: evaluationTypeC,
  //   evaluationD: evaluationTypeD,
  //   evaluationE: evaluationTypeE,
  // };

  // console.log("modifiers", modifiers.evaluationA);


  // modifiersStylesにグループ名とスタイルを設定
  // const modifiersStyles = {
  //   // today: {
  //   //   color: '#FFFFFF',
  //   //   backgroundColor: 'red',
  //   // },
  //   // weekend: {
  //   //   color: '#FFFFFF',
  //   //   backgroundColor: '#0000FF',
  //   // },
  //   // holiday: {
  //   //   color: '#FFFFFF',
  //   //   backgroundColor: 'red',
  //   // },
  //   evaluationA: {
  //     color: '#FFFFFF',
  //     backgroundColor: '#216E39',
  //   },
  //   evaluationB: {
  //     color: '#FFFFFF',
  //     backgroundColor: '#30A14E',
  //   },
  //   evaluationC: {
  //     color: '#FFFFFF',
  //     backgroundColor: '#40C463',
  //   },
  //   evaluationD: {
  //     color: '#FFFFFF',
  //     backgroundColor: '#9BE9A8',
  //   },
  //   evaluationE: {
  //     color: '#FFFFFF',
  //     backgroundColor: '#FFFFFF',
  //   },
  // };


  return (
    <div className=''>
      {/* {createdNaiseievaluationType.length === 1 && <><style>{css}</style></>} */}
      <style>{css}</style>
      {/* <div className={`${bgColorClass}`}> */}
      <DayPicker
        // className={`${style.container} 
        // ${bgColorClass ? style.activeDay : ''}
        // `}
        className={style.container}
        modifiersClassNames={{
          selected: 'my-selected',
          today: 'my-today',
        }}


        // components={{
        //   Caption: CustomCaption
        // }}
        mode="single"
        required
        selected={selectedDay}
        onSelect={setSelectedDay}
        // footer={footer}
        // modifiers={modifiers}
        // modifiersStyles={modifiersStyles}
        numberOfMonths={2}
      />
      {/* <div>こんにちは</div> */}
      <div>
        {/* {data.map(item => item.created_at.split("T")[0])} */}
      </div>
      {/* </div> */}
    </div>
  );
}
