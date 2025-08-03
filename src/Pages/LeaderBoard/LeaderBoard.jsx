import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTestResult } from "../../Redux/testresult/action";

import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import LeaderboardRow from "../../Components/Table/LeaderboardRow";

import "./LeaderBoard.css";

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let decodedToken = null

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);

  const { testResults } = useSelector((store) => store.testResult);

  const { token } = useSelector((store) => store.auth.data);

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  if (!token) {
    return navigate("/");
  }

  decodedToken = decodeToken(token);

  const data = {
    token,
    query: {
      studentId: decodedToken.userId
    }
  };

  useEffect(() => {
    dispatch(getTestResult(data));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="leaderboard">
        <Header Title={"Grade"} Address={"Grade"} />
      </div>

      <div className="leaderboardData">
        <section className="tableBody">
          <table>
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Timestamp</th>
                <th>Score</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((data, i) => (
                <LeaderboardRow key={i} data={data} />
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Navbar>
  );
};

export default LeaderBoard;
