const { admin, db } = require('../config/firebase');

require('dotenv').config();

let CollectionName = process.env.PATT_SUB_GAME_PATH
//console.log("CollectionName",CollectionName);

// Helper function to handle errors
const handleError = (res, error) => {
    console.log(error.message);
    return res.status(500).send({status: true, message: error.message });
};

// Create operation
const createPattSubGame = async (req, res) => {
    try {
        const data = req.body;

        // Set the 'createdAt' field to the server timestamp in doccument
        data.createdAt = admin.firestore.FieldValue.serverTimestamp();

        const docRef = await db.collection(CollectionName).add(data);
        const doc = await docRef.get();
        res.status(200).send({status: true,message:'Document successfully created', Id: docRef.id, data: doc.data()});
    } catch (error) {
        handleError(res, error);
    }
};
// create sub game by cron
const createPattSubGameByCron = async () => {
    try {
        const docRef = await db.collection(CollectionName).add({
            duration: '1min',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),// Set the 'createdAt' field to the server timestamp in doccument
        });

        const currSubGameId = docRef.id;
        //console.log("latest subGameId", currSubGameId);
        return currSubGameId;
    } catch (error) {
        console.log("Error ", error);
        return error;
    }
};


// Read all data operation
const getAllPattSubGame = async (req, res) => {
    try {
        const alldata = [];
        const snapshot = await db.collection(CollectionName).get();
        snapshot.forEach((doc) => {
            alldata.push(doc.data());
        });
        return res.status(200).send({status: true,message:'Document feched successfully', data: alldata});
    } catch (error) {
        handleError(res, error);
    }
};

// Read operation by Id
const getPattSubGameById = async (req, res) => {
    try {
        const docId = req.params.docId;
        const doc = await db.collection(CollectionName).doc(docId).get();
        if (!doc.exists) {
            return res.status(404).send('Document not found');
        }
        return res.status(200).send({status: true,message:'Document get successfully', data: doc.data()});
    } catch (error) {
        handleError(res, error);
    }
};

// Update operation/games/patt
const updatePattSubGame = async (req, res) => {
    try {
        const docId = req.params.docId;
        const data = req.body;
        const docCheck = await db.collection(CollectionName).doc(docId).get();
        if (!docCheck.exists) {
            return res.status(404).send('Document not found');
        }
        await db.collection(CollectionName).doc(docId).set(data, { merge: true });

        const doc = await db.collection(CollectionName).doc(docId).get();
        if (!doc.exists) {
            return res.status(404).send('Document not found');
        }

        return res.status(200).send({ status: true, message: 'Document successfully updated', Id: doc.id, data: doc.data() });
    } catch (error) {
        handleError(res, error);
    }
};

// update by cron job
const updatecurrentRoomId = async (id) => {
    try {
        const collName= process.env.CURRENT_ROOM_ID_CHANGE_COLLECTION;
        const docId = process.env.PATT_CURRENT_ROOM_ID_CHANGE_DOC_ID;
        const data = {
            currentRoomId: '/rooms/'+ id
        }
        await db.collection(collName).doc(docId).set(data, { merge: true });

        const doc = await db.collection(collName).doc(docId).get();
        if (!doc.exists) {
            return 'Document not found';
        }

        return { message: 'Document successfully updated', Id: doc.id, data: doc.data() };
    } catch (error) {
        // handleError(res, error);
        return error;
    }
};


// Delete operation
const deletePattSubGame = async (req, res) => {
    try {
        const docId = req.params.docId;
        await db.collection(CollectionName).doc(docId).delete();
        res.status(200).send('Document successfully deleted');
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    createPattSubGame,
    createPattSubGameByCron,
    getAllPattSubGame,
    getPattSubGameById,
    updatePattSubGame,
    updatecurrentRoomId,
    deletePattSubGame,
};
