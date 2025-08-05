import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentData, studentRegister } from "../../Redux/student/action";

import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Sidebar/Navbar";
import AddIcon from "../../Components/AddIcon/AddIcon";
import StudentRow from "../../Components/Table/StudentRow";

import { Button, Drawer, Space, Spin, message } from "antd";
import "./Student.css";

const Student = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { students, load } = useSelector((store) => store.student);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const initialFormData = {
    name: "",
    email: "",
    password: "",
    class: "",
  };
  const [FormData, setFormData] = useState(initialFormData);
  const handleInputChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (FormData.class == "") {
      return messageApi.open({
        type: "info",
        content: "Please select class",
        duration: 3,
      });
    }
    setLoading(true);
    dispatch(studentRegister(FormData))
      .then((res) => {
        console.log(res);
        if (res.msg === "User already registered") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "User already registered",
            duration: 3,
          });
        } else if (res.msg === "Student Registration failed") {
          setLoading(false);
          messageApi.open({
            type: "error",
            content: "Student Registration failed",
            duration: 3,
          });
        } else {
          setLoading(false);
          setFormData(initialFormData);
          onClose();
          messageApi.open({
            type: "success",
            content: "Student Registered Successfully",
            duration: 3,
          });
          messageApi.open({
            type: "success",
            content: "Password sent over mail.",
            duration: 3,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getStudentData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="admin">
        <Header Title={"Data Siswa"} Address={"Siswa"} />
        <div className="adminData">
          <section className="tableBody">
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Kelas</th>
                  <th>Akses</th>
                  {/* <th>Ubah</th>
                  <th>Hapus</th> */}
                </tr>
              </thead>
              <tbody>
                {students?.map((data, i) => {
                  return <StudentRow data={data} key={i} />;
                })}
              </tbody>
            </table>
          </section>
        </div>
        <div onClick={showDrawer}>
          <AddIcon />
        </div>
        <Drawer
          title="Buat Akun Baru"
          width={720}
          onClose={onClose}
          open={open}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
            </Space>
          }
        >
          {contextHolder}
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              required
              name="name"
              type="text"
              value={FormData.name}
              placeholder="Masukkan Nama"
              onChange={(e) => handleInputChange(e)}
            />
            <input
              required
              name="email"
              type="email"
              value={FormData.email}
              placeholder="Masukkan Email"
              onChange={(e) => handleInputChange(e)}
            />
            <input
              required
              name="password"
              type="password"
              value={FormData.password}
              placeholder="Masukkan Kata Sandi"
              onChange={(e) => handleInputChange(e)}
            />
            <select name="class" onChange={(e) => handleInputChange(e)}>
              <option value="">Pilih Kelas</option>
              <option value={5}>XII Oracle 1</option>
              <option value={6}>XII Oracle 2</option>
              <option value={7}>XII Oracle 3</option>
              <option value={8}>XII Oracle 4</option>
              <option value={9}>XII Oracle 5</option>
              <option value={10}>XII Oracle 6</option>
            </select>
            <input type="submit" value="Tambah" />
          </form>
          {loading ? (
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
        </Drawer>
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

export default Student;
