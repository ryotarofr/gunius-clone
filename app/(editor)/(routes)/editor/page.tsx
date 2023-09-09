"use client"

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { format } from "date-fns";

import StarsCanvas from "@/components/Canvas/Stars";
import { Editor } from "@/components/Editor/Editor"
import { HeaderNav } from "@/components/Navigation/HeaderNav";
import { Button } from "@/components/ui/button";
import { useDateStore } from "@/hooks/SelectDateStore";
import { useNaiseiIdStore } from "@/hooks/useNaiseiIdStore";
import { BiEdit } from "react-icons/bi"
import { MdPlaylistAdd } from "react-icons/md"
import Loading from "./loading";
import useGetAllNaisei from "@/hooks/useGetNaiseiAll";


const EditorPage = () => {
  const [naiseiId, setNaiseiId] = useState<any>()
  const [naiseiCreatedAt, setNaiseiCreatedAt] = useState<any[]>([""])
  const [refresh, setRefresh] = useState(false)
  const [allNaisei, setAllNaisei] = useState<any>([])
  const { data, loading, hasErrors, fetch }: any = useGetAllNaisei()


  const handleItemClick = (naiseiId: any) => {
    useNaiseiIdStore.getState().setSelectedId(naiseiId);
    setRefresh(prev => !prev)
    let timeoutId = setTimeout(() => {
      // Editorのstateをrefreshしないと値が更新されないから追加してる
      setRefresh(prev => !prev)
    }, 100)
    return () => {
      clearTimeout(timeoutId)
    }
  };


  const selectedDay = useDateStore((state) => state.selectedDay);
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
    await axios.post(apiUrl, createData)
      .then(response => {
        toast.success('Created Naisei!!')
        fetch()
        console.log("/editorでデータをフェッチ");
        return response
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  useEffect(() => {
    fetch()
    console.log("/editorでデータをフェッチ");

  }, [])

  useEffect(() => {
    const resNaisei = data.map((item: any) => item.naisei)
    const resNaiseiId = data.map((item: any) => item.id)
    const resNaiseiCreatedAt = data.map((item: any) => item.created_at)
    const newArray = resNaisei.map((item: any) => {
      const parsedItem = JSON.parse(item); // JSON文字列をJavaScriptオブジェクトに変換
      return parsedItem.root.children[0].children[0].text; // textの値を抽出
    });
    setAllNaisei(newArray)
    setNaiseiCreatedAt(resNaiseiCreatedAt)
    setNaiseiId(resNaiseiId)
  }, [data])

  const defaultValue = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"example.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'

  return (
    <div className="min-h-[100vh] pb-20">
      <StarsCanvas />
      <div>
        <HeaderNav />
        <div className="">
          <div className="text-white text-center text-lg">
            <span className="border-b italic">Activity</span>
          </div>
          {naiseiId ?
            <div className="flex justify-center">

              <button className="mr-6">
                {naiseiId.map((item: any, index: number) => (
                  <div className="my-4" key={index} onClick={() => handleItemClick(item)}>
                    <BiEdit size={24} color="white" />
                  </div>
                ))}
              </button>

              <div className="w-44">

                {allNaisei.map((item: string, index: number) => (
                  <div className="text-white my-4 truncate" key={index}>{item}</div>
                ))}
              </div>
              <div className="hidden md:block">
                {naiseiCreatedAt.map((item: string, index: number) => (
                  <div className="text-slate-400 ml-4 my-4 text-md" key={index}>{item}</div>
                ))}
              </div>
            </div> :
            <div className="text-2xl"><Loading /></div>
          }
          <div className="text-center my-4">
            <Button variant="outline" onClick={onCreate} className="text-white bg-white/40">
              <MdPlaylistAdd size={30} />
              <div className="text-xl ml-2 font-mono">add naisei</div>
            </Button>
          </div>
        </div>
        {!refresh ?
          <Editor />
          :
          <div>test</div>
        }
      </div>
    </div>
  )
}


export default EditorPage