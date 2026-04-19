import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>What is the article for "{question.word}"?</h4>
      <p className="question-level">Level: {question.level}</p>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
