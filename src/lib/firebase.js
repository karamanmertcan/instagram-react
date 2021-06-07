import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCzqJFLOhcP8D1RT-rq0kbxQjImOnXEmvM',
  authDomain: 'instagram-c0f86.firebaseapp.com',
  projectId: 'instagram-c0f86',
  storageBucket: 'instagram-c0f86.appspot.com',
  messagingSenderId: '620504126688',
  appId: '1:620504126688:web:8cd3fff69ceb8433d02c85'
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
