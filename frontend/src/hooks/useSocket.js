import { useEffect, useRef } from "react";
import { socket } from "../services/socket";
import { toast } from "sonner";



const useSocket = ({
  roomId,
  userName,
  setUsersInRoom,
  setTypingUsers,
  setCode,
  setLanguage,
  setOutput,
  isRemoteChangeRef,
  isRemoteLangRef,
  setRunning, 

  setIsError,
}) => {
  const typingTimeoutRef     = useRef(null); // debounce stop-typing emit
  const typingDisplayTimeout = useRef(null); // auto-clear typing indicator
  const debounceRef          = useRef(null); // debounce code_change emit

  // ── LISTENERS ────────────────────────────────────────────────────────────
  useEffect(() => {

   socket.on("notification", ({ type, message }) => {

    if(type === "success"){
      toast.success(message);
    }

    if(type === "error"){
      toast.error(message);
    }

    if(type === "info"){
      toast.info(message);
    }

  });
    socket.on("user_joined", (users) => {
       console.log("Received users:", users);
      setUsersInRoom(users);
    });

    socket.on("sync_code", ({ code, language }) => {
      isRemoteChangeRef.current = true;
      isRemoteLangRef.current   = true;
      setCode(code || '');
      setLanguage(language || 'javascript');
    });

    socket.on("code_update", (newCode) => {
      isRemoteChangeRef.current = true;
      setCode(newCode);
    });

    socket.on("language_update", (lang) => {
      isRemoteLangRef.current = true;
      setLanguage(lang);
    });

    socket.on("typing_update", (users) => {
      setTypingUsers(users);
      clearTimeout(typingDisplayTimeout.current);
      typingDisplayTimeout.current = setTimeout(() => {
        setTypingUsers([]);
      }, 2000);
    });

   socket.on(
   "compile_result",
   ({output, isError})=>{
       setOutput(output);
       setIsError(isError ?? false)


      setRunning(false); 
   }
);
    return () => {

      socket.off("user_joined");
      socket.off("sync_code");
      socket.off("code_update");
      socket.off("language_update");
      socket.off("typing_update");
      socket.off("compile_result");
      socket.off("notification");

    };
  }, []);

  // ── TAB / WINDOW CLOSE ───────────────────────────────────────────────────
  useEffect(() => {
    const handleBeforeUnload = () => socket.emit("leave_room");
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // ── EMITTERS ─────────────────────────────────────────────────────────────
  const handleCodeChange = (newCode) => {
    if (newCode === undefined) return;


    // block echo from remote updates
    if (isRemoteChangeRef.current) {
      isRemoteChangeRef.current = false;
      return;
    }

    setCode(newCode);

    // typing indicator
    socket.emit("typing_start", { roomId, userName });
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing_stop", { roomId, userName });
    }, 1500);

    // debounced code broadcast — 250ms sweet spot
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      socket.emit("code_change", { roomId, code: newCode });
    }, 250);
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    socket.emit("language_change", { roomId, language: lang });
  };

  const runCode = ( code, language) => {

    setRunning(true); 
    setOutput(''); 

    setIsError(false);
    socket.emit("compile_code", {
     roomId, code, language
    });
  };

  return { handleCodeChange, handleLanguageChange, runCode };
};

export default useSocket;