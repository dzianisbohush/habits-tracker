import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDawvuvAZmkBheTTRdB6_X9idvMC5yVaDs",
    authDomain: "habit-tracker-324008.firebaseapp.com",
    projectId: "habit-tracker-324008",
    storageBucket: "habit-tracker-324008.appspot.com",
    messagingSenderId: "1091835775630",
    appId: "1:1091835775630:web:6af399573346896fdc57df",
    databaseURL: "https://habit-tracker-324008-default-rtdb.europe-west1.firebasedatabase.app/",
};

firebase.initializeApp(firebaseConfig);
export const fireAuth = firebase.auth();
export const fireGoogleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;