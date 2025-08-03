import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAdmin, editAdmin } from "../../Redux/admin/action";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Modal, message, Popconfirm, Button } from "antd";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { FiEye, FiEyeOff  } from "react-icons/fi";


const TableRow = ({ data }) => {
  const path = window.location.pathname;
  const dispatch = useDispatch();

  const initialAdminData = {
    name: data.name,
    access: data.access,
  };
  const [adminFormData, setAdminFormData] = useState(initialAdminData);
  const handleAdminDataChange = (e) => {
    setAdminFormData({ ...adminFormData, [e.target.name]: e.target.value });
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const cancel = () => {
    message.error("Click on No");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editAdmin(data._id, adminFormData));
    setAdminFormData(initialAdminData);
    handleCancel();
  };

  const handleDelete = (id) => {
    if (path === "/admin") {
      dispatch(deleteAdmin(id));
    }
  };

  return (
    <tr className="tableRow">
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td style={{ color: data.access == "true" ? "Green" : "Red" }}>
        {data.access == "true" ? <FiEye /> : <FiEyeOff  />}
      </td>
      <td onClick={showModal}><FiEdit2 className="text-yellow-500"/></td>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="Name"
            name="name"
            value={adminFormData.name}
            onChange={(e) => handleAdminDataChange(e)}
          />
          <p>
            Access : {adminFormData.access == "true" ? "Allowed" : "Disallowed"}
          </p>
          <select name="access" onChange={(e) => handleAdminDataChange(e)}>
            <option value="">Toggle access</option>
            <option value={"true"}>Allow</option>
            <option value={"false"}>Disallow</option>
          </select>
          <input type="submit" value="Edit" />
        </form>
      </Modal>
      <Popconfirm
        title="Delete the admin"
        description="Are you sure to delete this admin?"
        onConfirm={() => handleDelete(data._id)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <td><FiTrash2 className="text-red-500"/></td>
      </Popconfirm>
    </tr>
  );
};
export default TableRow;
