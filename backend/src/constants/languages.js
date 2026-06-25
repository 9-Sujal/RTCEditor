export const LANGUAGE_MAP = {
  javascript: 63,
  typescript: 74,
  python:     71,
  java:       62,
  cpp:        54,
  c:          50,
  go:         60,
  rust:       73,
};
 
// Judge0 status IDs
export const JUDGE0_STATUS = {
  1:  "In Queue",
  2:  "Processing",
  3:  "Accepted",          // ran successfully
  4:  "Wrong Answer",
  5:  "Time Limit Exceeded",
  6:  "Compilation Error",
  7:  "Runtime Error (SIGSEGV)",
  8:  "Runtime Error (SIGXFSZ)",
  9:  "Runtime Error (SIGFPE)",
  10: "Runtime Error (SIGABRT)",
  11: "Runtime Error (NZEC)",
  12: "Runtime Error (Other)",
  13: "Internal Error",
  14: "Exec Format Error",
};
 