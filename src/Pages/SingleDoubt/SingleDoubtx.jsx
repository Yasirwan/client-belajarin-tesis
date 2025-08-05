import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addResponse, getSingleDoubtxData } from "../../Redux/doubt/actionx";

import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

import { Space, Spin } from "antd";
import "./SingleDoubt.css";

const SingleDoubtx = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { singleDoubtx, load } = useSelector((store) => store.doubtx);

  const [descPengetahuanAwal, setDescPengetahuanAwal] = useState("");
  const [descFasePenstrukturan, setDescFasePenstrukturan] = useState("");
  const [descPengetahuanAkhir, setDescPengetahuanAkhir] = useState("");

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === "PengetahuanAwal") {
      dispatch(addResponse(singleDoubtx?._id, descPengetahuanAwal));
      setDescPengetahuanAwal("");
    } else if (type === "FasePenstrukturan") {
      dispatch(addResponse(singleDoubtx?._id, descFasePenstrukturan));
      setDescFasePenstrukturan("");
    } else if (type === "PengetahuanAkhir") {
      dispatch(addResponse(singleDoubtx?._id, descPengetahuanAkhir));
      setDescPengetahuanAkhir("");
    }
  };

  useEffect(() => {
    dispatch(getSingleDoubtxData(params.id));
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
        <Header Title={"Pengetahuan Akhir"} Address={"Akhir"} />
        {/* <div className="singleContentData">
        <div className="fileContainer">
  {singleDoubtx?.fileType === "jpg" || singleDoubtx?.fileType === "jpeg" || singleDoubtx?.fileType === "png" ? (
    <img src={singleDoubtx?.fileUrl} alt="" />
  ) : (
    <video
      allow="fullscreen"
      frameBorder="0"
      width="100%"
      controls
      controlsList="nodownload"
    >
      <source src={singleDoubtx?.fileUrl} />
    </video>
  )}
</div>

        </div> */}

        <div className="doubtResponses">
          <p>{singleDoubtx?.title}</p>
          <p>{singleDoubtx?.subject}</p>
          <p>{singleDoubtx?.description}</p>
        </div>

        <div className="flex flex-row justify-center">
        <div className="doubtResponses bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center" >
          <h3 className="text-white font-bold text-center">Pengetahuan Akhir</h3>
        </div>
        </div>

        <div className="doubtResponses bg-white bg-opacity-50 rounded-lg p-4 my-2">
          <h3 className="text-black">Setelah melakukan diskusi dan menggali informasi tambahan bersama kelompok, silakan rumuskan kesimpulan berdasarkan pemahaman kalian terhadap materi yang telah dipelajari</h3>
        </div>

        {singleDoubtx?.response?.map((data, i) => {
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
            className="responseForm flex flex-row p-4 my-2"
            onSubmit={(e) => handleSubmit(e, "PengetahuanAkhir")}
          >
  <textarea
              name="desc"
              className="mx-auto border-none w-3/4 px-4 rounded-full"
              value={descPengetahuanAkhir}
              onChange={(e) => setDescPengetahuanAkhir(e.target.value)}
              placeholder="contoh Kelompok A | Berdasarkan hasil diskusi, kami menyimpulkan bahwa algoritma adalah langkah-langkah logis dan sistematis yang digunakan untuk menyelesaikan suatu masalah ..."
              ></textarea>
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

export default SingleDoubtx;