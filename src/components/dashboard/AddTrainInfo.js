import {React, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddTrainInfo ({ data }) {

    const [ newInfoData, setNewInfoData ] = useState( // Initilize the object state
        {
            trainCode: "",
            trainName: "",
            trainMaxSpeed: 0,
            trainMinCars: 0,
            trainMaxCars: 0
        }
    );

      const setData = (e) => {
        setNewInfoData({...newInfoData, [e.target.name]: e.target.value});
      };

      useEffect(() => {
        console.log("newInfoData : ", newInfoData);
      }, [newInfoData]);





    return (
        <Table striped bordered hover variant="dark" responsive="sm">
            <tbody>
                <tr>
                    <th>Train Code</th>
                    <td><input type="text" name="trainCode" onBlur={(e) => setData(e) } /></td>
                </tr>
                <tr>
                    <th>Train Name</th>
                    <td><input type="text" name="trainName" /></td>
                </tr>
                <tr>
                    <th>Train Max Speed (km/h)</th>
                    <td><input type="number" /></td>
                </tr>
                <tr>
                    <th>The Minimum Car Number of Train</th>
                    <td><input type="number" /></td>
                </tr>
                <tr>
                    <th>The Maximum Car Number of Train</th>
                    <td><input type="number" /></td>
                </tr>
            </tbody>
      </Table>
    );
}

export default AddTrainInfo