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

router.get('/getAllData', (req, res) => {
    database.query("SELECT * FROM `RAIL_MGMT_TRAIN`", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query error : ${err}`);
            res.send(err);
        }
    });
});

module.exports = router;