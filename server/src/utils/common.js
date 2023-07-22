const { firebaseAdmin } = require('../config/firebase');

const sendPushNotification = async (message) => {
    // return new Promise((resolve, reject) => {
    //     firebaseAdmin
    //     .messaging()
    //     .send(message)
    //     .then((_result) => resolve(_result))
    //     .catch((error) => reject(error));
    // });

    try {
        const result = await firebaseAdmin.messaging().send(message);
        return result;
    } catch (error) {
        console.log("Error ", error)
        return error;
    }

};

module.exports = { sendPushNotification };