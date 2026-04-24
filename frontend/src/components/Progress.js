function Progress({ index, numQuestions, correctAnswers, answer }) {
  return (
    <header className="progress">
      <p className="progress-text">
        Question {index + 1}/{numQuestions}
      </p>
      <progress max={numQuestions} value={index + Number(answer != null)} />
    </header>
  );
}

export default Progress;
