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
        // this.handleEditModeFlag = this.handleEditModeFlag.bind(this);
        // this.editData = this.editData.bind(this);
    }

    componentDidMount() {
        fetch('/api/getAllTrainsInfo')
        .then(res => res.json())
        .then(data => this.setState({
           trainListData: data
        }));

        // fetch('/getColumnNames?tableName=' + this.state.tableName)
        // .then(res => res.json())
        // .then(data => this.setState({
        //     columnListData: data
        // }));
    }

    handleEditModeFlag() {
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
            <Button variant="danger" onClick={() => this.handleEditModeFlag() }>Cancel</Button></span>;
        } else {
            table = <span className="float-right"><Button variant="dark" onClick={() => this.handleEditModeFlag() }>Edit</Button></span>;
        }


        // const trainList = trainListData.map((element, index) =>
        //     <li key={ index }>
        //         { index + 1 } : { element.trainCode }
        //     </li>
        // );
        // const columnList = this.state.columnListData.filter(function (element) { 
        //     return element.COLUMN_NAME === 'TRAIN_CD' || element.COLUMN_NAME === 'TRAIN_NM';
        // }).map(function (element) {
        //     if(element.COLUMN_NAME === 'TRAIN_CD') return 'Train Code';
        //     else return 'Train Name';
        // });
        // columnList.unshift('No.');
        // console.log(columnList);
        // console.log(trainList);

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