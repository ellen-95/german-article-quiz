function FinishScreen({ correctAnswers, numQuestions, highScore, dispatch }) {
  const percentage = (correctAnswers / numQuestions) * 100;
  let emoji;
  if (percentage === 100) emoji = "🏅";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 60 && percentage < 80) emoji = "💪";
  if (percentage >= 0 && percentage < 60) emoji = "🤔";
  if (percentage === 0) emoji = "🙈";

  return (
    <div className="finish">
      <p className="result">
        <span>{emoji}</span>You got <strong>{correctAnswers}</strong> out of{" "}
        {numQuestions} correct ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(best score: {highScore} correct answers)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
