import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy,
    setDoc,
    doc,
} from "firebase/firestore";
import { firebaseAppConfig } from "../firebase";
import { USERS_DOC } from "./firebase_firestore_users";

const db = getFirestore(firebaseAppConfig);
export const ACCOUNTS_DOC = "accounts";

export const getUserAccounts = async (userUID) => {
    const userAccountsCollectionRef = collection(
        db,
        USERS_DOC,
        userUID,
        ACCOUNTS_DOC
    );
    const accountsQuery = query(
        userAccountsCollectionRef,
        orderBy("creationDate", "desc")
    );
    const querySnapshot = await getDocs(accountsQuery);

    return querySnapshot.docs.map((account) => {
        const accountData = account.data();
        return {
            id: account.id,
            name: accountData.name,
            budget: accountData.budget,
            outcomes: accountData.outcomes,
        };
    });
};

export const addAccount = async (userUID, account) => {
    const userAccountsCollectionRef = doc(
        collection(db, USERS_DOC, userUID, ACCOUNTS_DOC)
    );
    return setDoc(userAccountsCollectionRef, {
        name: account.name,
        budget: parseFloat(account.budget),
        outcomes: parseFloat(account.outcomes),
        creationDate: account.creationDate,
    });
};
