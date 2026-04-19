function Options({ question, dispatch, answer }) {
  const hasAnswered = answer != null;
  const articles = ["der", "die", "das"];

  return (
    <div className="options">
      {articles.map((article) => (
        <button
          className={`btn btn-option ${article === answer ? "answer" : ""} 
          ${
            hasAnswered
              ? article === question.article
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={article}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: article })}
        >
          {article}
        </button>
      ))}
    </div>
  );
}

export default Options;
