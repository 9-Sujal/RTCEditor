

export default function JoinRoom( { roomId,
  setRoomId,
  userName,
  setUserName,
  joinRoom}) {

    
 return (
    <div className="join-container">
      <div className="join-form">
        <h1>Join a Room</h1>

        <input
          type="text"
          placeholder="enter room id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <input
          type="text"
          placeholder="enter user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <button onClick={joinRoom}>
          Join
        </button>
      </div>
    </div>
  );
}
