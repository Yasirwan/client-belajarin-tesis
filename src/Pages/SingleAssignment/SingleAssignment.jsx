import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAssignmentData } from "../../Redux/assignment/action";

import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

import "./SingleAssignment.css";

const SingleAssignment = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { singleAssignment } = useSelector((store) => store.assignment);

  const [desc, setDesc] = useState("");

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
    dispatch(getSingleAssignmentData(params.id));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="singleAssignment">
        <Header Title={"Assignment"} Address={"Assignments"} />

        <div className="singleAssignmentData">
          <div className="fileContainer">
            {singleAssignment?.fileType == "jpg" ||
            singleAssignment?.fileType == "jpeg"||
            singleAssignment?.fileType == "png" ? (
              <img src={singleAssignment.fileUrl} alt="" />
            ) : (
              <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                controls
                controlsList="nodownload"
              >
                <source src={singleAssignment.fileUrl} />
              </video>
            )}
          </div>
        </div>

        <div className="singleAssignmentDetails">
          <p>{singleAssignment?.title}</p>
          <p>{singleAssignment?.subject}</p>
          <p>{singleAssignment?.type}</p>
        </div>

        <div className="assignmentResponses bg-red-900 rounded-lg p-4 my-2">
          <h3 className="text-white">Fase Aplikasi</h3>
        </div>
        
        {singleAssignment?.response?.map((data, i) => {
          return (
            <div key={i} className="assignmentResponses">
              <p>Absen no. : {i + 1}</p>
              <p>{data}</p>
            </div>
          );
        })}

        <div className="assignmentResponses">
          <p>Form pengumpulan</p>
          <form className="responseForm" onSubmit={(e) => handleSubmit(e)}>
            <input
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Link Google Drive"
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </Navbar>
  );
};

export default SingleAssignment;
