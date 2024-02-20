import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWInm3HhRxY4N7UWoQpO6Tp_rLXeDEt9E",
    authDomain: "react-native-241ef.firebaseapp.com",
    projectId: "react-native-241ef",
    storageBucket: "react-native-241ef.appspot.com",
    messagingSenderId: "818299508275",
    appId: "1:818299508275:web:6f32039e9be32bb1237546"
  };
  
  // Initialize Firebase
export const db = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(db);
export const dbCollection = collection(firestoreDb, 'tasks');


//read from db
export function load() {
  const data = [];

  return new Promise((resolve, reject) => {
    getDocs(dbCollection)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const task = {
            ...doc.data(),
            id: doc.id
          };
          data.push(task);
        });
        resolve(data);
      })
      .catch((error) => {
        console.log('Error:', error);
        reject(error);
      });
  });
}



  