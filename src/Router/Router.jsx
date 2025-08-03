import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Admin from "../Pages/Admin/Admin";
import Tutor from "../Pages/Tutor/Tutor";
import Student from "../Pages/Student/Student";
import Scratchs from "../Pages/Scratchs/Scratchs";
import SingleScratch from "../Pages/SingleScratch/SingleScratch";
import Lessons from "../Pages/Lessons/Lessons";
import Lessonsx from "../Pages/Lessons/Lessonsx";
import Content from "../Pages/Contents/Content";
import Assignment from "../Pages/Assignments/Assignment";
import Test from "../Pages/Tests/Test";
import SingleContent from "../Pages/SingleContent/SingleContent";
import SingleAssignment from "../Pages/SingleAssignment/SingleAssignment";
import Doubts from "../Pages/Doubts/Doubts";
import SingleDoubt from "../Pages/SingleDoubt/SingleDoubt";
import Doubtsx from "../Pages/Doubts/Doubtsx";
import SingleDoubtx from "../Pages/SingleDoubt/SingleDoubtx";
import Doubtsz from "../Pages/Doubts/Doubtsz";
import SingleDoubtz from "../Pages/SingleDoubt/SingleDoubtz";
import LeaderBoard from "../Pages/LeaderBoard/LeaderBoard";
import User from "../Pages/User/User";
import Quiz from "../Pages/Quiz/Quiz";
import { useContext } from "react";
import QuizContext from "../contexts/QuizContext"
import Register from "../Pages/Register/Register";

const Router = () => {
  const { userQuiz } = useContext(QuizContext)
  console.log(userQuiz)
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/student" element={<Student />} />
        <Route path="/scratchs" element={<Scratchs />} />
        <Route path="/scratch/:id" element={<SingleScratch />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/" element={<Lessonsx />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/content/:id" element={<SingleContent />} />
        <Route path="/contents" element={<Content />} />
        <Route path="/assignment/:id" element={<SingleAssignment />} />
        <Route path="/assignments" element={<Assignment />} />
        <Route path="/tests" element={<Test />} />
        <Route path="/doubts" element={<Doubts />} />
        <Route path="/doubt/:id" element={<SingleDoubt />} />
        <Route path="/doubtsx" element={<Doubtsx />} />
        <Route path="/doubtx/:id" element={<SingleDoubtx />} />
        <Route path="/doubtsz" element={<Doubtsz />} />
        <Route path="/doubtz/:id" element={<SingleDoubtz />} />
        <Route path="*" element={<Home />} />
        <Route path="/test/:id" element={userQuiz ? <Navigate to="/user" /> : <Quiz />} />
        <Route path="/user" element={userQuiz === null ? <Navigate to="/test/:id" /> : <User />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Router;
