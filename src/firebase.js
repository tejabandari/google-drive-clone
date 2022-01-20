import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/database";
import "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const firestore = app.firestore();

export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
  formattedDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
};

export const storage = app.storage();
// export function uploadFile(filePath, file) {
//   console.log(filePath);
//   const storage = getStorage();
//   const storageRef = ref(storage, filePath);
//   uploadBytes(storageRef, file).then((snapshot) => {
//     console.log("uploaded succesfully");
//   });
// }

export const auth = app.auth();

export default app;
