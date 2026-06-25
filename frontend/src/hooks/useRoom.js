import { useState } from 'react';
import { socket } from '../services/socket';


const useRoom = () => {
  const [joined,      setJoined]      = useState(false);
  const [roomId,      setRoomId]      = useState('');
  const [userName,    setUserName]    = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const joinRoom = () => {
    if (!roomId.trim() || !userName.trim()) return;
    socket.emit("join_room", { roomId: roomId.trim(), userName: userName.trim() });
    setJoined(true);
  };

  // emit BEFORE resetting state so roomId/userName are still in closure
  const leaveRoom = (resetEditorState) => {
    socket.emit("leave_room");
    resetEditorState(); // clears code, output, users, typing from App
    setJoined(false);
    setRoomId('');
    setUserName('');
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopySuccess('Room ID copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return {
    joined,
    roomId,      setRoomId,
    userName,    setUserName,
    copySuccess,
    joinRoom,
    leaveRoom,
    copyRoomId,
  };
};

export default useRoom;