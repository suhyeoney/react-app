import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainInfoTable from './TrainInfoTable';
import EditTrainInfoTable from './EditTrainInfoTable';
const _ = require('lodash');

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            isEditMode: false,
            trainListData: [],
            originListData: [],
        };
    }

    fetchGetApi(path, inStateProps) {
        let obj = {};
        fetch(path)
        .then(res => res.json())
        .then(data => {
            inStateProps.forEach((props) => {
                obj[props] = data;
                this.setState(obj);
            });
        });
    }

    updateList(req) {
        let originArr = _.cloneDeep(this.state.originListData);
        req.forEach((element) => {
            originArr.forEach((subElement) => {
                if(element.TRAIN_CD === subElement.TRAIN_CD && element.TRAIN_NM !== subElement.TRAIN_NM) {
                    let obj = {};
                    obj.trainCode = element.TRAIN_CD;
                    obj.trainName = element.TRAIN_NM;
                    fetch('/api/updateAllTrainsInfo', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj)
                    }).then(res => res.json())
                    .then(data => {});
                }
            });
        });
        this.setState({
            originListData: [...this.state.trainListData]
        });
        this.fetchGetApi('/api/getAllTrainsInfo', ['trainListData', 'originListData']);
    }

    componentDidMount() {
        this.fetchGetApi('/api/getAllTrainsInfo', ['trainListData', 'originListData']);
        /* componentDidMount 가 호출되고 나서 종료(return)되는 사이에 setState 호출은 바람직하지 않다 . */
    }

    // TODO : INSERT ON DUPLICATE KEY UPDATE call needed
    componentDidUpdate() {
    }
    
    setTrainDataList = (index, propertyName) => (e) => {
        let newArr = _.cloneDeep(this.state.trainListData); // lodash > cloneDeep() 을 사용하여 배열 복사 (사본 : newArr, 원본 : this.state.originListData)
        newArr[index][propertyName] = e.target.value;
        this.setState({
            trainListData: [...newArr]
        });
    }


    handleEditModeFlag(type) {
        if(type === 'save') {
            this.updateList(this.state.trainListData);
        } else if(type === 'cancel') {
            this.setState({
                trainListData: [...this.state.originListData]
            });
        } else {
        }
        this.setState(prevState => ({
            isEditMode: !prevState.isEditMode
        }));
    }

    render() {

        const mapList = (list) => {
            let tempList = list.map((element, index) => {
                let obj = {};
                let subObj = {};
                obj.sequenceNo = index + 1;
                obj.trainCode = element.TRAIN_CD;
                obj.trainName = element.TRAIN_NM;
                obj.createdDate = element.CRTD_DT;
                obj.modifiedDate = element.MDFD_DT;
                subObj.trainMaxSpeed = element.MAX_SPEED_1KMH;
                subObj.trainMinCars = element.MIN_CARS;
                subObj.trainMaxCars = element.MAX_CARS;
                obj.trainDetails = subObj;
                return obj;
            });
            return tempList;
        };

        const trainList = mapList(this.state.trainListData);

        const isEditMode = this.state.isEditMode;
        let button = null;
        let table = null;
        if(isEditMode) { // 편집 모드
            button = <span className="float-right" ><Button variant="success" onClick={() => this.handleEditModeFlag('save') }>Save</Button>
            <Button variant="danger" onClick={() => this.handleEditModeFlag('cancel') }>Cancel</Button></span>;
            table = <EditTrainInfoTable data={ trainList } isDetailModalBtnDisabled={ true } setTrainDataList={ this.setTrainDataList } />;
        } else { // 보기 모드
            button = <span className="float-right"><Button variant="dark" onClick={() => this.handleEditModeFlag('edit') }>Edit</Button></span>;
            table = <TrainInfoTable data={ trainList } isDetailModalBtnDisabled={ false }/>;
        }

        return (
            <div>
                <header>
                    <div>
                        <h2 className="float-left">Train Info Current Status</h2>
                    </div>
                    { button }
                </header>
                    { table }
            </div>
        );
    }
  }
  
  export default Dashboard;