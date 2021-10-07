// const express = require('express');
// const app = express();
// const cors =require('cors');
// const bodyParser = require('body-parser');
// const port = process.env.PORT || 3001;

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/api', (req, res) => res.json({
//     username: 'react'
// }));

// app.listen(port, () => {
//     console.log(`express is running on ${port}`);
// })

const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '..', 'public/')));

app.get('/api/getUsername', function (req, res, next) {
    // returns value
    res.send(
        {
            username: os.userInfo().username
        }
    );
});

app.listen(port, () => {
    console.log(`Check out the app at http://localhost:${port}`    
    );
});
