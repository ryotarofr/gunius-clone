"use client"

import { $getRoot, $getSelection } from 'lexical';
import { SyntheticEvent, useEffect, useState, FC } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

import styles from "./Editor.module.scss";

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import ExportPluginJson from '../plugins/ExportPluginJson';
import { ToolbarPlugin } from '../plugins/ToolbarPlugin';
import { AutoFocusPlugin } from '../plugins/AutoFocusPlugin';
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { CodeHighlightPlugin } from "../plugins/CodeHighlightPlugin";
import { nodes } from "./nodes";
import { theme } from './editorTheme';
import { InlineToolbarPlugin } from '../plugins/InlineToolbarPlugin';
import { useNaiseiIdStore } from '@/hooks/useNaiseiIdStore';
import { Button } from '../ui/button';
import useGetAllNaisei from '@/hooks/useGetNaiseiAll';


const EvaluationType = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
}

function onError(error: any) {
  console.error(error);
}

export const Editor: FC<{
  defaultContentAsHTML?: string;
}> = ({ }) => {

  // naisei idを取得
  const selectedId = useNaiseiIdStore((state) => state.selectedId)

  const [evaluationType, setEvaluationType] = useState(EvaluationType.A);
  const [naisei, setNaisei] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { data, loading, hasErrors, fetch }: any = useGetAllNaisei()

  useEffect(() => {
    setNaisei("")
    setIsLoading(false)

    if (selectedId !== null) {
      // data配列から選択されたIDに一致する要素を探す
      const selectedData = data.find((item: any) => item.id === selectedId);
      if (selectedData) {
        setNaisei(selectedData.naisei);
        setIsLoading(true)
      } else {
        setNaisei(""); // データが見つからない場合は空に設定
      }
    } else {
      setNaisei(""); // selectedNaiseiIdがnullの場合も空に設定
    }
  }, [selectedId])
  console.log("naisei", naisei);

  const exportAsJson = (contenAsJson: string) => {
    // const jsonString = JSON.stringify(contenAsJson);
    setNaisei(contenAsJson)
    // console.log("jsontostring", data);
    return contenAsJson
  };

  const importAsJson = (contenAsJson: string) => {
    // const jsonString = JSON.stringify(contenAsJson);
    setNaisei(contenAsJson)
    // console.log("jsontostring", data);
    return contenAsJson
  };


  function onChange(editorState: any) {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      const tomato = root.__cachedText
      // console.log("onchange editorstate", root, selection, tomato);
      // setNaisei(tomato);
    });
  }

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setNaisei("")
    const apiUrl = `/api/naisei/${selectedId}`;
    const updatedData = {
      // リクエストボディに送信するデータ
      naisei: naisei,
      evaluation_type: evaluationType,
    };
    axios.put(apiUrl, updatedData)
      .then(response => {
        toast.success('Updated Naisei!!!!')
        fetch()
        return response
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  console.log("naisei", naisei);


  const initialConfig = {
    namespace: 'MyEditor',
    theme: theme,
    nodes: nodes,
    onError,
    editorState: naisei
  };

  if (!naisei) return <></>
  if (!isLoading) return <div className='text-white'>loading</div>
  return (
    <div className={styles.wrapper}>
      <LexicalComposer initialConfig={initialConfig}>
        {/* <ImportPluginHTML defaultContentAsHTML={defaultContentAsHTML} /> */}
        <ToolbarPlugin />
        <InlineToolbarPlugin />
        <div className={styles.editorContainer}>
          {/* <PlainTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<div>write your naisei</div>}
            ErrorBoundary={LexicalErrorBoundary}
          /> */}
          <RichTextPlugin
            contentEditable={<ContentEditable className={styles.contentEditable} />}
            placeholder={<>write your naisei</>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <OnChangePlugin onChange={onChange} />
        {/* {data ? */}
        <form
        // onSubmit={handleUpdate}
        >
          <label className=''>
            <div className='text-white'>Evaluation Type:</div>

            <select className='' value={evaluationType} onChange={(e) => setEvaluationType(e.target.value)}>
              {Object.values(EvaluationType).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          {/* <div className='text-white'>
            {EvaluationType.A}
            {EvaluationType.B}
            {EvaluationType.C}
            {EvaluationType.D}
            {EvaluationType.E}
          </div> */}
          <Button className='' onClick={handleUpdate}>Update Naisei</Button>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />
        </form>
        {/* : <>とりあえず何も入れない</> */}
        {/* // <form onSubmit={handleUpdate}> */}
        {/* //   <label> */}
        {/* //     Evaluation Type: */}
        {/* //     <select value={evaluationType} onChange={(e) => setEvaluationType(e.target.value)}> */}
        {/* //       {Object.values(EvaluationType).map((value) => ( */}
        {/* //         <option key={value} value={value}>{value}</option> */}
        {/* //       ))} */}
        {/* //     </select> */}
        {/* //   </label> */}
        {/* //   <button type="submit">Updated Naisei</button> */}
        {/* // </form> */}
        {/* } */}
        <AutoFocusPlugin />
        <HistoryPlugin />
        <CheckListPlugin />
        <CodeHighlightPlugin />

        {/* <HistoryPlugin /> */}
        {/* <TreeViewPlugin /> */}
        {/* <AutoFocusPlugin /> */}
        {/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
        {/* <ExportPlugin exportAsHTML={exportAsHTML} /> */}
        <ExportPluginJson exportAsJSON={exportAsJson} />
        {/* <ImportPlugin /> */}


      </LexicalComposer>
    </div>
  );
}

