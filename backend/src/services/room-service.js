import { rooms } from "../store/roomStore.js";

export const createRoom = (roomId) => {
   if (!rooms.has(roomId)) {
      rooms.set(roomId, {
         users: new Set(),
         typingUsers: new Set(),
         code: "",
         language: "javascript",
         output: ""
      });
   }

   return rooms.get(roomId);
};

export const joinRoom = (roomId, userName) => {
   const room = createRoom(roomId);

   room.users.add(userName);

   return room;
};

export const leaveRoom = (roomId, userName) => {
   if (!rooms.has(roomId)) return null;

   const room = rooms.get(roomId);

   room.users.delete(userName);
   room.typingUsers.delete(userName);

   if (room.users.size === 0) {
      rooms.delete(roomId);
      return null;
   }
    console.log("Current users in room:", [...room.users]);
   return room;
};

export const getRoom = (roomId) => {
   return rooms.get(roomId);
};