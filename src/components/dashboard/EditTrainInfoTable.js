import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainDetailModal from './TrainDetailModal';

function EditTrainInfoTable({ data, isDetailModalBtnDisabled, setTrainDataList }) {

  const [ isModalOpen, setModalOpen ] = useState(false);

  const [ trainInfo, setTrainInfo ] = useState({
    trainCode: null,
    trainName: null,
    trainDetails: {
      trainMaxSpeed: null,
      trainMinCars:  null,
      trainMaxCars: null
    }
  });
  
  const openModal = (data) => {
    setTrainInfo (prevState => ({
      ...prevState, trainDetails: {
        ...prevState.trainDetails,
        trainMaxSpeed: data.trainMaxSpeed,
        trainMinCars: data.trainMinCars,
        trainMaxCars: data.trainMaxCars
      }
    }));
    setModalOpen(true);
  }; 

  const closeModal = () => {
    setModalOpen(false);
  };

  const checkIsEmpty = (value) => {
		if (value === null || value === 'undefined') return '-';
		else return value;
	};

  const convertDateTimeFormat = (value) => {
    return moment(value, moment.ISO_8601).format().replace("T", " ").replace("+09:00", "");
  };

  return (
    <Table striped bordered hover variant="dark" responsive="sm">
      <thead>
        <tr>
          <th>Sequence No.</th>
          <th>Train Code</th>
          <th>Train Name</th>
          <th>Created Date</th> 
          <th>Modified Date</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({sequenceNo , trainCode, trainName, createdDate, modifiedDate, trainDetails }, index) => (
          <tr key={sequenceNo + trainCode }>
            <td>{checkIsEmpty(sequenceNo)}</td>
            <td>{checkIsEmpty(trainCode)}</td>
            <td><input type="text" defaultValue={trainName} onChange={setTrainDataList(index, 'TRAIN_NM')} /></td>
            <td>{checkIsEmpty(convertDateTimeFormat(createdDate))}</td>
            <td>{checkIsEmpty(convertDateTimeFormat(modifiedDate))}</td>
            <td>
              <Button 
                variant="info" 
                disabled={isDetailModalBtnDisabled}
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
        <TrainDetailModal data={trainInfo.trainDetails} modalOpen={isModalOpen} setModalOpen={setModalOpen} closeModal={closeModal} />
      </tbody>
    </Table>
  );
}

export default EditTrainInfoTable;