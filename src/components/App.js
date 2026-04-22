import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import NextButton from "./NextButton";
import { useEffect, useReducer, useState } from "react";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 10;

const initialState = {
  questions: [],

  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  correctAnswers: 0,
  highScore: 0,
  secondsRemaining: null,
  wrongAnswers: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: action.payload * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const isCorrectAnswer = action.payload === action.question.article;

      return {
        ...state,
        answer: action.payload,
        correctAnswers: isCorrectAnswer
          ? state.correctAnswers + 1
          : state.correctAnswers,
        wrongAnswers: isCorrectAnswer
          ? state.wrongAnswers
          : [
              ...state.wrongAnswers,
              {
                word: action.question.word,
                correctArticle: action.question.article,
                selectedArticle: action.payload,
              },
            ],
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.correctAnswers > state.highScore
            ? state.correctAnswers
            : state.highScore,
      };

    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [mode, setMode] = useState(null);
  const [level, setLevel] = useState(null);
  const [
    {
      questions,
      status,
      index,
      answer,
      correctAnswers,
      highScore,
      secondsRemaining,
      wrongAnswers,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const activeQuestions =
    mode === "native"
      ? questions.filter((question) => question.level === "Native")
      : questions.filter((question) => question.level === level);

  const numQuestions = activeQuestions.length;
  const currentQuestion = activeQuestions[index];

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const isCenteredScreen = status === "ready" || status === "finished";

  function handleStartQuiz() {
    const needsLevel = mode === "practice" || mode === "test";

    if (!mode) return;
    if (needsLevel && !level) return;

    dispatch({ type: "start", payload: numQuestions });
  }

  return (
    <div className="app">
      <Main className={isCenteredScreen ? "main-centered" : ""}>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            mode={mode}
            setMode={setMode}
            level={level}
            setLevel={setLevel}
            onStart={handleStartQuiz}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              correctAnswers={correctAnswers}
              answer={answer}
            />
            <Question
              question={currentQuestion}
              dispatch={dispatch}
              answer={answer}
              mode={mode}
            />
            <Footer>
              {(mode === "test" || mode === "native") && (
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
              )}
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            correctAnswers={correctAnswers}
            numQuestions={numQuestions}
            highScore={highScore}
            dispatch={dispatch}
            mode={mode}
            wrongAnswers={wrongAnswers}
          />
        )}
      </Main>
    </div>
  );
}
