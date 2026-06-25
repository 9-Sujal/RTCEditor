 
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import initializeSocket from "./config/socket.js";
import dotenv from "dotenv"


dotenv.config();

const server =
    http.createServer(app);

const io =
    new Server(server,{
      cors:{
         origin:["https://rtc-editor.vercel.app"],
          methods: ["GET", "POST"]
      }
    });

initializeSocket(io);

server.listen(
   process.env.PORT || 5000,
   ()=>{
      console.log("Server is running on port 5000");
   }
);