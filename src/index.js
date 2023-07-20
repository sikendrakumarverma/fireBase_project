const express = require('express');
//const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

const cron = require("node-cron");


// call the env file
require('dotenv').config();


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();
const app = express();


app.use(express.json());

const port = 3000;

let CollectionName='/games/patt/rooms'
// Define your routes for CRUD operations here
// For simplicity, we'll implement a single route for each operation

// Create operation
app.post('/create', (req, res) => {
  const data = req.body;
  console.log(data);

  db.collection(CollectionName)
    .add(data)
    .then((docRef) => {
      res.status(200).send(docRef.id);
    })
    .catch((error) => {
      res.status(500).send('Error creating document: ' + error);
    });
});

// Read all data operation
app.get('/readall',async (req, res) => {
    let alldata=[]
    const snapshot = await db.collection(CollectionName).get();
     //console.log('snapshot', '=>',snapshot );
    snapshot.forEach((doc) => {
      console.log('doc', '=>', doc.id);
      alldata.push(doc.data())
    });
    res.send(alldata)
});

// Read operation
app.get('/read/:docId', (req, res) => {
  const docId = req.params.docId;
  db.collection(CollectionName)
    .doc(docId)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).send('Document not found');
      } else {
        res.status(200).json(doc.data());
      }
    })
    .catch((error) => {
      res.status(500).send('Error getting document: ' + error);
    });
});

// Update operation
app.put('/update/:docId', (req, res) => {
  const docId = req.params.docId;
  const data = req.body;
  db.collection(CollectionName)
    .doc(docId)
    .set(data, { merge: true })
    .then(() => {
      res.status(200).send('Document successfully updated');
    })
    .catch((error) => {
      res.status(500).send('Error updating document: ' + error);
    });
});

// Delete operation
app.delete('/delete/:docId', (req, res) => {
  const docId = req.params.docId;
  db.collection(CollectionName)
    .doc(docId)
    .delete()
    .then(() => {
      res.status(200).send('Document successfully deleted');
    })
    .catch((error) => {
      res.status(500).send('Error deleting document: ' + error);
    });
});

let currentTime= 0;
let currSubGameId;
cron.schedule('* * * * *', () => {
  console.log(`running in 1min a task every month ${new Date()}`);
  //updateVoucherByCron()
  db.collection(CollectionName)
  .add({
    duration: '2min',
    // timer: 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp(), // Set the 'createdAt' field to the server timestamp
  })
  .then((docRef) => {
    currSubGameId= docRef.id;
    console.log("latest subGameId", currSubGameId);
    //res.status(200).send(docRef.id);
  })
  .catch((error) => {
    //res.status(500).send('Error creating document: ' + error);
    console.log("Error ", error);
  });
  currentTime= 0;
});


// cron.schedule('* * * * * *', () => {
//   //console.log(`running a task every month ${new Date()}`);
//   //updateVoucherByCron()
  
//   db.collection(CollectionName)
//   .doc(currSubGameId).set({
//     //duration: '1min',
//     timer: currentTime
//   }, { merge: true })
//   .then((docRef) => {
//     //res.status(200).send(docRef.id);
//   currentTime= currentTime+1;
//   })
//   .catch((error) => {
//     //res.status(500).send('Error creating document: ' + error);
//     console.log("Error ", error);
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || port}`);
});