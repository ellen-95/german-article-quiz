function Options({ question, dispatch, answer, mode }) {
  const hasAnswered = answer != null;
  const articles = ["der", "die", "das"];
  const showFeedback = mode === "practice" && hasAnswered;
  const showSelectedAnswer = mode === "test" && hasAnswered;

  return (
    <div className="options">
      {articles.map((article) => {
        let buttonClass = "btn btn-option";

        if (showFeedback) {
          if (article === question.article) buttonClass += " correct";
          else if (article === answer) buttonClass += " wrong";
          else buttonClass += " muted";
        }

        if (showSelectedAnswer && article !== answer) buttonClass += " muted";

        return (
          <button
            className={buttonClass}
            key={article}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: article })}
          >
            {article}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
