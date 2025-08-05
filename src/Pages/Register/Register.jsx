import { message, Space, Spin } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentRegister } from "../../Redux/auth/action";
import { useNavigate } from "react-router-dom";
import coverImage from '/img/cover.png';
import "./Register.css";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        studentClass: "",
    });

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        dispatch(studentRegister(formData)).then((res) => {
            if (res.message === "Error") {
                setLoading(false);
                messageApi.open({
                    type: "info",
                    content: "Error",
                    duration: 3,
                });
            } else if (res.message === "User already registered") {
                setLoading(false);
                messageApi.open({
                    type: "info",
                    content: "User already registered",
                    duration: 3,
                });
            } else {
                setLoading(false);
                messageApi.open({
                    type: "info",
                    content: res.message,
                    duration: 3,
                });
                navigate("/login");
            }
        }
        );
    };

    return (
        <div className="login">
        <br />
        <div className="loginContainer">
          <div className="loginImage">
            <img src={coverImage}/>
          </div>
          <div className="loginDetail">
            <div>
            <h3 className="text-gray-700 text-xl font-medium">BelajarIn</h3>
            </div>
  
            <div>
              <form onSubmit={handleFormSubmit}>
              <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Enter full name"
                  className="p-2 my-2"
                />
                <input
                  required
                  name="email"
                  value={formData.email}
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
                <input
                  required
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Enter class"
                  className="p-2 my-2"
                />
                <div style={{ textAlign: 'center' }}>
                  <button type="submit" className="p-2 my-2" style={{ backgroundColor: '#920000' }}>Sign up</button>
                  <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'normal' }}>Or</h3>
                  <div className="flex flex-row">
                  <button onClick={() => navigate('/login')} className="p-2 my-2" style={{ backgroundColor: 'white',color: '#920000', marginRight: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>Log in</button>
                  <button onClick={() => navigate('/')} className="p-2 my-2" style={{ backgroundColor: 'white',color: '#920000',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>Home</button>
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
}

export default Register;