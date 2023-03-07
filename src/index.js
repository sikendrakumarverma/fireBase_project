const express = require('express')
const bodyParser = require('body-parser')
const route = require('./routes/route.js')
const cors= require('cors');
const {MONGOURI} = require('./config/keys.js');

const  mongoose  = require('mongoose')
const app = express()


app.use(bodyParser.json())
app.use(cors());

// ...................................for AWS........................
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGOURI, {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/api', route);



app.use('/*',function (req, res) {
    return res.status(400).send({status : false, message : "path not found"})
    });

// For Deployment in vercel 

if (process.env.NODE_ENV == 'production') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", function (_, res) {
        res.sendFile(
            path.join(__dirname, "../client/build/index.html"),
            function (err) {
                if (err) {
                    res.status(500).send(err)
                }
            }
        )
    })
}


app.listen(process.env.PORT || 8080, function () {
    console.log('Express app running on port ' + (process.env.PORT || 8080))
});
