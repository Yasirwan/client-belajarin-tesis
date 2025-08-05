import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, studentLogin, tutorLogin } from "../../Redux/auth/action";
import coverImage from '/img/cover.png';

import { message, Space, Spin } from "antd";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);

  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.type === "") {
      return messageApi.open({
        type: "error",
        content: "Please select user type.",
        duration: 3,
      });
    }
    setLoading(true);
    if (formData.type === "admin") {
      dispatch(adminLogin(formData)).then((res) => {
        if (res.message === "Wrong credentials") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Wrong credentials !",
            duration: 3,
          });
        } else if (res.message === "Access Denied") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Your access has been revoked by the admin !",
            duration: 3,
          });
        } else if (res.message === "Error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
    if (formData.type === "tutor") {
      dispatch(tutorLogin(formData)).then((res) => {
        if (res.message === "Wrong credentials") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Wrong credentials !",
            duration: 3,
          });
        } else if (res.message === "Access Denied") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Your access has been revoked by the admin !",
            duration: 3,
          });
        } else if (res.message === "error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
    if (formData.type === "student") {
      dispatch(studentLogin(formData)).then((res) => {
        if (res.message === "Wrong credentials") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Wrong credentials !",
            duration: 3,
          });
        } else if (res.message === "Access Denied") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Your access has been revoked by the admin !",
            duration: 3,
          });
        } else if (res.message === "error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
  };

  if (auth.data.isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="login">
      <br />
      <div className="loginContainer">
        <div className="loginImage w-2/5">
          <img src={coverImage} className="w-4/5 mx-auto" />
        </div>
        <div className="loginDetail">
          <div>
            <h3 className="text-gray-700 text-xl font-medium">BelajarIn</h3>
          </div>

          <div>
            <form onSubmit={handleFormSubmit}>
              <input
                required
                name="email"
                value={formData.id}
                onChange={handleFormChange}
                type="email"
                placeholder="Masukkan email"
                className="p-2 my-2"
              />
              <input
                required
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type="password"
                placeholder="Masukkan Kata Sandi"
                className="p-2 my-2"
              />
              <select
                name="type"
                onChange={handleFormChange}
                className="p-2 my-2"
              >
                <option value="">Pilih Tipe Pengguna</option>
                <option value="admin">Guru</option>
                <option value="student">Siswa</option>
                {/* <option value="tutor">Guest</option> */}
              </select>
              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="p-2 my-2">Masuk</button>
                <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'normal' }}>atau</h3>
                <div className="flex flex-row">
                  <button onClick={() => navigate('/register')} className="p-2 my-2" style={{ backgroundColor: 'white', color: '#3B215E', marginRight: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>Daftar</button>
                  <button onClick={() => navigate('/')} className="p-2 my-2" style={{ backgroundColor: 'white', color: '#3B215E', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>Beranda</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {contextHolder}
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
    </div>
  );
};

export default Login;
