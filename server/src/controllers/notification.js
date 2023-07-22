const{sendPushNotification}= require('../utils/common')
// Send a message to the device corresponding to the provided
// registration token.

const sendNotification = async function (req, res) {
    try {
        
        // This registration token comes from the client FCM SDKs.
        const registrationToken = 'cTKmd7kHpomxxpNOmyE26D:APA91bHeWkDXvZ5eRqWPWwtlIrb4UDNOAxTqstkUb5PLr5PB6l7vjPfmDvWlziNtunGPeuNUWXT8L9ptgVpo-4YEXCVRfL4y72QnEQedYJy4ygmTWIt9nahu_916u-ETzaSO_dn1XHcl';
       
        const message = {
            data: {
                score: '850',
                time: '2:45'
            },
            token: registrationToken,
        
            notification: {
                title: "Message from node",
                body: "hey there",
                // icon: 'myicon',//Default Icon
                // sound: 'mySound',//Default sound
                // badge: badgeCount, example:1 or 2 or 3 or etc....
            },
        
        };

         let sent= await sendPushNotification(message);
         console.log("sent", sent);
         return  res.status(200).send({ status: true, message: sent });

    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendNotification };