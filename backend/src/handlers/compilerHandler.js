import { JUDGE0_STATUS, LANGUAGE_MAP } from "../constants/languages.js";
import { executeCode } from "../services/compileService.js";



// build a clear output string
//  compiler error + runtime error +  stdout + no output

const buildOutput = (result)=>{
    const lines = []; 

    const statusId =  result.statusId; 

    if(statusId === 3){
        // accepted
          lines.push(`✓ Finished in ${result.time ?? "?"}s | Memory: ${result.memory ?? "?"}KB`);
          lines.push(""); 
    } else{
          lines.push(`✗ ${result.statusDesc ?? JUDGE0_STATUS[statusId] ?? "Unknown Error"}`);
    lines.push("");
    }

    // compule errir
     if(statusId === 6 && result.compile_output){
        lines.push("Compilation Error:");
        lines.push(result.compile_output.trim()); 
        return lines.join("\n"); 
     }

    //  runtime error statusid 7-12
     if(statusId >=7 && statusId <=12){
    if (result.stderr) {
      lines.push("Runtime Error:");
      lines.push(result.stderr.trim());
    }
    if (result.stdout) {
      lines.push("");
      lines.push("Partial Output (before crash):");
      lines.push(result.stdout.trim());
    }
    return lines.join("\n");
  }

//   tle

  if (statusId === 5) {
    lines.push("Your code exceeded the time limit (5s).");
    lines.push("Check for infinite loops or O(n²) algorithms on large inputs.");
    return lines.join("\n");
  }

//    normal

    if (result.stdout) {
    lines.push(result.stdout.trim());
  } else if (result.stderr) {
    // stderr without a runtime error status (e.g. Python warnings)
    lines.push(result.stderr.trim());
  } else {
    lines.push("(no output)");
  }
 
  return lines.join("\n");
};








export default function compilerHandler(io, socket) {
  socket.on("compile_code", async ({ roomId, code, language }) => {
 
    // ── VALIDATION ──────────────────────────────────────────────────────
    if (!code || !code.trim()) {
      return io.to(roomId).emit("compile_result", {
        output: "✗ No code to run.",
        isError: true,
      });
    }
 
    const languageId = LANGUAGE_MAP[language];
 
    if (!languageId) {
      return io.to(roomId).emit("compile_result", {
        output: `✗ Unsupported language: "${language}"`,
        isError: true,
      });
    }
 
    try {
      const result = await executeCode(languageId, code);
      const output = buildOutput(result);
 
      io.to(roomId).emit("compile_result", {
        output,
        isError: result.statusId !== 3, // 3 = Accepted
        time:    result.time,
        memory:  result.memory,
      });
 
    } catch (error) {
      // network error, Judge0 down, timeout, etc.
      const message = error.response?.data?.message
        ?? error.message
        ?? "Unknown error";
 
      io.to(roomId).emit("compile_result", {
        output: `✗ Compilation service error:\n${message}`,
        isError: true,
      });
    }
  });
}