import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainDetailModal from './TrainDetailModal';

function TrainInfoTable({ columns, data, isEditMode }) {

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

  const changeValue = (e) => {
    console.log("changeValue e.target.value : ", e.target.value);
    setTrainInfo (prevState => ({
      ...prevState, 
        trainName: e.target.value
    }));
  };

  if (!isEditMode) {
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
          {/* child(TrainDetailModal) 의 모달 close 기능을 위해,
            i) parent(TrainListModal) 에서 closeModal() 을 정의한 후 child 로 setModalOpen() 어트리뷰트를 보내고 
            ii) child 에서 setModalOpen() 을 받아 모달창의 close 버튼에 false 값으로 바인딩하면
            iii) parent 에서 setModalOpen(false) 를 실행한 closeModal() 어트리뷰트를 child 로 추가로 보내어
            iv) 모달 컴포넌트의 onRequestClose 어트리뷰트에 closeModal() 을 바인딩시킴
          */}
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
        <tbody>
          {data.map(({sequenceNo , trainCode, trainName, trainDetails }, index) => (
            <tr key={sequenceNo + trainCode }>
              <td>{sequenceNo}</td>
              <td>{trainCode}</td>
              <td><input type="text" defaultValue={trainName} onChange={changeValue} /></td>
              <td>
                <Button 
                  variant="info" 
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
        </tbody>
      </Table>
    );
  }
}

export default TrainInfoTable;