import React from "react";
import TableRow from "./TableRow";
import "./Table.css";

const Table = ({ Data }) => {
  return (
    <section className="tableBody">
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Akses</th>
            <th>Ubah</th>
            <th>Hapus</th>
          </tr>
        </thead>
        <tbody>
          {Data?.map((data, i) => {
            return <TableRow data={data} key={i} />;
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
