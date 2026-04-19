import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div className="question-card">
      <div className="question-content">
        <h4 className="question-word">{question.word}</h4>
        <p className="question-subtitle">Select the correct article</p>
      </div>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
