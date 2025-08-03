import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Quiz.css";
import QuizContext from "../../contexts/QuizContext";
import Spiner from "../../Components/Spiner/Spiner";

import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

import { useDispatch, useSelector } from "react-redux";
import BackendURL from "../../BackendURL";

const Quiz = () => {
  let { score, setScore } = useContext(QuizContext);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [isSelected, setIsSelected] = useState(false);
  let [selectedOption, setSelectedOption] = useState(null);
  let [option, setOption] = useState("");
  let [label] = useState(["A", "B", "C", "D","E"]);
  let [progressBarWidth, setProgressBarWidth] = useState(0);
  const [saveQuiz] = useState([]);
  let API_URL = `${BackendURL}/test/api/quiz/js`;

  const { singleTest } = useSelector((store) => store.test);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await axios.get(API_URL);
        let quizShuffle = data.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 30);
        setQuestions(quizShuffle);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
  }, [setQuestions]);

  const handleSubmitQuiz = async () => {
    handleNextQuestion(questions[currentQuestion]);
    try {
      localStorage.setItem("quiz", JSON.stringify(saveQuiz));
    } catch (error) {
      console.log(error);
    }
  };

  let [numberProgressComp] = useState([
    {
      component: (
        <>
          <span className={`connector block w-4 h-0 bg-custom-red`}></span>
          <span
            className={`number bg-custom-red text-sm text-gray-200 h-6 flex justify-center items-center rounded-full w-6`}
          >
            {currentQuestion + 1}
          </span>
        </>
      ),
    },
  ]);
  const handleOption = (index, option, question, e) => {
    setIsSelected(!isSelected);
    setSelectedOption(option.option);
    if (e.target === e.currentTarget) {
      if (!isSelected) {
        e.target.classList.remove("shadow-option");
      } else {
        e.target.classList.add("shadow-option");
      }
    }
    setOption(option.option);
  };
  const handleNextQuestion = (question) => {
    setCurrentQuestion(currentQuestion + 1);
    setProgressBarWidth(progressBarWidth + 5);
    numberProgressComp.push({
      component: (
        <>
          <span className={`connector block w-4 h-[1px] bg-custom-red`}></span>
          <span
            className={`number bg-custom-red text-sm text-gray-200 h-6 flex justify-center items-center rounded-full w-6`}
          >
            {numberProgressComp.length + 1}
          </span>
        </>
      ),
    });

    if (option === question.correctAnswer) {
      setScore(score + 1);
    }
    if (isSelected) {
      setIsSelected(false);
    }

    if (!option) {
      saveQuiz.push({
        ...question,
        userAnswer: false,
        selected: false,
        attempt: false,
      });
    } else {
      saveQuiz.push({
        ...question,
        userAnswer: option,
        selected: true,
        attempt: true,
      });
    }
    setOption("");
  };

  return (
    <Navbar>
      <div className="singleTest">
      <Header Title={"Test"} Address={"Tests"} />

        <div className="quiz-wrapper w-full min-h-[100vh]">
        <div className="md:relative quiz-content h-full col-span-2">
          {isLoading ? (
            <Spiner />
          ) : (
            <div className="py-6">
              {currentQuestion > 29 ? (
                window.location.replace("/user")
              ) : (
                <div className="quiz h-full md:px-2 px-8 flex gap-4 flex-col justify-center">
                  <div className="max-md:flex hidden">
                    <div className="bar shadow-inner w-full bg-white flex border rounded-3xl">
                      <div
                        className={`progress w-[${progressBarWidth}%] shadow-sm rounded-3xl bg-pink-500`}
                      ></div>
                    </div>
                    <span className="text-gray-500 ml-1">
                      {progressBarWidth}%
                    </span>
                  </div>
                  <div className="relative question-number md:flex hidden mb-8">
                    {questions.map((question, index) => {
                      return (
                        <div
                          className={`disabled flex items-center q-${
                            index + 1
                          }`}
                          key={index}
                        >
                          <span
                            className={`connector block w-4 h-[1px] bg-gray-200`}
                          ></span>
                          <span
                            className={`number bg-gray-200 text-sm text-gray-500 h-6 flex justify-center items-center rounded-full w-6`}
                          >
                            {index + 1}
                          </span>
                        </div>
                      );
                    })}
                    <div className={`flex items-center absolute left-0`}>
                      {numberProgressComp.map((comp) => {
                        return comp.component;
                      })}
                    </div>
                  </div>
                  <div className="question md:px-16">
                    <h1 className="md:text-xl flex text-black font-small leading-[1.6] mb-4">
                      <span className=""></span>{" "}
                      {questions[currentQuestion].question}
                    </h1>
                    {questions[currentQuestion].imageUrl && (
                        <img
                          src={questions[currentQuestion].imageUrl}
                          alt="Question Image"
                          className="object-contain max-h-96 w-full mb-4"
                        />
                      )}
                  </div>
                  <div className="options flex flex-col gap-4 md:px-16">
                    {questions[currentQuestion].options.map((option, index) => {
                      return (
                        <div
                          className="option flex gap-4 items-center"
                          key={index}
                        >
                          <div className="p-2 bg-white text-gray-600 font-medium w-10 flex justify-center items-center rounded-full h-10">
                            {label[index]}
                          </div>
                          <div
                            className={`option w-full relative z-10 py-2 cursor-pointer rounded-full bg-white ${
                              option === selectedOption
                                ? "shadow-option shadow-gray-400 after:bg-none"
                                : ""
                            }`}
                            onClick={(e) =>
                              handleOption(
                                index,
                                { option, selected: true },
                                questions[currentQuestion],
                                e
                              )
                            }
                          >
                            <span className="relative -z-10 pl-4">
                              {option}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="footer bg-transparent shadow-none px-2 py-2">
                    <div className="progress">
                      <div className="progress-bar"></div>
                    </div>
                    <div className="buttons flex justify-end gap-2">
                      {currentQuestion >= 29 ? (
                        <button
                          onClick={handleSubmitQuiz}
                          className="bg-custom-red text-white shadow-lg w-28 rounded-full px-4 py-2 flex items-center justify-center cursor-pointer text-black hover:transition hover:duration-150 hover:transform hover:translate-y-1"
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleNextQuestion(questions[currentQuestion])
                          }
                          className="bg-white text-black shadow-lg w-28 rounded-full px-4 py-2 flex items-center justify-center cursor-pointer text-black hover:transition hover:duration-150 hover:transform hover:translate-y-1"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
      </Navbar>
  );
};

export default Quiz;
