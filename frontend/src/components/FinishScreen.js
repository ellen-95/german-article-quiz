import { useState } from "react";

function FinishScreen({
  correctAnswers,
  numQuestions,
  highScore,
  dispatch,
  mode,
  wrongAnswers,
}) {
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  const percentage = (correctAnswers / numQuestions) * 100;
  let emoji;
  if (percentage === 100) emoji = "🏅";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 60 && percentage < 80) emoji = "💪";
  if (percentage >= 0 && percentage < 60) emoji = "🤔";
  if (percentage === 0) emoji = "🙈";

  const isPracticeMode = mode === "practice";
  const isNativeMode = mode === "native";

  return (
    <div className="finish">
      <p className={`result ${isNativeMode ? "result-native" : ""}`}>
        {isPracticeMode ? (
          <>
            <span>🎉</span>You practiced the quiz today. Nice work keeping your
            German articles fresh, and you can continue learning tomorrow.
          </>
        ) : isNativeMode ? (
          <>
            <span>{emoji}</span>Not bad — maybe you really are German.
            <br />
            You got <strong>{correctAnswers}</strong> out of {numQuestions}{" "}
            correct ({Math.round(percentage)}%)
          </>
        ) : (
          <>
            <span>{emoji}</span>You got <strong>{correctAnswers}</strong> out of{" "}
            {numQuestions} correct ({Math.round(percentage)}%)
          </>
        )}
      </p>
      {!isPracticeMode && (
        <p className="highscore">(best score: {highScore} correct answers)</p>
      )}
      <div className="finish-actions">
        <button
          className="btn btn-ui"
          onClick={() => setShowWrongAnswers((show) => !show)}
        >
          Wrong words
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart Quiz
        </button>
      </div>
      {showWrongAnswers && (
        <div className="review-section">
          {wrongAnswers.length === 0 ? (
            <p className="review-empty">
              🎉Perfect done! No mistakes to review.
            </p>
          ) : (
            <ul className="review-list">
              {wrongAnswers.map((item, index) => (
                <li className="review-item" key={`${item.id}`}>
                  <span className="review-word">{item.word}</span> — correct:{" "}
                  <strong>{item.correctArticle}</strong>, your answer:{" "}
                  <strong>{item.selectedArticle}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default FinishScreen;
