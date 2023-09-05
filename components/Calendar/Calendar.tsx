"use client"

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
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker';
import style from "./Calendar.module.css"
import 'react-day-picker/dist/style.css';
import { useDateStore } from '@/hooks/SelectDateStore';


export default function Calendar() {

  const selectedDay = useDateStore((state) => state.selectedDay);
  const setSelectedDay = useDateStore((state) => state.setSelectedDay);


  return (
    <>
      <div className='md:hidden'>
        <style>{css}</style>
        <DayPicker
          className={style.container}
          modifiersClassNames={{
            selected: 'my-selected',
            today: 'my-today',
          }}
          mode="single"
          required
          selected={selectedDay}
          onSelect={setSelectedDay}
          numberOfMonths={1}
        />
      </div>
      <div className='hidden md:block'>
        <style>{css}</style>
        <DayPicker
          className={style.container}
          modifiersClassNames={{
            selected: 'my-selected',
            today: 'my-today',
          }}
          mode="single"
          required
          selected={selectedDay}
          onSelect={setSelectedDay}
          numberOfMonths={2}
        />
      </div>
    </>
  );
}
