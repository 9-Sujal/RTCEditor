import { rooms } from "../store/roomStore.js";

export const updateCode = (roomId, code) => {
   if (!rooms.has(roomId)) return;

   rooms.get(roomId).code = code;
};

export const updateLanguage = (
   roomId,
   language
) => {
   if (!rooms.has(roomId)) return;

   rooms.get(roomId).language = language;
};

export const getRoomState = (roomId) => {
   if (!rooms.has(roomId)) return null;

   const room = rooms.get(roomId);

   return {
      code: room.code,
      language: room.language
   };
};