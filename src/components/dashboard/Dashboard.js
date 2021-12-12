import React, { Component } from 'react';
import TrainListTable from './TrainListTable';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            trainListData: [],
            columnListData: [],
            tableName: 'RAIL_MGMT_TRAIN_INFO'
        };
    }

    componentDidMount() {
        fetch('/api/getAllTrainsInfo')
        .then(res => res.json())
        .then(data => this.setState({
           trainListData: data
        }));
    }

    handleEditModeFlag(type) {
        this.setState(prevState => ({
            isEditMode: !prevState.isEditMode
        }));
    }

    render() {

        const trainList = this.state.trainListData.map(function (element, index) {
            let obj = {};
            let subObj = {};
            obj.sequenceNo = index + 1;
            obj.trainCode = element.TRAIN_CD;
            obj.trainName = element.TRAIN_NM;
            subObj.trainMaxSpeed = element.MAX_SPEED_1KMH;
            subObj.trainMinCars = element.MIN_CARS;
            subObj.trainMaxCars = element.MAX_CARS;
            obj.trainDetails = subObj;
            return obj;
        });

        const columnList = trainList.length > 0 ? Object.getOwnPropertyNames(trainList[0]) : [];

        const isEditMode = this.state.isEditMode;
        let table;
        if(isEditMode) {
            table = <span className="float-right" ><Button variant="success" onClick={() => this.handleEditModeFlag() }>Save</Button>
            <Button variant="danger" onClick={() => this.handleEditModeFlag('cancel') }>Cancel</Button></span>;
        } else {
            table = <span className="float-right"><Button variant="dark" onClick={() => this.handleEditModeFlag() }>Edit</Button></span>;
        }

        return (
            <div>
                <header>
                    <div>
                        <h2 className="float-left">Train Info Current Status</h2>
                    </div>
                    { table }
                </header>
                <TrainListTable columns={ columnList } data={ trainList } isEditMode={ isEditMode }/>
            </div>
        );
    }
  }
  
  export default Dashboard;