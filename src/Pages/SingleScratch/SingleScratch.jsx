import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addResponse, getSingleScratchData } from "../../Redux/scratch/action";

import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

import { Space, Spin } from "antd";
import "./SingleScratch.css";

const SingleScratch = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { singleScratch, load } = useSelector((store) => store.scratch);

  const [desc, setDesc] = useState("");
  const [numberValue, setNumberValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addResponse(singleScratch?._id, desc));
    setNumberValue("");
  };

  useEffect(() => {
    dispatch(getSingleScratchData(params.id));
    setDesc("");
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="singleContent">
        <Header Title={"Kuis"} Address={"Kuis"} />

        <div className="scratchResponses bg-white bg-opacity-50 rounded-lg p-4 my-2">
          <p>{singleScratch?.title}</p>
          <p>{singleScratch?.subject}</p>
          <p>{singleScratch?.description}</p>
        </div>

        {/* <div class="mx-auto w-full max-w-screen-md">
          <div class="relative" style={{ paddingTop: "75%" }}>
            <iframe src="https://quizizz.com/join?gc=79066276" allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>
        </div> */}

        <div class="mx-auto w-full max-w-screen-md">
          <div class="relative" style={{ paddingTop: "75%" }}>
            <iframe src="https://quizizz.com/embed/quiz/662e65b04238ea3b136ab4c1" allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>
        </div>

        <div className="flex flex-row justify-center">
        <div className="scratchResponses bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mt-4" >
          <h3 className="text-white font-bold text-center">Hasil Kuis</h3>
        </div>
        </div>

        {singleScratch?.response?.map((data, i) => {
          return (
            <div key={i} className="scratchResponses">
              <p>Response no. : {i + 1}</p>
              <p>Description : {data}</p>
            </div>
          );
        })}

          <form className="responseForm flex flex-row p-4 my-2" onSubmit={(e) => handleSubmit(e)}>
            <input
              name="desc"
              className="mx-auto border-none w-3/4 px-4"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Tangkapan Layar Nilai"
            />
            <input
              name="numberInput"
              className="mx-auto border-none w-3/4 px-4"
              type="number"
              value={numberValue}
              onChange={(e) => setNumberValue(e.target.value)}
              placeholder="Nilai"
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

export default SingleScratch;
