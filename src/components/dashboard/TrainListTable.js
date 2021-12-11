import React, { useState } from 'react';
import Modal from 'react-modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function TrainInfoTable({ columns, data, isEditMode }) {

  const initTrainDetails = { trainMaxSpeed: null, trainMinCars:  null, trainMaxCars: null };

  const [
    isModalOpen, setModalOpen,
  ] = useState(false);

  const [ trainDetails, setTrainDetails ] = useState(initTrainDetails);

  const openModal = (data) => {
    setTrainDetails(prevState => ({
      ...prevState,
      trainMaxSpeed: data.trainMaxSpeed,
      trainMinCars: data.trainMinCars,
      trainMaxCars: data.trainMaxCars
    }));
    setModalOpen(true);
  }; 

  const closeModal = () => {
    setTrainDetails(initTrainDetails);
    setModalOpen(false);
  };

  const checkIsNull = (value) => {
    if (value === null || value === 'undefined') return '-';
    else return value;
  };

  // console.log(isEditMode);
  if(!isEditMode) {
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
                  onClick={ () => {
                      const jsonObj = trainDetails;    
                      openModal(jsonObj);
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
            shouldCloseOnOverlayClick={false}
          >
            <Table striped bordered  hover responsive="sm">
                <thead>
                  <tr>
                    <th>Train Max Speed</th>
                    <th>Number of Minimum Cars</th>
                    <th>Number of Maximum Cars</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ checkIsNull(trainDetails.trainMaxSpeed) } km/h</td>
                    <td>{ checkIsNull(trainDetails.trainMinCars) } cars</td>
                    <td>{ checkIsNull(trainDetails.trainMaxCars) } cars</td>
                  </tr>
                </tbody>
            </Table>
            <div>
              <Button onClick={() => closeModal()}>Close</Button>
            </div>
          </Modal>
        </tbody>
      </Table>
    );
  } else {
    return (
      <Table striped bordered hover variant="dark" responsive="sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th> 
            ))}
          </tr>
        </thead>
        <tbody >
          {data.map(({sequenceNo , trainCode, trainName, trainDetails }, index) => (
            <tr key={sequenceNo + trainCode }>
              <td>{sequenceNo}</td>
              <td>{trainCode}</td>
              <td>{trainName}</td>
              <td>
                <Button 
                  variant="info" 
                  disabled={isEditMode}
                  onClick={ () => {
                      const jsonObj = trainDetails;    
                      openModal(jsonObj);
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
            shouldCloseOnOverlayClick={false}
          >
            <Table striped bordered  hover responsive="sm">
                <thead>
                  <tr>
                    <th>Train Max Speed</th>
                    <th>Number of Minimum Cars</th>
                    <th>Number of Maximum Cars</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ checkIsNull(trainDetails.trainMaxSpeed) } km/h</td>
                    <td>{ checkIsNull(trainDetails.trainMinCars) } cars</td>
                    <td>{ checkIsNull(trainDetails.trainMaxCars) } cars</td>
                  </tr>
                </tbody>
            </Table>
            <div>
              <Button onClick={() => closeModal()}>Close</Button>
            </div>
          </Modal>
        </tbody>
      </Table>
    );
  }
}

export default TrainInfoTable;