import { rooms } from "../store/roomStore.js";

export const startTyping = (
   roomId,
   userName
) => {
   if (!rooms.has(roomId)) return [];

   const room = rooms.get(roomId);

   room.typingUsers.add(userName);

   return [...room.typingUsers];
};

export const stopTyping = (
   roomId,
   userName
) => {
   if (!rooms.has(roomId)) return [];

   const room = rooms.get(roomId);

   room.typingUsers.delete(userName);

   return [...room.typingUsers];
};