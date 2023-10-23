import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { firebaseAppConfig } from "../firebase";
import { USERS_DOC } from "./firebase_firestore_users";
import { ACCOUNTS_DOC } from "./firebase_firestore_users_accounts";

const db = getFirestore(firebaseAppConfig);
export const MOVEMENTS_DOC = "movements";

export const getUserAccountMovements = async (userUID, accountID) => {
    const userAccountMovementsCollRef = collection(
        db,
        USERS_DOC,
        userUID,
        ACCOUNTS_DOC,
        accountID,
        MOVEMENTS_DOC
    );
    const movementsQuery = query(
        userAccountMovementsCollRef,
        orderBy("creationDate", "desc")
    );
    const querySnapshot = await getDocs(movementsQuery);
    return querySnapshot.docs.map((movement) => {
        const movementData = movement.data();
        return {
            id: movement.id,
            amount: movementData.amount,
            creationDate: movementData.creationDate,
            description: movementData.description,
            type: movementData.type,
        };
    });
};

export const addUserAccountMovement = async (userUID, accountID, movement) => {
    try {
        const userAccountMovementsCollRef = collection(
            db,
            USERS_DOC,
            userUID,
            ACCOUNTS_DOC,
            accountID,
            MOVEMENTS_DOC
        );
        return await addDoc(userAccountMovementsCollRef, {
            amount: parseFloat(movement.amount),
            creationDate: movement.creationDate,
            description: movement.description,
            type: movement.type,
        });
    } catch (error) {
        console.error("Error on save account movement", error);
        return Promise.reject(new Error("Error on save account movement."));
    }
};
