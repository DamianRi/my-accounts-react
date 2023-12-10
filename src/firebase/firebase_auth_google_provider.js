import { firebaseAppConfig } from "../firebase";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    browserLocalPersistence,
} from "firebase/auth";

const firebaseAuth = getAuth(firebaseAppConfig);
firebaseAuth.setPersistence(browserLocalPersistence);

const login = async () => {
    const googleProvider = new GoogleAuthProvider();
    return await signInWithPopup(firebaseAuth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            return { token, user };
        })
        .catch((error) => {
            console.error("Error on sign in ", error);
            return Promise.reject(
                new Error("Error on sign in with Google provider.")
            );
        });
};

const logout = async () => {
    return firebaseAuth.signOut();
};

export { login, logout };
