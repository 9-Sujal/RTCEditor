// test-judge0.js  — run with: node test-judge0.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";
const HEADERS = {
  "Content-Type": "application/json",
  "X-RapidAPI-Key":  process.env.RAPID_API_KEY,
  "X-RapidAPI-Host": process.env.RAPID_API_HOST,
};

const encodeBase64 = (str) => Buffer.from(str, "utf-8").toString("base64");
const decodeBase64 = (str) => str ? Buffer.from(str, "base64").toString("utf-8") : null;

const code = `console.log("harry potter");`;

console.log("Submitting code...");
const submitRes = await axios.post(
  `${JUDGE0_URL}/submissions?base64_encoded=true`,
  {
    language_id: 63,
    source_code: encodeBase64(code),
    stdin: encodeBase64(""),
  },
  { headers: HEADERS, timeout: 10000 }
);

console.log("Token received:", submitRes.data.token);
const token = submitRes.data.token;

// poll
for (let i = 0; i < 10; i++) {
  await new Promise(r => setTimeout(r, 1000));
  const pollRes = await axios.get(
    `${JUDGE0_URL}/submissions/${token}?base64_encoded=true`,
    { headers: HEADERS, timeout: 10000 }
  );
  const d = pollRes.data;
  console.log(`Poll ${i+1}: status=${d.status.id} (${d.status.description})`);

  if (d.status.id > 2) {
    console.log("stdout:", decodeBase64(d.stdout));
    console.log("stderr:", decodeBase64(d.stderr));
    console.log("compile_output:", decodeBase64(d.compile_output));
    break;
  }
}