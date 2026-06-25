import { Editor } from "@monaco-editor/react";


export default function CodeEditor({code, language, handleCodeChange}) {
  return (
    <Editor
      height="60%"
      language={language}
      value={code}
      onChange={handleCodeChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        automaticLayout: true
      }}
    />
  );
}
