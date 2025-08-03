import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addResponse, getSingleDoubtzData } from "../../Redux/doubt/actionz";

import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

import { Space, Spin } from "antd";
import "./SingleDoubt.css";

const SingleDoubtz = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { singleDoubtz, load } = useSelector((store) => store.doubtz);
  const { user } = useSelector((store) => store.auth.data);

  const [descPengetahuanAwal, setDescPengetahuanAwal] = useState("");
  const [descFasePenstrukturan, setDescFasePenstrukturan] = useState("");
  const [descPengetahuanAkhir, setDescPengetahuanAkhir] = useState("");

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === "PengetahuanAwal") {
      dispatch(addResponse(singleDoubtz?._id, descPengetahuanAwal));
      setDescPengetahuanAwal("");
    } else if (type === "FasePenstrukturan") {
      dispatch(addResponse(singleDoubtz?._id, descFasePenstrukturan));
      setDescFasePenstrukturan("");
    } else if (type === "PengetahuanAkhir") {
      dispatch(addResponse(singleDoubtz?._id, descPengetahuanAkhir));
      setDescPengetahuanAkhir("");
    }
  };

  useEffect(() => {
    dispatch(getSingleDoubtzData(params.id));
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
        <Header Title={"Assignment"} Address={"Assignment"} />
        {/* <div className="singleContentData">
        <div className="fileContainer">
  {singleDoubtz?.fileType === "jpg" || singleDoubtz?.fileType === "jpeg" || singleDoubtz?.fileType === "png"? (
    <img src={singleDoubtz?.fileUrl} alt="" />
  ) : (
    <video
      allow="fullscreen"
      frameBorder="0"
      width="100%"
      controls
      controlsList="nodownload"
    >
      <source src={singleDoubtz?.fileUrl} />
    </video>
  )}
</div>

        </div> */}

<div className="doubtResponses bg-white bg-opacity-50 rounded-lg p-4 my-2">
          <p>{singleDoubtz?.title}</p>
          <p>{singleDoubtz?.subject}</p>
          <p>{singleDoubtz?.description}</p>
        </div>

        <div className="flex flex-row justify-center">
        <div className="doubtResponses bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center" >
          <h3 className="text-white font-bold text-center">Fase Aplikasi</h3>
        </div>
        </div>

        <div className="doubtResponses bg-white bg-opacity-50 rounded-lg p-4 my-2 flex justify-center items-center">
        <iframe src="/img/LKPD_Pertemuan_1.pdf" width="60%" height="560"></iframe>
        </div>

        <div className="doubtResponses bg-white bg-opacity-50 rounded-lg p-4 my-2 flex justify-center items-center">
        <iframe src="/img/LKPD_Pertemuan_2.pdf" width="60%" height="560"></iframe>
        </div>

        <div className="doubtResponses bg-white bg-opacity-50 rounded-lg p-4 my-2 flex justify-center items-center">
        <iframe src="/img/LKPD_Pertemuan_3.pdf" width="60%" height="560"></iframe>
        </div>

          <form
            className="responseForm flex flex-row p-4 my-2"
            onSubmit={(e) => handleSubmit(e, "PengetahuanAkhir")}
            >
            <input
              name="desc"
              className="mx-auto border-none w-3/4 px-4"
              value={descPengetahuanAkhir}
              onChange={(e) => setDescPengetahuanAkhir(e.target.value)}
              placeholder="e.g. Kelompok 1 | https://drive.google.com"
              />
            <input type="submit" className="bg-custom-red text-white py-2 px-4 rounded-full border-none max-w-md mx-auto w-1/4" />
          </form>

        {singleDoubtz?.response?.map((data, i) => {
          if (user?.userType === "Admin") {
            return (
              <div
                key={i}
                className="doubtResponses bg-red-100 rounded-lg p-4 my-2"
              >
                <p>Urutan no. : {i + 1}</p>
                <p>{data}</p>
              </div>
            );
          } else {
            return null;
          }
      })}
        
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

export default SingleDoubtz;