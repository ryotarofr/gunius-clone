import useGetAllNaisei from "@/hooks/useGetNaiseiAll";
import { useNaiseiIdStore } from "@/hooks/useNaiseiIdStore";
import useRefreshStore from "@/hooks/useRefreshStore";
import { useEffect, useState } from "react";
import { CreateNaisei } from "../PostContent/CreateNaisei";

export const Note = () => {
  const [naisei, setNaisei] = useState([])
  const { toggleRefresh } = useRefreshStore()
  const { data }: any = useGetAllNaisei()

  // useEffect内はGetしたnaiseiのデータを即時反映させるために必要(もっといい方法ありそう)
  useEffect(() => {
    const resNaisei = data.map((item: any) => item.naisei)
    const newArray = resNaisei.map((item: any) => {
      const parsedItem = JSON.parse(item); // JSON文字列をJavaScriptオブジェクトに変換
      return parsedItem.root.children[0].children[0].text; // textの値を抽出
    });

    async function processData() {
      const replacedData: any = [];
      for (let i = 0; i < data.length; i++) {
        const item = { ...data[i] };
        try {
          const naiseiObj = JSON.parse(item.naisei);
          if (naiseiObj.root && naiseiObj.root.children && naiseiObj.root.children[0] && naiseiObj.root.children[0].children) {
            const textValue = naiseiObj.root.children[0].children[0].text;
            if (textValue === newArray[i]) {
              item.naisei = newArray[i];
            }
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        replacedData.push(item);
      }
      setNaisei(replacedData)
    }
    processData();
  }, [data, setNaisei])

  const handleItemClick = (naiseiId: number) => {
    useNaiseiIdStore.getState().setSelectedId(naiseiId);
    toggleRefresh();
    let timeoutId = setTimeout(() => {
      // Editorのstateをrefreshしないと値が更新されないから追加してる
      toggleRefresh();
    }, 100)
    return () => {
      clearTimeout(timeoutId)
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-2xl">
        <div className="text-center pt-4">
          <span className="mt-8 px-2 text-indigo-200 text-2xl font-bold italic border-b">Note</span>
        </div>
        <CreateNaisei />
        {naisei.map((item: any) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="hover:bg-slate-100/20 my-2 rounded-md cursor-pointer px-2"
          >
            <div className="text-white text-3xl">{item.naisei}</div>
            <div className="text-slate-400 text-end">{item.created_at}</div>
          </div>
        )
        )}
      </div>
    </div>
  )
}