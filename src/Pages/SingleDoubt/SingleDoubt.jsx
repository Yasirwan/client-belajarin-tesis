import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addResponse, getSingleDoubtData } from "../../Redux/doubt/action";

import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

import { Space, Spin } from "antd";
import "./SingleDoubt.css";

const SingleDoubt = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { singleDoubt, load } = useSelector((store) => store.doubt);

  const [descPengetahuanAwal, setDescPengetahuanAwal] = useState("");
  const [descFasePenstrukturan, setDescFasePenstrukturan] = useState("");
  const [descPengetahuanAkhir, setDescPengetahuanAkhir] = useState("");

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === "PengetahuanAwal") {
      dispatch(addResponse(singleDoubt?._id, descPengetahuanAwal));
      setDescPengetahuanAwal("");
    } else if (type === "FasePenstrukturan") {
      dispatch(addResponse(singleDoubt?._id, descFasePenstrukturan));
      setDescFasePenstrukturan("");
    } else if (type === "PengetahuanAkhir") {
      dispatch(addResponse(singleDoubt?._id, descPengetahuanAkhir));
      setDescPengetahuanAkhir("");
    }
  };

  useEffect(() => {
    dispatch(getSingleDoubtData(params.id));
    setDescPengetahuanAwal("");
    setDescFasePenstrukturan("");
    setDescPengetahuanAkhir("");
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="singleContent">
        <Header Title={"Initial Knowlede"} Address={"Initial"} />
        {/* <div className="singleContentData">
        <div className="fileContainer">
  {singleDoubt?.fileType === "jpg" || singleDoubt?.fileType === "jpeg" || singleDoubt?.fileType === "png"? (
    <img src={singleDoubt?.fileUrl} alt="" />
  ) : (
    <video
      allow="fullscreen"
      frameBorder="0"
      width="100%"
      controls
      controlsList="nodownload"
    >
      <source src={singleDoubt?.fileUrl} />
    </video>
  )}
</div>

        </div> */}

        <div className="doubtResponses">
          <p>{singleDoubt?.title}</p>
          <p>{singleDoubt?.subject}</p>
          <p>{singleDoubt?.description}</p>
        </div>

        <div className="flex flex-row justify-center">
        <div className="doubtResponses bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center" >
          <h3 className="text-white font-bold text-center">Pengetahuan Awal</h3>
        </div>
        </div>

        <div className="doubtResponses bg-white bg-opacity-50 rounded-lg p-4 my-2">
          <h3 className="text-black">Setelah menonton video, masing-masing siswa silahkan untuk menuliskan lima kata kunci yang mencerminkan inti dari seluruh materi yang dibahas dalam video pembelajaran!</h3>
        </div>

        {singleDoubt?.response?.map((data, i) => {
          return (
            <div
              key={i}
              className="doubtResponses bg-red-100 rounded-lg p-4 my-2"
            >
              <p>Urutan no. : {i + 1}</p>
              <p>{data}</p>
            </div>
          );
        })}
          <form
          className="responseForm flex flex-row p-4 my-2" onSubmit={(e) => handleSubmit(e, "PengetahuanAkhir")}
          >
            <input
              name="desc"
              className="mx-auto border-none w-3/4 px-4"
              value={descPengetahuanAkhir}
              onChange={(e) => setDescPengetahuanAkhir(e.target.value)}
              placeholder="e.g. Salsa | Sistematis, Langkah, Metode, Input,Proses"
            />
            <input type="submit" className="bg-custom-red text-white py-2 px-4 rounded-full border-none max-w-md mx-auto w-1/4" />
          </form>

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

export default SingleDoubt;