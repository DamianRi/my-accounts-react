import MARAccountDetail from './componentes/MARAccountDetail'
import MARAccountMovements from './componentes/MARAccountMovements'
import styles from './MARAccount.module.css'

const MARAccount = ({ account, onSaveAccount }) => {

    const handleOnSaveAccount = (accountToSave) => {
        onSaveAccount(accountToSave)
    }

    return (
        <section className={ styles.MARAccount }>
            <MARAccountDetail
                account={ account }
                onSaveAccount={ handleOnSaveAccount }
            ></MARAccountDetail>
            {
                account && account.id && <MARAccountMovements account={ account }></MARAccountMovements>
            }
        </section>
    )
}

export default MARAccount
