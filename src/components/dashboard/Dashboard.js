import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import lodash from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainInfoTable from './TrainInfoTable';
import EditTrainInfoTable from './EditTrainInfoTable';
import AddTrainInfo from './AddTrainInfo';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            isEditMode: false,
            isAdditionMode: false,
            trainListData: [],
            originListData: [],
            newInfoData: {
                trainCode: "",
                trainName: "",
                trainMaxSpeed: 0,
                trainMinCars: 0,
                trainMaxCars: 0
            }
        };
    }

    fetchGetApi = (path, inStateProps) => {
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

    fetchPostApi = (path, param) => {
        fetch(path, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        }).then(res => res.json())
        .then(data => {});
    }

    callList = () => {
        this.fetchGetApi('/api/getAllTrainsInfo', ['trainListData', 'originListData']);
    }

    updateList = (req) => {
        let originArr = lodash.cloneDeep(this.state.originListData);
        req.forEach((element) => {
            originArr.forEach((subElement) => {
                if(element.TRAIN_CD === subElement.TRAIN_CD && element.TRAIN_NM !== subElement.TRAIN_NM) {
                    let obj = {};
                    obj.trainCode = element.TRAIN_CD;
                    obj.trainName = element.TRAIN_NM;
                    console.log("updateList obj : ", obj);
                    this.fetchPostApi('/api/updateAllTrainsInfo', obj);
                }
            });
        });
        this.callList();
        // console.log("save > trainListData : ", this.state.trainListData);
    }

    componentDidMount = () => {
        this.callList();
        /* componentDidMount 가 호출되고 나서 종료(return)되는 사이에 setState 호출은 바람직하지 않다 . */
    }

    // TODO : INSERT ON DUPLICATE KEY UPDATE call needed
    componentDidUpdate = () => {
    }
    
    setTrainDataList = (index, propertyName) => (e) => {
        let newArr = lodash.cloneDeep(this.state.trainListData); // lodash > cloneDeep() 을 사용하여 배열 복사 (사본 : newArr, 원본 : this.state.originListData)
        newArr[index][propertyName] = e.target.value;
        this.setState({
            trainListData: [...newArr]
        });
    }

    setNewInfoData = (e) => {
        this.setState(prevState => ({
            newInfoData:{
                ...prevState.newInfoData,
                [e.target.name]: e.target.name === 'trainCode' || e.target.name === 'trainName' ? e.target.value : e.target.valueAsNumber
            }
        }), () => console.log("setNewInfoData :", this.state.newInfoData)); // setState 는  asynchronous 이므로, console.log 호출 시, 이  방법으로 출력해야 함  ! 
    }

    saveNewData = () => {
        console.log("saveNewData : ", this.state.newInfoData);
        let obj = this.state.newInfoData;
        this.fetchPostApi('/api/updateAllTrainsInfo', obj);
        this.callList();
    }

    handleEditModeFlag = (type) => {
        if(type === 'save') {
            this.updateList(this.state.trainListData);
        } else if(type === 'cancel') {
            this.setState({
                trainListData: lodash.cloneDeep(this.state.originListData)
            }, () => console.log("cancel > trainListData : ", this.state.trainListData));
        } else {

        }
        this.setState(prevState => ({
            isEditMode: !prevState.isEditMode
        }));
    }

    handleAdditionModeFlag = (type) => {
        if(type === 'save') {
            this.saveNewData();
        }
        this.setState(prevState => ({
            isAdditionMode: !prevState.isAdditionMode
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

        const newInfoData = this.state.newInfoData;

        const isEditMode = this.state.isEditMode;
        const isAdditionMode = this.state.isAdditionMode;
        
        let button = null;
        let table = null;
        if(isEditMode) { // 편집 모드
            button = <span className="float-right" ><Button variant="success" onClick={() => this.handleEditModeFlag('save') }>Save</Button>
            <Button variant="danger" onClick={() => this.handleEditModeFlag('cancel') }>Cancel</Button></span>;
            table = <EditTrainInfoTable data={ trainList } isDetailModalBtnDisabled={ true } setTrainDataList={ this.setTrainDataList } />;
        } else { // 보기 모드
            button = <span className="float-right"><Button variant="primary" onClick={() => this.handleAdditionModeFlag('add') }>Add</Button>
                <Button variant="dark" onClick={() => this.handleEditModeFlag('edit') }>Edit</Button></span>;
            table = <TrainInfoTable data={ trainList } isDetailModalBtnDisabled={ false }/>;
        }

        if(isAdditionMode) { // 데이터 신규 추가 모드
            button = <span className="float-right" ><Button variant="success" onClick={() => this.handleAdditionModeFlag('save') }>Save</Button>
            <Button variant="danger" onClick={() => this.handleAdditionModeFlag('cancel') }>Cancel</Button></span>;
            table = <AddTrainInfo data={ newInfoData } setNewInfoData={this.setNewInfoData } />
            
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