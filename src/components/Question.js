import Options from "./Options";

function Question({ question, dispatch, answer, mode }) {
  return (
    <div className="question-card">
      <div className="question-content">
        <h4 className="question-word">{question.word}</h4>
        <p className="question-subtitle">Select the correct article</p>
      </div>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        mode={mode}
      />
    </div>
  );
}

export default Question;
