import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBKegiv8ddLH1usBBSDVXxBwDB4zsyDHRE",
  authDomain: "crwn-clothing-db-6dd5e.firebaseapp.com",
  projectId: "crwn-clothing-db-6dd5e",
  storageBucket: "crwn-clothing-db-6dd5e.appspot.com",
  messagingSenderId: "742666847156",
  appId: "1:742666847156:web:ee342a83ed125b669e68e1"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, aditionalInfo = {}) => {
  if (!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, 
        email, 
        createdAt,
        ...aditionalInfo
      })
    } catch (err) {
      console.log(err)
    }
  }

}

export const createAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

/**
 * next: callback
 * error: errorCallback
 * complete: completeCallback
 * 
 * 
 * 
 * 
 */