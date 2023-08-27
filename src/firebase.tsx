// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTwCygIDQW6Jg_0dUIZJ-CKqbX69ThK2M",
  authDomain: "water-where-ah.firebaseapp.com",
  projectId: "water-where-ah",
  storageBucket: "water-where-ah.appspot.com",
  messagingSenderId: "19294380273",
  appId: "1:19294380273:web:008bd30821aaead7ec4950",
  measurementId: "G-D5WBY03LB3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Get a list of cities from your database
export async function getWaterCooler(db: Firestore) {
  const waterCooler = collection(db, "watercoolers");
  const waterCoolerSnapshot = await getDocs(waterCooler);
  const waterCoolerList = waterCoolerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(waterCoolerList);
  return waterCoolerList;
}
