import React, { useEffect, useState } from "react";
import "./Scratchs.css";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import AddIcon from "../../Components/AddIcon/AddIcon";
import Scratch from "../../Components/Scratch/Scratch";
import { Button, Drawer, Space, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createScratch, getScratchData } from "../../Redux/scratch/action";
import { useNavigate } from "react-router-dom";
import deleteImage from '/img/deletec.png';

const Scratchs = () => {
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
  const { scratch, load } = useSelector((store) => store.scratch);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const initialFormData = {
    title: "",
    thumbnail: "",
    subject: "",
    noOfQuestions: "",
    pointPerQuestion: "",
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

  const submitScratch = () => {
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
    dispatch(createScratch(obj)).then((res) => {
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
          content: "Scratch Created",
          duration: 3,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getScratchData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="scratchs">
        {contextHolder}
        <Header Title={"Quiz"} Address={"Quiz"} />
        <div className="scratchData">
          {scratch?.map((data, i) => {
            return <Scratch data={data} key={i} />;
          })}
        </div>
        {user?.userType === "Admin" ? (
          <div onClick={showDrawer}>
            <AddIcon />
          </div>
        ) : (
          ""
        )}
        <Drawer
          title="Create Scratch"
          width={520}
          closable={false}
          onClose={onClose}
          open={open}
          extra={
            <Space>
            </Space>
          }
        >
          <form>
            <input
              placeholder="Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Scratch Thumbnail"
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Description"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="No.of Questions"
              type="number"
              name="noOfQuestions"
              value={formData.noOfQuestions}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Points per question"
              type="number"
              name="pointPerQuestion"
              value={formData.pointPerQuestion}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Total points"
              value={`Total Points : ${
                formData.noOfQuestions * formData.pointPerQuestion
              }`}
              name="totalPoints"
              onChange={(e) => handleFormChange(e)}
            />
          </form>
          <button className="Submit" onClick={() => submitScratch()}>
            Add Scratch
          </button>

          {loading ? (
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
        </Drawer>
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
         <div>
        </div>
      </div>
    </Navbar>
  );
};

export default Scratchs;
