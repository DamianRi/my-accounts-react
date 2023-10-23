import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
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
    const querySnapshot = await getDocs(userAccountsCollectionRef);

    return querySnapshot.docs.map((account) => {
        const accountData = account.data();
        return {
            id: account.id,
            name: accountData.name,
            incomes: accountData.incomes,
            outcomes: accountData.outcomes,
        };
    });
};

export const addAccount = async (userUID, account) => {
    try {
        const userAccountsCollectionRed = collection(
            db,
            USERS_DOC,
            userUID,
            ACCOUNTS_DOC
        );
        return await addDoc(userAccountsCollectionRed, {
            name: account.name,
            incomes: parseFloat(account.incomes),
            outcomes: parseFloat(account.outcomes),
            creationDate: account.creationDate,
        });
    } catch (error) {
        console.error("Error on save account ", error);
        return Promise.reject(new Error("Error on save account."));
    }
};

export default db;