import { getRoomState } from "../services/code-service.js";
import { joinRoom, leaveRoom } from "../services/room-service.js";


export default function roomHandler(
   io,
   socket
) {

   let currentRoom = null;
   let currentUser = null;

   socket.on(
      "join_room",
      ({ roomId, userName }) => {
           if (currentRoom) handleLeave();

         currentRoom = roomId;
         currentUser = userName;

         socket.join(roomId);

         const room =
            joinRoom(
               roomId,
               userName
            );

         io.to(roomId).emit(
            "user_joined",
            [...room.users]
         );

         const roomState =
            getRoomState(roomId);

         socket.emit(
            "sync_code",
            roomState
         );

            socket.emit("notification", {
      type: "success",
      message: `${userName} joined the room`
   });
      }
   );

   const handleLeave = () => {

     

      if (!currentRoom) return;

        const roomId   = currentRoom;  // snapshot before clearing
  const userName = currentUser;

  currentRoom = null;  // clear FIRST
  currentUser = null;

  socket.leave(roomId); 

      const room =
         leaveRoom(
            currentRoom,
            currentUser
         );
 
      if (room) {
         io.to(currentRoom).emit(
            "user_joined",
            [...room.users]
         );
      }

         io.to(currentRoom).emit("notification", {
      type: "info",
      message: `${currentUser} left the room`
   });

   };

   socket.on(
      "leave_room",
      handleLeave
   );

   socket.on(
      "disconnect",
      handleLeave
   );
}