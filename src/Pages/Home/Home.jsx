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
      title: "Siswa",
      number: dashboard?.students?.length || 0,
    },
    {
      icon: <AiOutlineSchedule />,
      title: "Latihan",
      number: dashboard?.tests?.length || 0,
    },
    {
      icon: <AiOutlineRead />,
      title: "Materi",
      number: dashboard?.lessons?.length || 0,
    },
    {
      icon: <AiOutlinePlayCircle />,
      title: "Video",
      number: dashboard?.contents?.length || 0,
    },
    {
      icon: <IoBulbOutline />,
      title: "Pengetahuan",
      number: dashboard?.doubts?.length || 0,
    },
    {
      icon: <CgGames />,
      title: "Kuis",
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
          <Header Title={"Ringkasan"} Address={"Ringkasan"} />

          <div className="overview">
            <div className="overview-left">
              <div>
                <h2> Selamat Datang di BelajarIn</h2>
                <p>Inovasi dalam Pembelajaran, Kunci untuk Masa Depan Gemilang</p>
              </div>
              <div>
                <button>Mari Mulai</button>
              </div>
              <img src={heroImage} />
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
                <p className="text-gray-800 font-bold">Papan Skor</p>
              </div>
              <section className="tableBody">
                <table>
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>Kelas</th>
                      <th>Nilai</th>
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
                <p className="text-gray-800 font-bold">Pengumuman</p>
              </div>
              <div className="pieBox p-4">
                <div className="pieData">
                  <span className="block font-bold text-left">
                    Pertemuan 1</span>
                  <p className="text-sm text-gray-600 text-left">
                    Materi: Pengenalan Algoritma <br />
                    Silakan unduh modul dan tonton video pembelajaran sebelum mengikuti forum diskusi. <br />
                  </p>
                  <br />

                  <span className="block font-bold text-left">
                    Pertemuan 2</span>
                  <p className="text-sm text-gray-600 text-left">
                    Materi: Pengenalan Pemrograman<br />
                    Sudah tersedia di LMS. Harap mempelajari materi dan mengerjakan kuis sebelum batas waktu yang ditentukan.                  </p>
                  <br />

                  {/* <span className="block font-bold text-left">
                    Pertemuan 3</span>
                  <p className="text-sm text-gray-600 text-left">
                    Materi: Percabangan dan Perulangan<br />
                    Silakan kerjakan tugas individu dan unggah ke LMS paling lambat hari Jumat pukul 23.59 WIB.                  </p> */}
                </div>
              </div>
            </div>



          </div>
          <div className="homeFooter">
            © 2025 BelajarIn | All Rights Reserved | Dibuat oleh Yasir
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Home;
