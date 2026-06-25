import codeHandler from "../handlers/codeHandler.js";
import compilerHandler from "../handlers/compilerHandler.js";
import roomHandler from "../handlers/roomHandler.js";
import typingHandler from "../handlers/typingHandler.js";

export default function initializeSocket(
   io
) {

   io.on(
      "connection",
      (socket) => {

         console.log(
            "Connected:",
            socket.id
         );

         roomHandler(
            io,
            socket
         );

         codeHandler(
            io,
            socket
         );

         typingHandler(
            io,
            socket
         );
         compilerHandler(
            io, socket
         )

      
      }
   );
}