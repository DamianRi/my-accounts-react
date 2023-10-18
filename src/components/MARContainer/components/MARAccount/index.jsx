import MARAccountDetail from './componentes/MARAccountDetail'
import MARAccountMovements from './componentes/MARAccountMovements'
import styles from './MARAccount.module.css'

const MARAccount = ({ account, movements, onSaveAccount, onSaveMovement }) => {

    console.log('Movements ', movements)
    
    const handleOnSaveAccount = (accountToSave) => {
        onSaveAccount(accountToSave)
    }

    const handleOnSaveMovement = (movement) => {
        onSaveMovement(movement)
    }

    return (
        <section className={ styles.MARAccount }>
            <MARAccountDetail
                account={ account }
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
