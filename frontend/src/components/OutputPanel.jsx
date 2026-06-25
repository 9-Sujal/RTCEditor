export default function OutputPanel({ output, runCode, running, isError }) {
  return (
    <div className="output-wrapper">
      <div className="output-header">
        <span className="output-title">Output</span>
        <button
          className="run-button"
          onClick={runCode}
          disabled={running}
        >
          {running ? "⏳ Running..." : "▶ Run Code"}
        </button>
      </div>
 
      <div
        className={`output-console ${isError ? "output-error" : output ? "output-success" : ""}`}
      >
        {running
          ? "Running your code..."
          : output || "Click 'Run Code' to see output here."}
      </div>
    </div>
  );
}
 
