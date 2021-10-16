const { table } = require('console');
const express = require('express');
const os = require('os');
const router = express.Router();
const database = require('../dbconnection');

router.get('/api/getUsername', function (req, res, next) {
    // returns value
    res.send(
        {
            username: os.userInfo().username
        }
    );
});

router.get('/getAllTrainsInfo', (req, res) => {
    database.query(
    "SELECT A.CODE_STR AS TRAIN_CD, A.CODE_NM AS TRAIN_NM, B.MAX_SPEED_1KMH, B.MIN_CARS, B.MAX_CARS"
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