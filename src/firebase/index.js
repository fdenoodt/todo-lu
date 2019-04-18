import firebase from 'firebase';
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyAq4BDWj4P8joAh3FiCP2ZGs4QMdX4qAeg",
  authDomain: "tasks-d6816.firebaseapp.com",
  databaseURL: "https://tasks-d6816.firebaseio.com",
  projectId: "tasks-d6816",
  storageBucket: "tasks-d6816.appspot.com",
  messagingSenderId: "226958497004"
};
firebase.initializeApp(config);

export const db = firebase.firestore()
