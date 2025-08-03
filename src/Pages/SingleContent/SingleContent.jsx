import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleContentData } from "../../Redux/content/action";

import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

import "./SingleContent.css";

const SingleContent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { singleContent } = useSelector((store) => store.content);

  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  useEffect(() => {
    dispatch(getSingleContentData(params.id));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="singleContent">
        <Header Title={"Video"} Address={"Video"} />

        {/* <div className="singleContentData">
          <div className="fileContainer">
            {singleContent?.fileType == "jpg" ||
            singleContent?.fileType == "jpeg" ||
            singleContent?.fileType == "png"? (
              <img src={singleContent.fileUrl} alt="" />
            ) : (
              <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                controls
                controlsList="nodownload"
              >
                <source src={singleContent.fileUrl} />
              </video>
            )}
          </div>
        </div> */}

        <div className="singleContentDetails">
          <p>{singleContent?.title}</p>
          <p>{singleContent?.class}</p>
          <p>{singleContent?.subject}</p>
        </div>

        <div class="mx-auto w-full max-w-screen-md">

        <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Algoritma</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/fLqHSiJMMyI"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

        <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Naratif dan Pseudocode</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/Yw6YscAMe3U"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

        <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Flowchart</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/1S35wmupqn4"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Tipe Data</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/zbSzPA9xTLo"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Variabel</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/0sFh-rALd2Q"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Operator</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/8DL_Bax4mro"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Percabangan If</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/G-c0KnAgucc"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Percabangan If-Else</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/VSL19lCLqHk"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Percabangan If-Else-If</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/_lxIFFLFdBk"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Percabangan Nested If</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/5jbYsYj1-v0"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Percabangan Switch Case</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/5lO9YdC48uw"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Perulangan For</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/hVzmJwyMH2Q"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Perulangan While</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/ctxtCv7plVc"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

          <div className="flex flex-row justify-center">
        <div className="singleContentDetails bg-custom-red rounded-full p-4 my-2 w-2/6 d-flex justify-content-center mb-4" >
          <h3 className="text-white font-bold text-center">Perulangan Do-While</h3>
        </div>
        </div>

        <div class="relative" style={{ paddingTop: "75%", marginBottom: "20px"}}>
            <iframe src="https://www.youtube.com/embed/kH8bkgogfD0"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowtransparency="true" className="absolute inset-0 w-full h-full" frameBorder="0" scrolling="yes" allowFullScreen></iframe>
          </div>

        </div>


      </div>
    </Navbar>
  );
};

export default SingleContent;
