// import firebase from "firebase/app";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_fIREBASE_apiKey,
//   authDomain: process.env.REACT_APP_fIREBASE_authDomain,
//   databaseURL: process.env.REACT_APP_fIREBASE_databaseURL,
//   projectId: process.env.REACT_APP_fIREBASE_projectId,
//   storageBucket: process.env.REACT_APP_fIREBASE_storageBucket,
//   messagingSenderId: process.env.REACT_APP_fIREBASE_messagingSenderId,
//   appId: process.env.REACT_APP_fIREBASE_appId,
// };

// export const initialization = () => {
//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }
// };

// export const handleGoogleSignIn = () => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   return firebase
//     .auth()
//     .signInWithPopup(provider)
//     .then(result => {
//       const user = result.user;
//       return user;
//     })
//     .catch(err => console.log("error :", err));
// };
