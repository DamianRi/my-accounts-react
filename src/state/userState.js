import { create } from "zustand";
import { getUserAccounts } from "../firebase/firebase_firestore_users_accounts";
import { getUserAccountMovements } from "../firebase/firebase_firestore_users_accounts_movements";

const useStore = create((set, get) => ({
    // Process
    isLoading: false,
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
    error: null,
    setError: (error) => set(() => ({ error })),
    successMessage: null,
    setSuccessMessage: (message) => set(() => ({ successMessage: message })),
    // User
    user: {},
    setUser: (user) => set(() => ({ user: user })),
    removeUser: () => set({ user: {} }),
    // Accounts
    accounts: [],
    fetchAccounts: async () => {
        set(() => ({ isLoading: true }));
        const userUID = get().user.uid;
        if (userUID) {
            await getUserAccounts(userUID)
                .then((accounts) => {
                    if (accounts.length > 0) {
                        get().setCurrentAccount(accounts[0]);
                    }
                    set(() => ({ accounts }));
                })
                .catch((error) => {
                    console.error(
                        "Error al consultar accounts ",
                        userUID,
                        error
                    );
                    set(() => ({ accounts: [] }));
                })
                .finally(() => set(() => ({ isLoading: false })));
        }
    },
    clearAccounts: () => set(() => ({ accounts: [] })),
    currentAccount: {},
    setCurrentAccount: async (account) => {
        const userUID = get().user.uid;
        set(() => ({ currentAccount: account }));
        if (userUID) {
            await get().fetchAccountMovements(userUID, account.id);
        } else {
            await get().clearCurrentAccountMovements();
        }
    },
    // Movements
    currentAccountMovements: [],
    fetchAccountMovements: async (userUID, accountID) => {
        try {
            set(() => ({ isLoading: true }));
            const movements =
                userUID && accountID
                    ? await getUserAccountMovements(userUID, accountID)
                    : [];
            set(() => ({
                currentAccountMovements: movements,
                isLoading: false,
            }));
        } catch (error) {
            console.error(
                "Error al obtener movimientos ",
                userUID,
                accountID,
                error
            );
            set(() => ({ error, isLoading: false }));
        }
    },
    clearCurrentAccountMovements: () =>
        set(() => ({ currentAccountMovements: [] })),
}));

export default useStore;
