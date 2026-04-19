function Options({ question, dispatch, answer }) {
  const hasAnswered = answer != null;
  const articles = ["der", "die", "das"];

  return (
    <div className="options">
      {articles.map((article) => {
        let buttonClass = "btn btn-option";

        if (hasAnswered) {
          if (article === question.article) buttonClass += " correct";
          else if (article === answer) buttonClass += " wrong";
          else buttonClass += " muted";
        }

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
