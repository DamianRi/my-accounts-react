import { firebaseAppConfig } from "./firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseAuth = getAuth(firebaseAppConfig);

const login = async () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(firebaseAuth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            return { token, user };
        })
        .catch((error) => console.log(error));
};

const logout = async () => {
    return firebaseAuth.signOut();
};

export { login, logout };
