import MARAccountDetail from './componentes/MARAccountDetail'
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
        </section>
    )
}

export default MARAccount
