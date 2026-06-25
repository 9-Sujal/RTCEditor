

export default function Sidebar(
   { roomId,copyRoomId,copySuccess,usersInRoom,userName,typingText,language,handleLanguageChange,leaveRoom}
) {
  return (
     <div className="sidebar">
        <div className="room-info">
          <h2>Room ID: {roomId}</h2>
          <button onClick={copyRoomId}>Copy Room ID</button>
          {copySuccess && <span className="copy-success">{copySuccess}</span>}
        </div>
       <div style={{ margin: 10 }}>
          <h3 style={{ margin: 0 , fontStyle: "normal", color: 'var(--text-primary)' }}>Users in Room</h3>
          <ul style={{ listStyle: 'none', marginTop: 10 }}>
            {usersInRoom.map((user, i) => (
              <li key={i}>
                {user}
                {user === userName && (
                  <span style={{ color: 'var(--text-secondary)', fontSize: 11, marginLeft: 6 }}>
                    (you)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <p className="typing-indicator" style={{fontSize: 14}} >{typingText}</p>
    
     <select className='codeLanguage' value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          
          <option value="cpp">C++</option>
         
         
     </select>

     <button className='leave' onClick={leaveRoom}>
       Leave Room
     </button>

     </div>
  )
}
