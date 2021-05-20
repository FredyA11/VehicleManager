const admin= require('firebase-admin') //Firebase admin configuration
var serviceAccount = require("./drivvu-33ba0-firebase-adminsdk-l0pjg-50767bbaf5.json");

admin.initializeApp({ //Function that will initialize the firebase service with the appropita credentials
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://drivvu-33ba0-default-rtdb.firebaseio.com",
    storageBucket:"gs://drivvu-33ba0.appspot.com"
});

const db= admin.database(); //Initialize the database service

module.exports= db; //Export the service