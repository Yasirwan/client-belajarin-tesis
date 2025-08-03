import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTutor, editTutor } from "../../Redux/tutor/action";

import { FiEye, FiEyeOff  } from "react-icons/fi";
import { Modal, message, Popconfirm, Button } from "antd";
import deleteImage from '/img/deletec.png';
import editImage from '/img/edit.png';
import { FiTrash2 } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";

const TutorRow = ({ data }) => {
  const dispatch = useDispatch();

  const initialAdminData = {
    name: data.name,
    access: data.access,
    subject: data.subject,
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
    dispatch(editTutor(data._id, adminFormData));
    setAdminFormData(initialAdminData);
    handleCancel();
  };
  
  const handleDelete = (id) => {
    dispatch(deleteTutor(id));
  };

  return (
    <tr className="tableRow">
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.subject}</td>
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
          <select name="subject" onChange={(e) => handleAdminDataChange(e)}>
            <option value="">Choose Subject</option>
            <option value="Algoritma">Algoritma</option>
              <option value="Naratif">Naratif</option>
              <option value="Pseudocode">Pseudocode</option>
              <option value="Flowchart">Flowchart</option>
              <option value="Pemrograman, Tipe data, Variabel dan Operator">Pemrograman, Tipe data, Variabel dan Operator</option>
              <option value="Percabangan dan Perulangan">Percabangan dan Perulangan</option>
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
export default TutorRow;
