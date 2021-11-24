// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFtHqVfOzvgAiM9sZYVizaqxeWuKf3Bp8",
  authDomain: "social-media-app-4a0d8.firebaseapp.com",
  projectId: "social-media-app-4a0d8",
  storageBucket: "social-media-app-4a0d8.appspot.com",
  messagingSenderId: "529010135007",
  appId: "1:529010135007:web:127527cc62d3fd60957e6a",
};

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
