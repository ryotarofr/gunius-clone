"use client"


import { GetAssessmentByUser } from "@/components/Assessment/GetAssessmentByUser";
import Calendar from "@/components/Calendar/Calendar";
import StarsCanvas from "@/components/Canvas/Stars";
import LinesChart from "@/components/Chart/LineChart";
import { Editor } from "@/components/Editor/Editor"
import { HeaderNav } from "@/components/Navigation/HeaderNav";
import { Button } from "@/components/ui/button";
import { useDateStore } from "@/hooks/SelectDateStore";
import { useNaiseiIdStore } from "@/hooks/useNaiseiIdStore";
import axios from "axios";
import { format } from "date-fns";
import { Divide } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiEdit } from "react-icons/bi"
import { GrAdd } from "react-icons/gr"
import { MdPlaylistAdd } from "react-icons/md"

// export const dynamic = "force-dynamic"

const EditorPage = () => {
  const [naisei, setNaisei] = useState<any[]>([""])
  const [naiseiId, setNaiseiId] = useState<any[]>([""])
  const [naiseiCreatedAt, setNaiseiCreatedAt] = useState<any[]>([""])


  const handleItemClick = (naiseiId: any) => {
    useNaiseiIdStore.getState().setSelectedId(naiseiId);
    console.log(useNaiseiIdStore.getState().selectedId);

  };


  const selectedDay = useDateStore((state) => state.selectedDay);
  // const setSelectedDay = useDateStore((state) => state.setSelectedDay);
  const footer = selectedDay ? (
    <div className='text-lg'>select : {format(selectedDay, 'yyyy-MM-dd')}.</div>
  ) : (
    <div>Please pick a day.</div>
  );
  const footerDate = footer.props.children[1]

  const onCreate = async (e: React.FormEvent) => {
    // e.preventDefault();
    const apiUrl = "/api/naisei";
    const createData = {
      // リクエストボディに送信するデータ
      naisei: defaultValue,
      evaluation_type: "A",
    };
    axios.post(apiUrl, createData)
      .then(response => {
        toast.success('Created Naisei!!')
        return response
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    const apiUrl2 = `/api/naisei/naisei-create-date/${footerDate}`

    // Axiosを使用してAPIデータをフェッチ
    axios.get(apiUrl2)
      .then(response => {
        const resId = response.data.getNaiseiCreatedAt.map((item: any) => item.id)
        // const resNaisei = response.data.getNaiseiCreatedAt.map((item: any) => item.naisei)
        // const resCreatedAt = response.data.getNaiseiCreatedAt.map((item: any) => item.created_at)
        // setNaisei(resNaisei);
        setNaiseiId(resId)
        // setNaiseiCreatedAt(resCreatedAt)
        console.log("get create of footerdate");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    // toast.success('Naiseiをアップデートしました!!')
  }

  useEffect(() => {
    // APIのエンドポイント
    const apiUrl = `/api/naisei/naisei-create-date/${footerDate}`

    // Axiosを使用してAPIデータをフェッチ
    axios.get(apiUrl)
      .then(response => {
        const resId = response.data.getNaiseiCreatedAt.map((item: any) => item.id)
        const resNaisei = response.data.getNaiseiCreatedAt.map((item: any) => item.naisei)
        const resCreatedAt = response.data.getNaiseiCreatedAt.map((item: any) => item.created_at)

        setNaiseiId(resId)
        setNaiseiCreatedAt(resCreatedAt)
        const newArray = resNaisei.map((item: any) => {
          const parsedItem = JSON.parse(item); // JSON文字列をJavaScriptオブジェクトに変換
          return parsedItem.root.children[0].children[0].text; // textの値を抽出
        });
        setNaisei(newArray);

        console.log("resres", newArray);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [footerDate]);

  const defaultValue = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"example.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'


  return (
    <div className="min-h-[100vh] pb-20">
      <StarsCanvas />
      <div>
        <HeaderNav />
        {/* <button onClick={onCreate} className="fixed bottom-8 right-8 border rounded-full p-4 bg-indigo-100 hover:bg-indigo-50">
          <GrAdd className="" size={36} />
        </button> */}
        <div className="">
          <div className="text-white text-center text-lg">
            <span className="border-b italic">Activity</span>
          </div>

          {naiseiId &&
            <div className="flex justify-center">
              <button className="mr-6">
                {naiseiId.map(item => (

                  <div className="my-4" key={item} onClick={() => handleItemClick(item)}>
                    <BiEdit size={24} color="white" />
                  </div>
                ))}
              </button>

              <div className="w-44">
                {naisei.map(item => (
                  <div className="text-slate-300 my-4 truncate" key={item} onClick={() => handleItemClick(item)}>{item}</div>
                ))}
              </div>
              <div className="hidden md:block">
                {naiseiCreatedAt.map(item => (

                  <div className="text-slate-400 ml-4 my-4 text-md" key={item} onClick={() => handleItemClick(item)}>{item}</div>
                ))}
              </div>
            </div>
          }
          <div className="text-center my-4">
            <Button variant="outline" onClick={onCreate} className="text-white bg-white/40">
              {/* <GrAdd className="" size={36} /> */}
              <MdPlaylistAdd size={30} />
              <div className="text-xl ml-2 font-mono">add naisei</div>
            </Button>
          </div>
        </div>
        <Editor />
      </div>
      {/* <GetAssessmentByUser /> */}
    </div>
  )
}


export default EditorPage