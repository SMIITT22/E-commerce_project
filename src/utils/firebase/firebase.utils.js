import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDb_ewVCY0bucR_9lFqt1IMIUHIx5Banjg",
    authDomain: "crwn-clothing-db-17dba.firebaseapp.com",
    projectId: "crwn-clothing-db-17dba",
    storageBucket: "crwn-clothing-db-17dba.appspot.com",
    messagingSenderId: "519576113263",
    appId: "1:519576113263:web:7b3e3ef79442d23b0a3d9a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//there can be multiple providers like google,fb,github.
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
})


//making a variable auth which is a kind of tracker of log-in and log-out. 
export const auth = getAuth();

//function for pop-up and redirect.
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

//creating firebase instance in local computer.
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    ) => {
    if (!userAuth) return;
    //we use doc() method in userDocRef   -->   will return object with uid which is needed for firebase.
    const userDocRef = doc(db, 'users', userAuth.uid);
    //console.log(userDocRef)

    //here we use getDoc() and make a variable userSnapshot method and pass the above result in respective to get data from firebase.
    const userSnapshot = await getDoc(userDocRef)
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists());

    //logic for add new user and for not to save user who is sign-in again.
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }

        return userDocRef;
    }

}


export const craeteAuthUserWithEmailandPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}
