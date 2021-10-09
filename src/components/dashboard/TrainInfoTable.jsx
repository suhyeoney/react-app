import React from 'react';

function TrainInfoTable({ columns, data }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({sequenceNo , trainCode, trainName }) => (
          <tr key={sequenceNo + trainCode + trainName}>
            <td>{sequenceNo}</td>
            <td>{trainCode}</td>
            <td>{trainName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TrainInfoTable;