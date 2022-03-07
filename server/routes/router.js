const { table } = require('console');
const express = require('express');
const os = require('os');
const router = express.Router();
const database = require('../dbconnection');

router.get('/getUsername', function (req, res) {
    // returns value
    res.send(
        {
            username: os.userInfo().username
        }
    );
});

router.get('/getAllTrainsInfo', (req, res) => {
    database.query(
    "SELECT A.CODE_STR AS TRAIN_CD, A.CODE_NM AS TRAIN_NM, A.CRTD_DT, A.MDFD_DT, B.MAX_SPEED_1KMH, B.MIN_CARS, B.MAX_CARS"
    + " FROM rail.RAIL_MGMT_COMMON_CODE A, rail.RAIL_MGMT_TRAIN_INFO B"
    + " WHERE A.CODE_STR = B.TRAIN_CD"
    , (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    });
});

router.post('/updateAllTrainsInfo', (req, res) => {
    let trainCode = req.body.trainCode;
    let trainName = req.body.trainName;
    database.query("INSERT INTO rail.RAIL_MGMT_COMMON_CODE (CODE_STR, CODE_NM, CRTD_DT, MDFD_DT) VALUES ('" 
    + trainCode + "', '" + trainName + "', NOW(), NOW()) ON DUPLICATE KEY UPDATE CODE_NM = '" + trainName + "', MDFD_DT = NOW()"
    , (err, rows) => {
        if(!err) {
            console.log('Update Success !');
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    });
});

// router.post('/insertNewTrainInfo', async (req, res) => {
//     let trainCode = req.body.trainCode;
//     let trainName = req.body.trainName;
//     let trainMaxSpeed = req.body.trasinMaxSpeed;
//     let trainMinCars = req.body.trainMinCars;
//     let trainMaxCars = req.body.trainMaxCars;
//     let connection = await database.getConnection();

//     try {
//         await connection.beginTransaction();
//         let resultCommonCode = await database.query("INSERT INTO rail.RAIL_MGMT_COMMON_CODE (CODE_STR, CODE_NM, CRTD_DT, MDFD_DT) VALUES ('"
//         + trainCode + "', '" + trainName + "', NOW(), NOW())"
//     }

//     , (err, rows) => {
//         if(!err) {
//             console.log('Insert Success !');
//         } else {
//             console.log(`query error : ${err}`);
//             res.send(err);
//         }
//     });
// });

// router.get('/getColumnNames', (req, res) => {
//     const tableName = req.query.tableName;
//     database.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'rail' AND TABLE_NAME = '" + tableName + "'", (err, rows) => {
//         if(!err) {
//             res.send(rows);
//         } else {
//             console.log(`query error : ${err}`);
//             res.send(err);
//         }
//     });
// });

module.exports = router;