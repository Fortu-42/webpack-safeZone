import firebase from 'firebase';

export const initializeFirebase = () => {
    firebase.initializeApp({
      // apiKey: "AIzaSyCUCWaO5rFJvEq-aWn249mSyeUmfF6EpPo",
      // authDomain: "safezone-1542226382791.firebaseapp.com",
      // databaseURL: "https://safezone-1542226382791.firebaseio.com",
      // projectId: "safezone-1542226382791",
      // storageBucket: "",
      messagingSenderId: "619959429440"
    });

    // navigator.serviceWorker
    // .register('./js/map.js')
    // .then((registration) => {
    //   firebase.messaging().useServiceWorker(registration);
    // });
  }