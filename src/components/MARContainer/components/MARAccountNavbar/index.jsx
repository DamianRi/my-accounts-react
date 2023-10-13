import MARButton from '../../../Generics/MARButton'
import styles from './MARAccountNavbar.module.css'

const MARAccountNavbar = ({ accountSelected, accounts, onChangeAccount }) => {

    const accountsRender = accounts.map(account =>
        <MARButton key={account.id} content={account.name}
            variant={ account.id == accountSelected?.id ? 'solid' : 'outlined' }
            onClick={ (event) => {
                event.stopPropagation()
                onChangeAccount(account.id)
            }}
        ></MARButton>
    )

    return (        
        <nav className={ styles.MARAccountNavbar }>
            { accounts.length > 0 && accountsRender }
            <MARButton key={-1} content="Agregar cuenta"
                variant={ accountSelected === undefined ? 'solid' : 'outlined' } prependIcon="fa-plus"
                onClick={ (event) => {
                    event.stopPropagation()
                    onChangeAccount(undefined)
                }}
            ></MARButton>
        </nav>
    )
}

export default MARAccountNavbar
