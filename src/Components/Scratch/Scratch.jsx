import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteScratch } from "../../Redux/scratch/action";
import "./Scratch.css";
import startImage from '/img/start.png';
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { FiEye  } from "react-icons/fi";
import { IoPlayOutline } from "react-icons/io5";


const Scratch = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user: { userType },
  } = useSelector((store) => store.auth.data);

  const deleteScratchFunc = (id) => {
    dispatch(deleteScratch(id));
  };

  const handleClick = (id) => {
    return navigate(`/scratch/${id}`);
  };

  return (
    <div className="scratchDiv">
      <div>
        <img src={data.thumbnail} alt="thumbnail" />
      </div>
      <div class="flex items-center justify-center flex-col">
      <div class="flex items-center justify-center flex-col text-center">
          <p>{data.title}</p>
          <p>{data.subject}</p>
        </div>
        <div class="flex items-center justify-center flex-col">
          {userType == "Admin"? (
            <>
            <button className="deleteScratch bg-white shadow-lg w-full rounded-full px-4 py-2 flex items-center justify-center cursor-pointer text-black hover:transition hover:duration-150 hover:transform hover:translate-y-1 mb-2" onClick={() => handleClick(data._id)}> <IoPlayOutline className="text-green-500 mr-2"/>Start</button>
            <button
              className="deleteScratch bg-white shadow-lg w-full rounded-full px-4 py-2 flex items-center justify-center cursor-pointer text-black hover:transition hover:duration-150 hover:transform hover:translate-y-1"
              onClick={() => deleteScratchFunc(data._id)}> <FiTrash2 className="text-red-500 mr-2"/> Delete</button>
            </>
          ) : (
            <button className="deleteScratch bg-white shadow-lg w-full rounded-full px-4 py-2 flex items-center justify-center cursor-pointer text-black hover:transition hover:duration-150 hover:transform hover:translate-y-1 mb-2" onClick={() => handleClick(data._id)}> <IoPlayOutline className="text-green-500 mr-2"/>Start</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scratch;
