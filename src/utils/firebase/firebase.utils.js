import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt : 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)


//firebase stuff
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch(error){
            console.log('error creating the user', error.message)
        }

        return userDocRef;
    }

}

