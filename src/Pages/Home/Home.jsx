import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../Redux/dashboard/action";
import { getStudentData } from "../../Redux/student/action";

import Navbar from "../../Components/Sidebar/Navbar";
import SalesDiv from "../../Components/SalesDiv/SalesDiv";
import Header from "../../Components/Header/Header";

import { PiStudent } from "react-icons/pi";
import { AiOutlineSchedule, AiOutlineRead, AiOutlinePlayCircle } from "react-icons/ai";
import { IoBulbOutline } from "react-icons/io5";
import { CgGames } from "react-icons/cg";

import "react-vertical-timeline-component/style.min.css";
import "./Home.css";

import heroImage from '/img/hero.png';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);

  const { dashboard } = useSelector((store) => store.dashboard);
  const { students } = useSelector((store) => store.student)

  const overviewData = [
    {
      icon: <PiStudent />,
      title: "Students",
      number: dashboard?.students?.length || 0,
    },
    {
      icon: <AiOutlineSchedule />,
      title: "Tests",
      number: dashboard?.tests?.length || 0,
    },
    {
      icon: <AiOutlineRead />,
      title: "Lessons",
      number: dashboard?.lessons?.length || 0,
    },
    {
      icon: <AiOutlinePlayCircle />,
      title: "Videos",
      number: dashboard?.contents?.length || 0,
    },
    {
      icon: <IoBulbOutline />,
      title: "Knowledge",
      number: dashboard?.doubts?.length || 0,
    },
    {
      icon: <CgGames />,
      title: "Quiz",
      number: dashboard?.scratchs?.length || 0,
    },
  ];

  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(getStudentData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar>
        <div className="main">
          <Header Title={"Overview"} Address={"Default"} />

          <div className="overview">
            <div className="overview-left">
              <div>
                <h2> Welcome to Studee</h2>
                <p>Transforming Education, Empowering Futures</p>
              </div>
              <div>
                <button>Get Started !</button>
              </div>
              <img src={heroImage}/>
            </div>
            <div className="overview-right">
              {overviewData?.map(({ icon, title, number }, i) => {
                return (
                  <SalesDiv Icon={icon} Title={title} Number={number} key={i} />
                );
              })}
            </div>
          </div>

          <div className="charts">
            <div className="leaderboardData m-0 w-full">
            <div className="chartHead bg-#920000 px-4 py-2 rounded-t-lg">
        <p className="text-gray-800 font-bold">Leader Board</p>
    </div>
              <section className="tableBody">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Class</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      .map((data, i) => (
                        <tr className="tableRow">
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.class}</td>
                          <td>{data.totalScore}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </section>
            </div>
            <div className="pieChart w-1/4 border border-gray-200 rounded-lg shadow-md float-left">
    <div className="chartHead bg-#920000 px-4 py-2 rounded-t-lg">
        <p className="text-gray-800 font-bold">Announcement</p>
    </div>
    <div className="pieBox p-4">
        <div className="pieData">
        <span className="block font-bold text-left">
              WEEK 1</span>
            <p className="text-sm text-gray-600 text-left">
            ❗ Masing-masing siswa diusahakan untuk mempersiapkan sarana dan prasarana untuk mendukung kelancaran pembelajaran : <br/>
            1. laptop (disarankan) atau handphone <br/>
            2. ⁠baterai laptop/handphone yang cukup <br/>
            3. ⁠koneksi internet yg stabil <br/>
            4. ⁠posisi meja dan bangku menyesuaikan kelompok dari 1-6 <br/>
            Terimakasih dan selamat beraktivitas...
            </p>

            <br/>
        
            <span className="block font-bold text-left">
              WEEK 2</span>
            <p className="text-sm text-gray-600 text-left">
            ❗ Deadline pengumpulan LKPD W1 Jumat, 14/06/2024 23:59<br/>
            Terimakasih dan selamat beraktivitas...
            </p>

            <br/>

            <span className="block font-bold text-left">
              WEEK 3</span>
            <p className="text-sm text-gray-600 text-left">
            ❗ Deadline pengumpulan LKPD W2 Jumat, 21/06/2024 23:59<br/>
            Terimakasih dan selamat beraktivitas...
            </p>

        </div>
    </div>
</div>



          </div>
          <div className="homeFooter">
          © 2024 studee | All Rights Reserved | Created by salsa💖
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Home;
