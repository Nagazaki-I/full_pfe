import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAew4UDuomDhCYKbLhpFd71wOwi4ijaKwA",
  authDomain: "licdapfe.firebaseapp.com",
  projectId: "licdapfe",
  storageBucket: "licdapfe.appspot.com",
  messagingSenderId: "469771755142",
  appId: "1:469771755142:web:b92d7b5594d8ee6ed3fb07",
  measurementId: "G-CBD86W9Z38"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;


