import React, { useState } from 'react';
import Modal from 'react-modal';
import './dashboard.css';

function TrainInfoTable({ columns, data }) {
  const [
    isModalOpen, setModalOpen,
  ] = useState(false);

  const [
    selectedData, setSelectedData
  ] = useState(null);

  const openModal = function (data) {
    setSelectedData(data);
    setModalOpen(true);
  }; 

  const closeModal = function () {
    setSelectedData(null);
    setModalOpen(false);
  };

  return (
    <table className="Train-info-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th> 
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({sequenceNo , trainCode, trainName, trainDetails }, index) => (
          <tr key={sequenceNo + trainCode }>
            <td className="Train-info-table">{sequenceNo}</td>
            <td className="Train-info-table">{trainCode}</td>
            <td className="Train-info-table">{trainName}</td>
            <td className="Train-info-table">
              <button onClick={
                function () {
                  console.log(trainDetails);
                  /** cf ) 상위 컴포넌트(TrainTable.js)에서 하위 컴포넌트(Modal)로 Object 타입의 파라미터는 전달할 수 없으므로,
                  (문자열만 전달 가능) Object 타입의 파라미터를 직렬화(JSON.stringify) 하여 전달한다. **/
                  openModal(JSON.stringify(trainDetails));
                }
              }>
                Open Details
              </button>
            </td>
          </tr>
        ))}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          object={selectedData}
        >
          <h2>{ selectedData }</h2>
          <div>
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      </tbody>
    </table>
  );
}

export default TrainInfoTable;