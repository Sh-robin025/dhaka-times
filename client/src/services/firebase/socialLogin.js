import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  try {
    const res = await signInWithPopup(auth, provider);
    console.log(res.user);
  } catch (error) {
    console.log(error.message);
  }
};

export const handleFBLogin = async () => {};
