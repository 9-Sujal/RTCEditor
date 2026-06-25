import { startTyping, stopTyping } from "../services/typing-service.js";


export default function typingHandler(
   io,
   socket
) {

   socket.on(
      "typing_start",
      ({ roomId, userName }) => {

         const users =
            startTyping(
               roomId,
               userName
            );

         socket.to(roomId).emit(
            "typing_update",
            users
         );
      }
   );

   socket.on(
      "typing_stop",
      ({ roomId, userName }) => {

         const users =
            stopTyping(
               roomId,
               userName
            );

         socket.to(roomId).emit(
            "typing_update",
            users
         );
      }
   );
}