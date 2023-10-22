import { useState } from 'react'
import MARAccount from './components/MARAccount'
import styles from './MARContainer.module.css'
import { addAccount } from '../../firebase/firebase_firestore_users_accouts'
import useStore from '../../state/userState'

// TODO: Aquí debemos de obtener las cuentas disponibles
// Esta debería ser la lista de cuentas en la base de datos
// const accountsStored = []

const MARContainer = () => {
    const { user, currentAccount, setCurrentAccount, fetchAccounts, currentAccountMovements, setError, setIsLoading } = useStore()
    const [accountMovements, setAccountMovements] = useState([])

    const handleOnSaveAccount = async (account) => {
        await saveAccount(user.uid, account)
            .then((newAccount) => {
                fetchAccounts(user.uid)
                    .then(() => {
                        setCurrentAccount(newAccount)
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

    // TODO: HAcer el guardado de movimeintos en Firbase
    const handleOnSaveMovement = (movement) => {
        setAccountMovements([
            movement,
            ...accountMovements
        ])
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
