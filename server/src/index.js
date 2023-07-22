const express = require("express");
const app = express();

const messageRouters = require("./routes/messageRoute");

const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//app.use( multer().any())

app.use('/', messageRouters); // Router for message's APIs

//vercel 
if (process.env.NODE_ENV == 'production') {
    const path = require('path')

}

app.listen(process.env.PORT || 8080, function () {
    console.log('Express app running on port ' + (process.env.PORT || 8080))
});

