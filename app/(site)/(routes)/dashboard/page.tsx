"use client"

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import StarsCanvas from "@/components/Canvas/Stars";
import { Editor } from "@/components/Editor/Editor"
import { HeaderNav } from "@/components/Navigation/HeaderNav";
import { Button } from "@/components/ui/button";
import { MdPlaylistAdd } from "react-icons/md"
import useGetAllNaisei from "@/hooks/useGetNaiseiAll";
import useRefreshStore from "@/hooks/useRefreshStore";
import { CreateNaisei } from "@/components/PostContent/CreateNaisei";


const EditorPage = () => {
  // const { fetch }: any = useGetAllNaisei()
  const { refresh } = useRefreshStore();

  // const onCreate = async (e: React.FormEvent) => {
  //   // e.preventDefault();
  //   const apiUrl = "/api/naisei";
  //   const createData = {
  //     // リクエストボディに送信するデータ
  //     naisei: defaultValue,
  //     evaluation_type: "A",
  //   };
  //   await axios.post(apiUrl, createData)
  //     .then(response => {
  //       toast.success('Created Naisei!!')
  //       fetch()
  //       console.log("/editorでデータをフェッチ");
  //       return response
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }

  // useEffect(() => {
  //   fetch()
  //   console.log("/editorでデータをフェッチ");
  // }, [fetch])

  // const defaultValue = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"example.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'

  return (
    <div className="min-h-[100vh] pb-20">
      <StarsCanvas />
      <div>
        <HeaderNav />
        <div className="">
          {/* <div className="text-center my-4">
            <Button variant="outline" onClick={onCreate} className="text-white bg-white/40">
              <MdPlaylistAdd size={30} />
              <div className="text-xl ml-2 font-mono">add naisei</div>
            </Button>
          </div> */}
        </div>
        {!refresh ?
          <Editor />
          :
          <div></div>
        }
      </div>
    </div >
  )
}


export default EditorPage