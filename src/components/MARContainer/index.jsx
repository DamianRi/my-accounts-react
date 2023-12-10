import MARAccount from './components/MARAccount'
import styles from './MARContainer.module.css'
import { addAccount } from '../../firebase/firebase_firestore_users_accounts'
import useStore from '../../state/userState'
import { addUserAccountMovement } from '../../firebase/firebase_firestore_users_accounts_movements'

const MARContainer = () => {
    const {
        user,
        currentAccount,
        fetchAccounts,
        currentAccountMovements,
        fetchAccountMovements,
        setError,
        setIsLoading,
        setSuccessMessage,
    } = useStore()

    const handleOnSaveAccount = async (account) => {
        const userUID = user.uid
        await saveAccount(userUID, account)
            .then(() => fetchAccounts())
    }

    const saveAccount = async (userUID, account) => {
        setIsLoading(true)
        const newAccount = {
            name: account.name,
            budget: account.budget,
            outcomes: account.outcomes,
            creationDate: new Date().toISOString(),
        }
        return addAccount(userUID, newAccount)
            .then((accountCreated) => {
                setSuccessMessage(`La cuenta - ${newAccount.name} - se ha guardado correctamente.`)
                return accountCreated
            })
            .catch((error) => {
                setError(error)
                return new Promise.reject('Error en crear cuenta')
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
        const newMovement = {
            amount: parseFloat(movement.amount),
            creationDate: new Date().toISOString(),
            description: movement.description,
            type: movement.type,
        }
        await addUserAccountMovement(userUID, accountID, newMovement)
            .then((movementCreated) => {
                setSuccessMessage(`El movimiento - ${newMovement.description} - se ha guardado correctamente.`)
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
