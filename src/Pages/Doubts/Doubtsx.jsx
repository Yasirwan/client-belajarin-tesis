import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDoubtx, getDoubtxData } from "../../Redux/doubt/actionx";

import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import AddIcon from "../../Components/AddIcon/AddIcon";
import DoubtxBox from "../../Components/DoubtBox/DoubtxBox";

import { Button, Drawer, Space, Spin, message } from "antd";
import "./Doubts.css";

const Doubtsx = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.auth.data);
  const { doubtx, load } = useSelector((store) => store.doubtx);

  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const initialFormData = {
    title: "",
    description: "",
    subject: "",
    studentId: user?._id,
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [size, setSize] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const UploadRef = useRef();
  const WidgetRef = useRef();

  const handleSubmit = () => {
    for (let keys in formData) {
      if (formData[keys] == "") {
        return alert("please fill all the details");
      }
    }
    if (size == "" || fileType == "" || fileUrl == "" || thumbnailUrl == "") {
      return alert("Please upload a file explaining your doubt");
    }
    let obj = { ...formData, size, fileType, thumbnailUrl, fileUrl };
    console.log(obj);
    setLoading(true);
    dispatch(createDoubtx(obj)).then((res) => {
      if (res.msg == "Error") {
        setLoading(false);
        messageApi.open({
          type: "info",
          content: "Error",
          duration: 3,
        });
      } else {
        setLoading(false);
        onClose();
        return messageApi.open({
          type: "info",
          content: "Doubt posted",
          duration: 3,
        });
      }
    });
  };

  useEffect(() => {
    UploadRef.current = window.cloudinary;
    WidgetRef.current = UploadRef.current.createUploadWidget(
      {
        cloudName: "diverse",
        uploadPreset: "diverse",
        maxFiles: 1,
        clientAllowedFormats: ["jpg", "jpeg", "mp4", "png"],
        maxFileSize: 52445000,
        thumbnailTransformation: [{ width: 240, height: 135, crop: "fill" }],
      },
      function (err, result) {
        if (result.info.secure_url) {
          setFileUrl(result.info.secure_url);
        }
        if (result.info.bytes) {
          setSize((result.info.bytes / 1000000).toFixed(3));
        }
        if (result.info.thumbnail_url) {
          setThumbnailUrl(result.info.thumbnail_url);
        }
        if (result.info.format) {
          setFileType(result.info.format);
        }
      }
    );
  }, []);

  useEffect(() => {
    dispatch(getDoubtxData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="content">
        <Header Title={"Kesimpulan"} Address={"Kesimpulan"} />

        <div className="contentData">
          {doubtx
            ?.filter((elem) => elem.resolved == "No")
            .map((data, i) => {
              return <DoubtxBox data={data} key={i} />;
            })}
        </div>

        <div>
        {user?.userType === "Admin" ? (
            <div onClick={showDrawer}>
            <AddIcon />
          </div>
          ) : (
            <div className="contentOption">
            </div>
          )}
        </div>

        <Drawer
          title="Tambah Kesimpulan Baru"
          width={720}
          onClose={onClose}
          open={open}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
            </Space>
          }
        >
          <form>
            <input
              placeholder="Judul"
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Deskripsi"
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Subjek"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) => handleFormChange(e)}
            />
          </form>
          {size ? (
            <div className="uploadedImgDiv">
              <p>File Type : {fileType}</p>
              <p>File Size : {size} mb</p>
              <p>Thumbnail :</p>
              <img src={thumbnailUrl} alt="thumbnail" />
            </div>
          ) : (
            ""
          )}
          <button
            className="uploadBtn"
            onClick={() => WidgetRef.current.open()}
          >
            Unggah Dokumen
          </button>
          <button className="submitBtn" onClick={handleSubmit}>
            Tambah
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

        {contextHolder}
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
    </Navbar>
  );
};

export default Doubtsx;
