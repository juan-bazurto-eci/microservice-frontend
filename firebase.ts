// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5o7NHSgcVmSS9PRaNsu6BuiP5gxnQYwE",
  authDomain: "technical-test-558a8.firebaseapp.com",
  projectId: "technical-test-558a8",
  storageBucket: "technical-test-558a8.appspot.com",
  messagingSenderId: "556860185363",
  appId: "1:556860185363:web:eff79978137bd6ac5f98e6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
