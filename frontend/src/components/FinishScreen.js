import { useEffect, useState } from "react";

const STORAGE_KEY = "germanQuizMistakes";

function getSavedMistakes() {
  const savedMistakes = localStorage.getItem(STORAGE_KEY);

  if (!savedMistakes) return [];

  try {
    return JSON.parse(savedMistakes);
  } catch {
    return [];
  }
}

function sortMistakesByFrequency(mistakes) {
  return [...mistakes].sort((a, b) => b.frequency - a.frequency);
}

function FinishScreen({
  correctAnswers,
  numQuestions,
  highScore,
  dispatch,
  mode,
  wrongAnswers,
}) {
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  const [savedMistakes, setSavedMistakes] = useState([]);
  const percentage = (correctAnswers / numQuestions) * 100;
  let emoji;
  if (percentage === 100) emoji = "🏅";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 60 && percentage < 80) emoji = "💪";
  if (percentage >= 0 && percentage < 60) emoji = "🤔";
  if (percentage === 0) emoji = "🙈";

  const isPracticeMode = mode === "practice";
  const isNativeMode = mode === "native";

  useEffect(() => {
    const existingMistakes = getSavedMistakes();

    if (wrongAnswers.length === 0) {
      setSavedMistakes(sortMistakesByFrequency(existingMistakes));
      return;
    }

    const updatedMistakes = [...existingMistakes];

    wrongAnswers.forEach((wrongAnswer) => {
      const existingMistake = updatedMistakes.find(
        (item) =>
          item.word === wrongAnswer.word &&
          item.correctArticle === wrongAnswer.correctArticle
      );

      if (existingMistake) {
        existingMistake.frequency += 1;
        existingMistake.selectedArticle = wrongAnswer.selectedArticle;
      } else {
        updatedMistakes.push({
          word: wrongAnswer.word,
          correctArticle: wrongAnswer.correctArticle,
          selectedArticle: wrongAnswer.selectedArticle,
          frequency: 1,
        });
      }
    });

    const sortedMistakes = sortMistakesByFrequency(updatedMistakes);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedMistakes));
    setSavedMistakes(sortedMistakes);
  }, [wrongAnswers]);

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
          {savedMistakes.length === 0 ? (
            <p className="review-empty">
              🎉Perfect done! No mistakes to review.
            </p>
          ) : (
            <ul className="review-list">
              {savedMistakes.map((item) => (
                <li
                  className="review-item"
                  key={`${item.word}-${item.correctArticle}`}
                >
                  <span className="review-word">{item.word}</span> — correct:{" "}
                  <strong>{item.correctArticle}</strong>, your answer:{" "}
                  <strong>{item.selectedArticle}</strong> · missed{" "}
                  {item.frequency} {item.frequency === 1 ? "time" : "times"}
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
