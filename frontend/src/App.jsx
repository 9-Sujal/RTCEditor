import { useState, useRef } from 'react';
import './App.css';

import useRoom   from './hooks/useRoom';
import useSocket from './hooks/useSocket';

import JoinRoom     from './components/JoinRoom';
import Sidebar      from './components/Sidebar';
import CodeEditor   from './components/CodeEditor';
import OutputPanel  from './components/OutputPanel';

function App() {
  // ── EDITOR STATE ─────────────────────────────────────────────────────────
  const [language,    setLanguage]    = useState('javascript');
  const [code,        setCode]        = useState('');
  const [output,      setOutput]      = useState('');
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [running, setRunning] = useState(false); 
  const [isError, setIsError] = useState(false);
 
  const isRemoteChangeRef = useRef(false);
  const isRemoteLangRef  = useRef(false);

  // ── HOOKS ─────────────────────────────────────────────────────────────────
  const {
    joined,
    roomId,      setRoomId,
    userName,    setUserName,
    copySuccess,
    joinRoom,
    leaveRoom,
    copyRoomId,
  } = useRoom();

  const { handleCodeChange, handleLanguageChange, runCode } = useSocket({
    roomId,
    userName,
    setUsersInRoom,
    setTypingUsers,
    setCode,
    setLanguage,
    setOutput,
    isRemoteChangeRef,
    isRemoteLangRef,
    setRunning,
   
    setIsError
  });

  // passed into leaveRoom so the hook can reset editor state
  const resetEditorState = () => {
    setCode('');
    setOutput('');
    setIsError(false);
    setUsersInRoom([]);
    setTypingUsers([]);
  };

  // ── DERIVED ───────────────────────────────────────────────────────────────
  const typingText = typingUsers.length === 0 ? ''
    : typingUsers.length === 1 ? `${typingUsers[0]} is typing...`
    : `${typingUsers.join(', ')} are typing...`;

  // ── RENDER ────────────────────────────────────────────────────────────────
  if (!joined) {
    return (
      <JoinRoom
        roomId={roomId}
        setRoomId={setRoomId}
        userName={userName}
        setUserName={setUserName}
        joinRoom={joinRoom}
      />
    );
  }

  return (
    <div className="editor-container">
      <Sidebar
        roomId={roomId}
        copyRoomId={copyRoomId}
        copySuccess={copySuccess}
        usersInRoom={usersInRoom}
        userName={userName}
        typingText={typingText}
        language={language}
        handleLanguageChange={handleLanguageChange}
        leaveRoom={() => leaveRoom(resetEditorState)}
      />
      <div className="editor">
        <CodeEditor
          code={code}
          language={language}
          handleCodeChange={handleCodeChange}
        />
        <OutputPanel
          output={output}
          running={running}
          isError={isError}
          runCode={() => runCode(code, language)}
        />
      </div>
    </div>
  );
}

export default App;


