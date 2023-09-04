"use client"

import { $getRoot, $getSelection, EditorState, createEditor } from 'lexical';
import { SyntheticEvent, useEffect, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

// import { SyntheticEvent, useState } from 'react';
// import axios from 'axios';

import { format } from 'date-fns';
import ExportPlugin from '../plugins/ExportPluginHTML';
import ExportPluginJson from '../plugins/ExportPluginJson';
import { ToolbarPlugin } from '../plugins/ToolbarPlugin';
import { AutoFocusPlugin } from '../plugins/AutoFocusPlugin';

import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import styles from "./Editor.module.scss";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { CodeHighlightPlugin } from "../plugins/CodeHighlightPlugin";
import { nodes } from "./nodes";
import { theme } from './editorTheme';
import { InlineToolbarPlugin } from '../plugins/InlineToolbarPlugin';
import TreeViewPlugin from '../plugins/TreeViewPlugin';
import { ImportPlugin } from '../plugins/ImportPlugin';
import { $generateNodesFromDOM } from '@lexical/html';
import { ImportPluginHTML } from '../plugins/ImportPluginHTML';
import { FC } from 'react';
import { Toaster, toast } from 'react-hot-toast';
// import Button from '../Button/Button';

// import { useUser } from '@/app/hooks/useUser';
import { useDateStore } from '@/hooks/SelectDateStore';
import axios from 'axios';
import { useNaiseiIdStore } from '@/hooks/useNaiseiIdStore';
import { Button } from '../ui/button';
import { auth } from '@clerk/nextjs';
import { Divide } from 'lucide-react';


export const loadData = (): string => {
  // JSON.stringify(editorState)
  const text = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"example.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
  const text2 = '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"this is editorState example.a","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
  return text2;
};


const EvaluationType = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
}

interface Item {
  id: number;
  naisei: string;
  created_at?: string
  // 他のプロパティがあればここに追加
}

// const theme = {
//   // Theme styling goes here
//   // ...
// }

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  // useEffect(() => {
  //   editor.focus();
  //   console.log("editorrr", editor);

  // }, [editor]);

  return null;
}

function onError(error: any) {
  console.error(error);
}

// const defaltText = 'default text daaaa'

export const Editor: FC<{
  defaultContentAsHTML?: string;
}> = ({ }) => {

  // naisei idを取得
  const selectedId = useNaiseiIdStore((state) => state.selectedId)


  // const exportAsHTML = (contenAsHTML: string) => {
  // setData(contenAsHTML)
  // console.log("exporthtml", contenAsHTML);
  // };



  const [data, setData] = useState()

  const [evaluationType, setEvaluationType] = useState(EvaluationType.A);
  const [naisei, setNaisei] = useState('')
  const [naiseiId, setNaiseiId] = useState('')
  const [currentDate, setCurrentDate] = useState('');


  // const { user, isLoading, subscription } = useUser()

  const selectedDay = useDateStore((state) => state.selectedDay);
  // const setSelectedDay = useDateStore((state) => state.setSelectedDay);
  const footer = selectedDay ? (
    <div className='text-lg'>select : {format(selectedDay, 'yyyy-MM-dd')}.</div>
  ) : (
    <div>Please pick a day.</div>
  );
  const footerDate = footer.props.children[1]


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


  useEffect(() => {
    setNaisei('');
    setEvaluationType("")
    // setData(undefined)
    setNaiseiId('')
    // setCurrentDate('')
    const apiUrl = `/api/naisei/${selectedId}`;
    axios.get(apiUrl)
      .then(response => {
        const resNaisei = response.data.getNaiseiById.map((item: any) => item.naisei)
        const resNaiseiId = response.data.getNaiseiById.map((item: any) => item.id)
        const joinedString = resNaisei.join(", ");
        setNaisei(joinedString);

        const resEvaluationType = response.data.getNaiseiById.map((item: any) => item.evaluation_type)
        setEvaluationType(resEvaluationType)

        setNaiseiId(resNaiseiId)

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, [selectedId]);




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
    const apiUrl = `/api/naisei/${naiseiId}`;
    const updatedData = {
      // リクエストボディに送信するデータ
      naisei: naisei,
      evaluation_type: evaluationType,
    };
    axios.put(apiUrl, updatedData)
      .then(response => {
        toast.success('Naiseiをアップデートしました!!')
        return response
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    toast.success('Naiseiをアップデートしました!!')


  };


  const initialConfig = {
    namespace: 'MyEditor',
    theme: theme,
    nodes: nodes,
    onError,
    editorState: naisei
  };

  if (!naisei) return <></>

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
          <label className='text-white'>
            Evaluation Type:
            <select className='text-white' value={evaluationType} onChange={(e) => setEvaluationType(e.target.value)}>
              {Object.values(EvaluationType).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <div className='text-white'>
            {EvaluationType.A}
            {EvaluationType.B}
            {EvaluationType.C}
            {EvaluationType.D}
            {EvaluationType.E}
          </div>
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
        {/* <MyCustomAutoFocusPlugin /> */}
        {/* <ExportPlugin exportAsHTML={exportAsHTML} /> */}
        <ExportPluginJson exportAsJSON={exportAsJson} />
        {/* <ImportPlugin /> */}


      </LexicalComposer>
    </div>
  );
}

