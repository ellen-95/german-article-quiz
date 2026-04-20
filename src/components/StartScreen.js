import { useState } from "react";

function StartScreen({ numQuestions, dispatch }) {
  const [selectedMode, setSelectedMode] = useState(null);

  return (
    <div className="start">
      <h2>Welcome to the German Article Quiz!</h2>
      <h3>A fantastic website to practice der, die, and das</h3>

      <div className="mode-selector">
        <div className="mode-buttons">
          <button
            className={`btn btn-mode ${
              selectedMode === "practice" ? "btn-mode-selected" : ""
            }`}
            onClick={() => setSelectedMode("practice")}
          >
            Practice Mode
          </button>
          <button
            className={`btn btn-mode ${
              selectedMode === "test" ? "btn-mode-selected" : ""
            }`}
            onClick={() => setSelectedMode("test")}
          >
            Test Mode
          </button>
        </div>
      </div>

      <button
        className="btn btn-ui"
        disabled={!selectedMode}
        onClick={() => dispatch({ type: "start" })}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
