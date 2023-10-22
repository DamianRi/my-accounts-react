import useStore from '../../../../state/userState'
import MARButton from '../../../Generics/MARButton'
import styles from './MARAccountNavbar.module.css'

const MARAccountNavbar = () => {

    const {
        accounts,
        currentAccount,
        setCurrentAccount,
    } = useStore()

    const accountsRender = accounts.map(account =>
        <MARButton
            key={account.id}
            content={account.name}
            variant={ account.id == currentAccount?.id ? 'solid' : 'outlined' }
            onEventClick={ (event) => {
                event.stopPropagation()
                setCurrentAccount(account)
            }}
        ></MARButton>
    )

    return (        
        <nav className={ styles.MARAccountNavbar }>
            { accounts.length > 0 && accountsRender }
            <MARButton
                key={-1}
                content="Agregar cuenta"
                variant={ currentAccount.id === undefined ? 'solid' : 'outlined' }
                prependIcon="fa-plus"
                onEventClick={ (event) => {
                    event.stopPropagation()
                    setCurrentAccount({})
                }}
            ></MARButton>
        </nav>
    )
}

export default MARAccountNavbar
