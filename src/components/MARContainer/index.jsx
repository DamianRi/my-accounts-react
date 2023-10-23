import MARAccount from './components/MARAccount'
import styles from './MARContainer.module.css'
import { addAccount } from '../../firebase/firebase_firestore_users_accounts'
import useStore from '../../state/userState'
import { addUserAccountMovement } from '../../firebase/firebase_firestore_users_accounts_movements'

const MARContainer = () => {
    const {
        user,
        currentAccount,
        setCurrentAccount,
        fetchAccounts,
        currentAccountMovements,
        fetchAccountMovements,
        setError,
        setIsLoading
    } = useStore()

    const handleOnSaveAccount = async (account) => {
        const userUID = user.uid
        await saveAccount(userUID, account)
            .then((newAccount) => {
                fetchAccounts(userUID)
                    .then(() => {
                        setCurrentAccount(userUID, newAccount)
                    }) 
            })
    }

    const saveAccount = async (userUID, account) => {
        setIsLoading(true)
        const newAccount = {
            name: account.name,
            incomes: account.incomes,
            outcomes: account.outcomes,
            creationDate: new Date().toISOString(),
        }
        await addAccount(userUID, newAccount)
            .then((accountCreated) => {
                newAccount.id = accountCreated.id
                return newAccount
            })
            .catch(() => {
                const error = new Error("Es necesario iniciar sesión para agregar nuevas cuentas.")
                setError(error.message)
                return Promise.reject(error)
            })
            .finally(() => setIsLoading(false))
    }

    const handleOnSaveMovement = async(movement) => {
        await saveMovement(user.uid, currentAccount.id, movement)
            .then(() => {
                fetchAccountMovements(user.uid, currentAccount.id)
            })
    }

    const saveMovement = async (userUID, accountID, movement) => {
        setIsLoading(true)
        console.log("saveMovement ", movement)
        const newMovement = {
            amount: parseFloat(movement.amount),
            creationDate: new Date().toISOString(),
            description: movement.description,
            type: movement.type,
        }
        await addUserAccountMovement(userUID, accountID, newMovement)
            .then((movementCreated) => {
                newMovement.id = movementCreated.id
                return newMovement
            })
            .catch(() => {
                const error = new Error("Ocurrió un error al crear el movimiento. Por favor, intenta de nuevo.")
                setError(error.message)
                return Promise.reject(error)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <main className={ styles.MARContainer }>
            <MARAccount
                key={currentAccount && currentAccount.id || -1}
                account={currentAccount}
                movements={currentAccountMovements}
                onSaveAccount={ handleOnSaveAccount }
                onSaveMovement={ handleOnSaveMovement }
            ></MARAccount>
        </main>
    );
}

export default MARContainer
