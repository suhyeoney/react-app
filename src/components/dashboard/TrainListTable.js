import React, { useState } from 'react';
import Modal from 'react-modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function TrainInfoTable({ columns, data, isEditMode }) {

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

  console.log(isEditMode);

  return (
    <Table striped bordered hover variant="dark" responsive="sm">
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
            <td>{sequenceNo}</td>
            <td>{trainCode}</td>
            <td>{trainName}</td>
            <td>
              <Button 
                variant="info" 
                disabled={isEditMode}
                onClick={
                  function () {
                    console.log(trainDetails);
                    let jsonObj = JSON.parse(JSON.stringify(trainDetails));
                    /** cf ) 상위 컴포넌트(TrainTable.js)에서 하위 컴포넌트(Modal)로 Object 타입의 파라미터는 전달할 수 없으므로,
                    (문자열만 전달 가능) Object 타입의 파라미터를 직렬화(JSON.stringify), json화(JSON.parse)하여 임시 변수에 저장 후 이 객체의 프로퍼티 string 으로 전달한다. **/
                    openModal(jsonObj.trainMaxSpeed);
                  }
              }>
                Open Details
              </Button>
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
            <Button onClick={() => closeModal()}>Close</Button>
          </div>
        </Modal>
      </tbody>
    </Table>
  );
}

export default TrainInfoTable;