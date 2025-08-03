import React from "react";

const handleDetail = (data) => {
  console.log("Detail clicked", data);
};

const LeaderboardRow = ({ data }) => {

  return (
    <tr className="tableRow">
      <td>{data.testId.title}</td>
      <td>{data.testId.createdAt}</td>
      <td>{data.score}</td>
      <td>
        <button onClick={() => handleDetail(data)} className="btn-primary">Detail</button>
      </td>
    </tr>
  );
};
export default LeaderboardRow;
