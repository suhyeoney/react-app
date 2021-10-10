import React, { useState } from 'react';
import Modal from 'react-modal';

function TrainInfoTable({ columns, data }) {
  const [
    isModalOpen, setModalOpen,
  ] = useState(false);

  const [
    selectedData, setSelectedData
  ] = useState(null);

  const expandModal = function (data) {
    setSelectedData(data);
    setModalOpen(true);
  };

  const closeModal = function () {
    setSelectedData(null);
    setModalOpen(false);
  };

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
        {data.map(({sequenceNo , trainCode, trainName, trainDescription }, index) => (
          <tr key={sequenceNo + trainCode + trainName}>
            <td>{sequenceNo}</td>
            <td>{trainCode}</td>
            <td>{trainName}</td>
            <td>
              {/* <button onClick={
                function() {
                  setModalOpen(true);
                }
              }>Open Detail Modal</button>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={
                  function() {
                    setModalOpen(false);
                  }
                }
              >
                {trainDescription}
                <div>
                  <button onClick={
                    function() {
                      setModalOpen(false);
                    }
                  }>Close</button>
                </div>
              </Modal> */}
              
              <button onClick={
                function () {
                  console.log(trainDescription);
                  expandModal(trainDescription);
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