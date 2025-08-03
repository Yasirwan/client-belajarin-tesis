import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTest } from "../../Redux/test/action";
import viewImage from '/img/start.png';
import deleteImage from '/img/deletec.png';
import { FiTrash2 } from "react-icons/fi";
import { IoPlayOutline } from "react-icons/io5";

import "./TestBox.css";

const TestBox = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth.data);

  const handleDelete = (id) => {
    dispatch(deleteTest(id));
  };
  const handleClick = (id) => {
    return navigate(`/test/${id}`);
  };

  return (
    <div className="testDiv">
      <div>
        <img src={data.thumbnailUrl} alt="thumbnail" />
      </div>
      <div>
        <div>
          <p>{data.title}</p>
          <p>{data.class}</p>
        </div>
        <div>
          {user.userType == "Admin" ? (
            <div className="testOption">
              <button class="bg-white shadow-lg w-2/5 rounded-full px-4 py-2 mb-2 flex items-center justify-center cursor-pointer text-black" onClick={() => handleClick(data._id)}><IoPlayOutline className="text-green-500 mr-2"/>Start</button>
              <button class="bg-white shadow-lg w-2/5 rounded-full px-4 py-2 flex items-center justify-center cursor-pointer text-black" onClick={() => handleDelete(data._id)}><FiTrash2 className="text-red-500 mr-2"/>Delete</button>
            </div>
          ) : (
            <div className="testOption">
              <button class="bg-white shadow-lg w-2/5 rounded-full px-4 py-2 mb-2 flex items-center justify-center cursor-pointer text-black" onClick={() => handleClick(data._id)}><IoPlayOutline className="text-green-500 mr-2"/>Start</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestBox;
