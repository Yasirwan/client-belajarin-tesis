import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoubtz, resolveDoubtz } from "../../Redux/doubt/actionz";
import viewImage from '/img/view.png';
import deleteImage from '/img/deletec.png';
import { FiTrash2 } from "react-icons/fi";
import { FiEye  } from "react-icons/fi";

import "./DoubtBox.css";

const DoubtzBox = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth.data);

  const handleDelete = (id) => {
    dispatch(deleteDoubtz(id));
  };
  const handleClick = (id) => {
    return navigate(`/doubtz/${id}`);
  };
  const handleResolve = (id) => {
    dispatch(resolveDoubtz(id));
  };
  
  return (
    <div className="contentDiv">
      <div>
        <img src={data.thumbnailUrl} alt="thumbnail" />
      </div>
      <div>
      <div class="flex items-center justify-center flex-col">
          <p>{data.title}</p>
          <p>{data.description}</p>
          <p>{data.subject}</p>
        </div>
        <div class="flex items-center justify-center flex-col">
          {user?.userType == "Admin" ? (
            <div className="contentOption">
              <button class="bg-white shadow-lg w-full rounded-full px-4 py-2 flex items-center justify-center cursor-pointer text-black hover:transition hover:duration-150 hover:transform hover:translate-y-1" onClick={() => handleClick(data._id)}><FiEye className="text-yellow-500 mr-2"/> View</button>
              <button class="bg-white shadow-lg w-full rounded-full px-4 py-2 flex items-center justify-center cursor-pointer text-black hover:transition hover:duration-150 hover:transform hover:translate-y-1" onClick={() => handleDelete(data._id)}><FiTrash2 className="text-red-500 mr-2"/> Delete</button>
            </div>
          ) : (
            <div className="contentOption">
              <p>{data.type}</p>
              <button class="bg-white shadow-lg w-full rounded-full px-4 py-2 flex items-center justify-center cursor-pointer text-black hover:transition hover:duration-150 hover:transform hover:translate-y-1" onClick={() => handleClick(data._id)}><FiEye className="text-yellow-500 mr-2"/> View</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoubtzBox;
