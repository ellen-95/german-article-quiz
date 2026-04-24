const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

function StartScreen({ mode, setMode, level, setLevel, onStart }) {
  const showLevelSelection = mode === "practice" || mode === "test";
  const isStartDisabled = !mode || (showLevelSelection && !level);

  function handleSelectMode(selectedMode) {
    setMode(selectedMode);

    if (selectedMode === "native") {
      setLevel(null);
    }
  }

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
            onClick={() => handleSelectMode("practice")}
          >
            Practice Mode
          </button>
          <button
            className={`btn btn-mode ${
              mode === "test" ? "btn-mode-selected" : ""
            }`}
            onClick={() => handleSelectMode("test")}
          >
            Test Mode
          </button>
          <button
            className={`btn btn-mode ${
              mode === "native" ? "btn-mode-selected" : ""
            }`}
            onClick={() => handleSelectMode("native")}
          >
            Native Challenge
          </button>
        </div>
      </div>

      {showLevelSelection && (
        <div className="level-selector">
          <h4 className="level-title">Choose your level</h4>
          <div className="level-buttons">
            {levels.map((levelOption) => (
              <button
                className={`btn btn-level ${
                  level === levelOption ? "btn-mode-selected" : ""
                }`}
                key={levelOption}
                onClick={() => setLevel(levelOption)}
              >
                {levelOption}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        className="btn btn-ui"
        disabled={isStartDisabled}
        onClick={onStart}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
