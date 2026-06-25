import { updateCode, updateLanguage } from "../services/code-service.js";


export default function codeHandler(
   io,
   socket
) {

   socket.on(
      "code_change",
      ({ roomId, code }) => {

         updateCode(
            roomId,
            code
         );

         socket.to(roomId).emit(
            "code_update",
            code
         );
      }
   );

   socket.on(
      "language_change",
      ({ roomId, language }) => {

         updateLanguage(
            roomId,
            language
         );

         socket.to(roomId).emit(
            "language_update",
            language
         );
      }
   );
}