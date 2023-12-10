import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseAppConfig } from "../firebase";

const db = getFirestore(firebaseAppConfig);
// export const MY_ACCOUNTS_DB = "databases/my-accounts/documents";
export const USERS_DOC = "my-accounts";

export const addUser = async (user) => {
    const docRef = doc(collection(db, USERS_DOC), user.uid);
    return setDoc(docRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        updatedDate: new Date().toISOString(),
    });
};

export default db;
