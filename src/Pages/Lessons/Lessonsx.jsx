import React, { useEffect, useState } from "react";
import "./Lessonsx.css";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import AddIcon from "../../Components/AddIcon/AddIcon";
import Lessonx from "../../Components/Lesson/Lessonx";
import { Button, Drawer, Space, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createLessonx, getLessonxData } from "../../Redux/lesson/actionx";
import { useNavigate } from "react-router-dom";
import deleteImage from '/img/deletec.png';
import logo from "../../Assets/logo.png";
import ava from "../../Assets/useravatar.png";
import coverImage from '/img/cover.png';
import ava_salsa from '/img/ava_salsa.png';
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { IoLogoInstagram } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { MdNavigateNext } from "react-icons/md";

const Lessonsx = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useSelector((store) => store.auth.data);
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const { lessonx, load } = useSelector((store) => store.lessonx);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const initialFormData = {
    title: "",
    thumbnail: "",
    class: "",
    subject: "",
  };

  const questionData = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [question, setQuestion] = useState(questionData);
  const [allQuestions, setAllQuestions] = useState([]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeQuestion = (i) => {
    setAllQuestions(allQuestions.filter((elem, index) => index != i));
  };

  const submitLessonx = () => {
    for (let keys in formData) {
      if (formData[keys] == "") {
        return messageApi.open({
          type: "info",
          content: "Enter all the required fields",
          duration: 3,
        });
      }
    }

    let obj = {
      ...formData,
      questionData: allQuestions,
      totalPoint: +formData.pointPerQuestion * +formData.noOfQuestions,
      totalTime: formData.totalTime,
      creator: user.name,
    };

    console.log(obj);
    setLoading(true);
    dispatch(createLessonx(obj)).then((res) => {
      if (res.msg == "Error") {
        setLoading(false);
        messageApi.open({
          type: "info",
          content: "Error",
          duration: 3,
        });
      } else {
        setLoading(false);
        setAllQuestions([]);
        setFormData(initialFormData);
        setQuestion(questionData);
        onClose();
        return messageApi.open({
          type: "info",
          content: "Lessonx Created",
          duration: 3,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getLessonxData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
      <div className="lessonsx">
        {contextHolder}
        <nav>
          <div className="nav-left">
            <div className="maskot">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="wrap-menu">
          </div>
          <div className="nav_right">
            
            <div  onClick={() => navigate('/login')} class="nav_profile cursor-pointer">
              <img src={ava} alt="ava"/>
      </div>
          </div>
        </nav>

        <div className="hero-section">
          <div className="hero-image" data-aos="fade-right" data-aos-delay="500">
            <img src={coverImage} alt="Hero" />
          </div>
          <div className="hero-information" data-aos="fade-left" data-aos-delay="500">
            <h1>Transforming Education, Empowering Futures</h1>
            <p>
            Studee delivers a fun and easy learning experience through rich interactive multimedia, <br/>real-time feedback, and drag-and-drop quizzes. It utilizes the Needham Model <br/>to ensure every student learns effectively and reaches their full potential.
            </p>
            {/* <button>
              <a href="../html/login_page.html">Sign Up Now! </a>
            </button> */}
            <button onClick={() => navigate('/login')} className="p-2 my-2" style={{ backgroundColor: '#920000' }}>Get Started</button>
          </div>
        </div>

        <div className="homeCenter">

          {/* about us */}
          <div className="main-section">
            <div className="main-box">

              {/* about us bottom */}
              <div className="main-center">

                {/* about us bottom salsa */}
                <div
                  className="main-form"
                  data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  <img src={ava_salsa} alt="Salsa" />
                  <h3>Tsalsabilla Nurfitriyatna Putri</h3>
                  <h2>Fullstack Developer</h2>
                  <p>Universitas Pendidikan Indonesia</p>
                  <p>Computer Science Education</p>
                  <div className="inFlex mt-2 flex justify-center w-full cursor-pointer text-black">
                    <a  className="hover:transition hover:duration-150 hover:transform hover:translate-y-1" target="_blank" href="http://linkedin.com/in/tsalsabillanf">
                    <TiSocialLinkedinCircular className="text-gray-600 mr-4 h-8 w-6"/>
                    </a>
                    <a  className="hover:transition hover:duration-150 hover:transform hover:translate-y-1" target="_blank" href="mailto:tsalsabilla569@gmail.com">
                    <CiMail className="text-gray-600 h-8 w-6"/>
                    </a>
                  </div>
                </div>
                <div className="profile-text rounded-lg px-8 py-3 text-left">
                <h1 className="title py-2 mt-4">Developer Profile</h1>
                <p>I'm Salsa, deeply passionate about frontend development with a strong focus on best practices. My expertise spans the entire frontend development spectrum, from design and code implementation to deployment. With a proven track record in end-to-end project management and stakeholder engagement, I bring a unique blend of technical proficiency in MERN stack (MongoDb, Express, React, Node.Js) as well as being a proficient management skills. I see myself as your frontend developer, committed to supporting your company’s frontend projects who is not only creative but also attention to detail.</p>
                <a target="_blank" href="https://drive.google.com/file/d/1_xOxlyqG0c_euccaBZnFkS1IINASUuY2/view" class="rounded-full py-2 flex items-center cursor-pointer text-custom-red hover:transition hover:duration-150 hover:transform hover:translate-y-1 mt-2 mb-4">Curriculum Vitae<MdNavigateNext/></a>
                </div>
                {/* end about us bottom salsa */}
              </div>
              {/* end about us bottom */}
            </div>
          </div>
          {/* end about us */}

          {/* leaderboard */}
          <div className="credential">
          <div className="credits" data-aos="fade-down" data-aos-delay="500">
            <h1 className="title">Credits</h1>
            <p>This website has been made using the following assets</p>
            <p className="font-bold">Photos</p>
            <p>https://www.freepik.com/</p>
            <p className="font-bold">Book</p>
            <p>https://buku.kemdikbud.go.id/katalog/informatika-untuk-smkmak-kelas-x-semester-2</p>
            <p className="font-bold">Videos</p>
            <p>https://www.youtube.com/watch?v=fLqHSiJMMyI</p>
            <p>https://www.youtube.com/watch?v=1S35wmupqn4</p>
            <p>https://www.youtube.com/watch?v=zbSzPA9xTLo&list=PL3uuG4lYbnOyBfw6cgmCWQSZDntAoExpJ&index=4
</p>
            <p>https://www.youtube.com/watch?v=8DL_Bax4mro
</p>
            <p>https://www.youtube.com/watch?v=0sFh-rALd2Q&list=PL3uuG4lYbnOyBfw6cgmCWQSZDntAoExpJ&index=5
</p>
            <p>https://www.youtube.com/watch?v=G-c0KnAgucc&list=PL3uuG4lYbnOyBfw6cgmCWQSZDntAoExpJ&index=13
</p>
            <p>https://www.youtube.com/watch?v=VSL19lCLqHk&list=PL3uuG4lYbnOyBfw6cgmCWQSZDntAoExpJ&index=14
</p>
            <p>https://www.youtube.com/watch?v=_lxIFFLFdBk&list=PL3uuG4lYbnOyBfw6cgmCWQSZDntAoExpJ&index=15
</p>
            <p>https://www.youtube.com/watch?v=5jbYsYj1-v0&list=PL3uuG4lYbnOyBfw6cgmCWQSZDntAoExpJ&index=16
</p>
            <p>https://www.youtube.com/watch?v=5lO9YdC48uw&list=PL3uuG4lYbnOyBfw6cgmCWQSZDntAoExpJ&index=17
</p>
            <p>https://www.youtube.com/watch?v=hVzmJwyMH2Q&list=PL3uuG4lYbnOyBfw6cgmCWQSZDntAoExpJ&index=20
</p>
            <p>https://www.youtube.com/watch?v=ctxtCv7plVc&list=PL3uuG4lYbnOyBfw6cgmCWQSZDntAoExpJ&index=21
</p>

<p>
https://www.youtube.com/watch?v=kH8bkgogfD0&list=PL3uuG4lYbnOyBfw6cgmCWQSZDntAoExpJ&index=22</p>
          </div>
          <div className="table-container" data-aos="fade-up" data-aos-delay="500">
            <div id="highScores" className="flex-center flex-column">
              <div id="userData" className="tabel"></div>
            </div>
          </div>
          </div>
          {/* end leaderboard */}
        </div>

        <div className="footer">
          {/* footer logo */}
          <div className="nav-left">
            <div className="maskot">
              <a>
                <img src={logo} alt="Logo" />
              </a>
            </div>
            <div className="logo">
            </div>
          </div>
          {/* end footer logo */}

          {/* footer keywords */}
          <div className="bottom-information1">
            <div className="bottom-left">
              <h1>Start Your Journey</h1>
              <p>Algoritma</p>
              <p>Pemrograman</p>
              <p>Percabangan</p>
              <p>Perulangan</p>
            </div>
            <div className="bottom-center">
              <h1>Go To</h1>
              <p>Register</p>
              <p>Dashboard</p>
            </div>
            <div className="bottom-right">
              <h1>About</h1>
              <p>FAQ</p>
            </div>
          </div>
          {/* end footer keywords */}

          <hr />

          {/* footer contact */}
          <div className="bottom-information">
            <div className="bottom-right">
              <div className="bottom-head"></div>
              <div className="socmed">
                <a target="_blank" href="https://instagram.com/tsalsabillanf">
                  <FaInstagram className="text-gray-600 mr-2"/>
                </a>
                <a target="_blank" href="https://youtube.com/shorts/7jvhVZJnySA?feature=shared">
                  <FiYoutube className="text-gray-600 mr-2"/>                </a>
              </div>
            </div>
            <div className="bottom-left">
              <div className="bottom-head"></div>
              <div className="call">
                <a target="_blank" href="https://adammukti.github.io/Tiktok/?by=anto">
                <IoCallOutline className="text-gray-600 mr-2"/>
                </a>
                <a target="_blank" href="https://adammukti.github.io/Tiktok/?by=anto">
                  <p>(021) 212 1212</p>
                </a>
              </div>
            </div>
            <div className="bottom-center">
              <div className="bottom-head"></div>
              <div className="loc">
                <a target="_blank" href="https://www.google.com/maps/place/41%C2%B018'14.1%22N+81%C2%B054'06.1%22W/@41.3039759,-81.9029918,17.68z/data=!4m4!3m3!8m2!3d41.3039167!4d-81.9016944?entry=ttu">
                <IoLocationOutline className="text-gray-600 mr-2"/>
                </a>
                <a target="_blank" href="https://www.google.com/maps/place/41%C2%B018'14.1%22N+81%C2%B054'06.1%22W/@41.3039759,-81.9029918,17.68z/data=!4m4!3m3!8m2!3d41.3039167!4d-81.9016944?entry=ttu">
                  <p>Studee Street No.12 Seoul, Korea</p>
                </a>
              </div>
            </div>
          </div>
          {/* end footer contact */}

          {/* footer copyrights */}
          <div className="bottom-copyright">
            <p>
            © 2024 studee | All Rights Reserved | Created by salsa💖
            </p>
          </div>
          {/* end footer copyrights */}
        </div>

        {load ? (
          <Space
            style={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.2)",
              top: "0",
              left: "0",
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <Spin size="large"></Spin>
          </Space>
        ) : null}
      </div>
  );
};

export default Lessonsx;
