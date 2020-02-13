import firebase from 'firebase';

// Api details
const config = {
    apiKey: "AIzaSyDXQhhQHOMcQemy-y1wTj9Ax1yl5hc-oJE",
    authDomain: "myfirstproject-89354.firebaseapp.com",
    databaseURL: "https://myfirstproject-89354.firebaseio.com",
    projectId: "myfirstproject-89354",
    storageBucket: "myfirstproject-89354.appspot.com",
    messagingSenderId: "546815369279",
    appId: "1:546815369279:web:ee90a0d794a4e7466e988a"
};

firebase.initializeApp(config)

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
