import { useState } from 'react'
import MARAccount from './components/MARAccount'
import MARAccountNavbar from './components/MARAccountNavbar'
import styles from './MARContainer.module.css'

// TODO: Aquí debemos de obtener las cuentas disponibles
// Esta debería ser la lista de cuentas en la base de datos
const accountsResult = [
    // { id: 1, name: 'Cuenta 1' },
    // { id: 2, name: 'Cuenta 2' },
    // { id: 3, name: 'Cuenta 3' },
    // { id: 4, name: 'Cuenta 4' },
    // {
    //     id: -1,
    //     name: 'Nueva cuenta',
    //     incomes: 0,
    //     outcomes: 0,
    //     movements: []
    // },
]

const MARContainer = () => {
    const [accounts, setAccounts] = useState(accountsResult)
    const [accountSelected, setAccountSelected] = useState(accounts.length > 0 ? accounts[0] : undefined)

    const handleOnSaveAccount = (accountToSave) => {
        const newAccount = saveAccount(accountToSave)
        setAccounts([newAccount, ...accounts])
        setAccountSelected(newAccount)
    }

    const saveAccount = (account) => {
        // TODO: Aquí debemos hacer la petición con la información de la cuenta
        // y que se genere su id automáticamente por parte de firebase
        const newAccount = Object.assign({}, account)
        newAccount.id = accounts.length + 1
        return newAccount
    }

    const getAccount = (accountId, accounts) => {
        // Esto podría ser indefinido
        return accounts.find(account => account.id === accountId)
    }    

    const handleOnChangeAccount = (accountId) => {
        if (accountId === undefined) {
            setAccountSelected(undefined)
            return
        }
        // TODO: Aquí se podrá obtener el registro directo de base de datos 
        const account = getAccount(accountId, accounts)
        setAccountSelected(account)
    }

    return (
        <main className={ styles.MARContainer }>
            <MARAccountNavbar
                accountSelected={accountSelected}
                accounts={accounts}
                onChangeAccount={ handleOnChangeAccount }
            ></MARAccountNavbar>
            <MARAccount
                key={accountSelected && accountSelected.id || -1}
                account={accountSelected}
                onSaveAccount={ handleOnSaveAccount }
            ></MARAccount>
        </main>
    );
}

export default MARContainer
