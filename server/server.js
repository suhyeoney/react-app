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
const router = require('./routes/router');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '..', 'public/')));

app.use("/", router); // '/' 로 시작하는 모든 요청을 router.js 로 넘겨줌

app.listen(port, () => {
    console.log(`Check out the app at http://localhost:${port}`    
    );
});
