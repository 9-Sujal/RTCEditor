import axios from "axios";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";
 
// const HEADERS = {
//  "content-type": "application/json",
//  "x-rapidapi-key":,
//   "x-rapidapi-host": process.env.RAPID_API_HOST,
// };

const getHeaders = () => ({
  "content-type": "application/json",
  "x-rapidapi-key": process.env.RAPID_API_KEY,
  "x-rapidapi-host": process.env.RAPID_API_HOST,
});

const encodeBase64 = (str)=>{
  return Buffer.from(str, "utf-8").toString("base64");
}

const decodeBase64 = (str) =>{
  if(!str) return null; 
  return Buffer.from(str, "base64").toString("utf-8");
}

//  submit code and get a token back 

const submitCode = async(languageId, sourceCode, stdin = "")=>{
  const response = await axios.post(
    `${JUDGE0_URL}/submissions?base64_encoded=true`,
     {
      language_id: languageId,
      source_code: encodeBase64(sourceCode),
      stdin:       encodeBase64(stdin),
    },
    { headers: getHeaders(), timeout: 10000 }
  )
  return response.data.token; 
}

// poll until status is no longer "in queue" or "processing"
const pollResult = async (token, maxAttempts = 10, intervalMs = 1000) => {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((res) => setTimeout(res, intervalMs));
 
    const response = await axios.get(
      `${JUDGE0_URL}/submissions/${token}?base64_encoded=true`,
      { headers: getHeaders(), timeout: 10000 }
    );
 
    const data = response.data;
 
    // status 1 = In Queue, 2 = Processing — keep polling
    if (data.status.id <= 2) continue;
 
    // decode all base64 fields before returning
    return {
      statusId:       data.status.id,
      statusDesc:     data.status.description,
      stdout:         decodeBase64(data.stdout),
      stderr:         decodeBase64(data.stderr),
      compile_output: decodeBase64(data.compile_output),
      message:        decodeBase64(data.message),
      time:           data.time,
      memory:         data.memory,
    };
  }

   throw new Error("Timed out waiting for Judge0 result");
};



export async function executeCode(languageId, sourceCode, stdin = "") {

  const token  = await submitCode(languageId, sourceCode, stdin);
 
  const result = await pollResult(token);
  return result;
}
 
