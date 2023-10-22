import { create } from "zustand";
import { getUserAccounts } from "../firebase/firebase_firestore_users_accouts";

const useStore = create((set) => ({
    // Process
    isLoading: false,
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
    error: null,
    setError: (error) => set(() => ({ error })),
    // User
    user: {},
    setUser: (user) => set(() => ({ user: user })),
    removeUser: () => set({ user: {} }),
    // Accounts
    accounts: [],
    fetchAccounts: async (userUID) => {
        try {
            await set(() => ({ isLoading: true }));
            const accounts = userUID ? await getUserAccounts(userUID) : [];
            await set(() => ({ accounts, isLoading: false }));
        } catch (error) {
            console.error("Error al consultar accounts ", userUID, error);
            await set(() => ({ error, isLoading: false }));
        }
    },
    clearAccounts: () => set(() => ({ accounts: [] })),
    currentAccount: {},
    setCurrentAccount: (account) => {
        set(() => ({ currentAccount: account }));
        // TODO: On set account, update account movements
    },
    // Movements
    currentAccountMovements: [],
    fetchAccountMovements: async (userUID, accountId) => {
        console.log("TODO: getAccountMovements ", userUID, accountId);
    },
}));

export default useStore;
