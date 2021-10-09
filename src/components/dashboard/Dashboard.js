import React, { Component } from 'react';
import TrainInfoTable from './TrainInfoTable';

class Dashboard extends Component {
    state = {
        trainListData: [],
        columnListData: [],
        tableName: 'RAIL_MGMT_TRAIN'
    };

    componentDidMount() {
        fetch('/getAllTrainsData')
        .then(res => res.json())
        .then(data => this.setState({
           trainListData: data
        }));

        fetch('/getColumnNames?tableName=' + this.state.tableName)
        .then(res => res.json())
        .then(data => this.setState({
            columnListData: data
        }));
    }

    render() {
        const trainList = this.state.trainListData.map(function (element, index) {
            let obj = {};
            obj.sequenceNo = index + 1;
            obj.trainCode = element.TRAIN_CD;
            obj.trainName = element.TRAIN_NM;
            return obj;
        });
        // const trainList = trainListData.map((element, index) =>
        //     <li key={ index }>
        //         { index + 1 } : { element.trainCode }
        //     </li>s
        // );
        console.log(this.state.columnListData);
        const columnList = this.state.columnListData.filter(function (element) { 
            return element.COLUMN_NAME === 'TRAIN_CD' || element.COLUMN_NAME === 'TRAIN_NM';
        }).map(function (element) {
            if(element.COLUMN_NAME === 'TRAIN_CD') return 'Train Code';
            else return 'Train Name';
        });
        columnList.unshift('Sequence No.');
        console.log(columnList);
        console.log(trainList);
        return (
        <div>
            <TrainInfoTable columns={ columnList } data={ trainList  } />
        </div>
        );
    }
  }
  
  export default Dashboard;