import React from "react";

const StudentRow = ({ data }) => {

  return (
    <tr className="tableRow">
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.class}</td>
      <td>{data.access}</td>
    </tr>
  );
};
export default StudentRow;
