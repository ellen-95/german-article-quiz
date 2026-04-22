function StartScreen({ numQuestions, mode, setMode, onStart }) {
  return (
    <div className="start">
      <h2>Welcome to the German Article Quiz!</h2>
      <h3>A fantastic website to practice der, die, and das</h3>

      <div className="mode-selector">
        <div className="mode-buttons">
          <button
            className={`btn btn-mode ${
              mode === "practice" ? "btn-mode-selected" : ""
            }`}
            onClick={() => setMode("practice")}
          >
            Practice Mode
          </button>
          <button
            className={`btn btn-mode ${
              mode === "test" ? "btn-mode-selected" : ""
            }`}
            onClick={() => setMode("test")}
          >
            Test Mode
          </button>
        </div>
      </div>

      <button
        className="btn btn-ui"
        disabled={!mode}
        onClick={onStart}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
