import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAssignment } from "../../Redux/assignment/action";
import viewImage from '/img/view.png';
import deleteImage from '/img/deletec.png';

import "./AssignmentBox.css";

const AssignmentBox = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth.data);

  const handleDelete = (id) => {
    dispatch(deleteAssignment(id));
  };
  const handleClick = (id) => {
    return navigate(`/assignment/${id}`);
  };

  return (
    <div className="assignmentDiv">
      <div>
        <img src={data.thumbnailUrl} alt="thumbnail" />
      </div>
      <div>
        <div>
          <p>{data.title}</p>
          <p>{data.subject}</p>
          <p>{data.type}</p>
        </div>
        <div>
          {user.userType == "Admin" || user.userType == "Tutor" ? (
            <div className="assignmentOption">
              <button onClick={() => handleClick(data._id)}><img src={viewImage}/> </button>
              <button onClick={() => handleDelete(data._id)}><img src={deleteImage}/></button>
            </div>
          ) : (
            <div className="assignmentOption">
              <p>{data.type}</p>
              <button onClick={() => handleClick(data._id)}><img src={viewImage}/> </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentBox;
