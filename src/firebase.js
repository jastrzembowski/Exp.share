import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCo6IWz_GXJEWNFAC6sZxj98fu_VSW3xQk",
  authDomain: "expshare-34cb2.firebaseapp.com",
  databaseURL: "https://expshare-34cb2-default-rtdb.firebaseio.com",
  projectId: "expshare-34cb2",
  storageBucket: "expshare-34cb2.appspot.com",
  messagingSenderId: "955001888295",
  appId: "1:955001888295:web:6d67f726dee499d960b802"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true})
export const auth = firebase.auth()
export default firebase