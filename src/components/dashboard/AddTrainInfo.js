import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddTrainInfo ({ setNewInfoData }) {

    return (
        <Table striped bordered hover variant="dark" responsive="sm">
            <tbody>
                <tr>
                    <th>Train Code</th>
                    <td><input type="text" name="trainCode" onChange={(e) => setNewInfoData(e) } /></td>
                </tr>
                <tr>
                    <th>Train Name</th>
                    <td><input type="text" name="trainName" onChange={(e) => setNewInfoData(e) } /></td>
                </tr>
                <tr>
                    <th>Train Max Speed (km/h)</th>
                    <td><input type="number" name="trainMaxSpeed" onChange={(e) => setNewInfoData(e) } /></td>
                </tr>
                <tr>
                    <th>The Minimum Car Number of Train</th>
                    <td><input type="number" name="trainMinCars" onChange={(e) => setNewInfoData(e) } /></td>
                </tr>
                <tr>
                    <th>The Maximum Car Number of Train</th>
                    <td><input type="number" name="trainMaxCars" onChange={(e) => setNewInfoData(e) } /></td>
                </tr>
            </tbody>
      </Table>
    );
}

export default AddTrainInfo