import MARAccountDetail from './componentes/MARAccountDetail'
import MARAccountMovements from './componentes/MARAccountMovements'
import styles from './MARAccount.module.css'

const MARAccount = ({ account, movements, onSaveAccount, onSaveMovement }) => {

    const handleOnSaveAccount = (accountToSave) => {
        onSaveAccount(accountToSave)
    }

    const handleOnSaveMovement = (movement) => {
        onSaveMovement(movement)
    }

    return (
        <section className={ styles.MARAccount }>
            <h2>Cuenta</h2>
            <MARAccountDetail
                account={ account }
                movements={ movements }
                onSaveAccount={ handleOnSaveAccount }
            ></MARAccountDetail>
            {
                account && account.id &&
                <MARAccountMovements
                    movements={ movements }
                    onSaveMovement={ handleOnSaveMovement } />
            }
        </section>
    )
}

export default MARAccount
