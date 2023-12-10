import { login, logout } from '../../firebase/firebase_auth_google_provider';
import MARButton from '../Generics/MARButton';
import styles from './MARHeader.module.css'
import { addUser } from '../../firebase/firebase_firestore_users';
import useStore from '../../state/userState';
import MARAccountNavbar from './components/MARAccountNavbar';
import MARErrorHandler from './components/MARErrorHandler';
import MARSuccessMessage from './components/MARSuccessMessage';

const MARHeader = ({ title }) => {

    const {
        setIsLoading,
        user,
        setUser,
        removeUser,
        fetchAccounts,
        clearAccounts,
        setError,
        setCurrentAccount,
        setSuccessMessage,
    } = useStore()

    const handleLoginClick = async () => {
        setIsLoading(true);
        await login()
            .then((result) => {
                setUser(result.user)
                addUser(result.user)
                    .then(() => {
                        fetchAccounts()
                    })
                    .catch(() => setError('No se ha podido obtener la información del usuario.'))
                setSuccessMessage("Se ha iniciado sesión.")
            })
            .catch((error) => {
                setError(error.toString())
            })
            .finally(() => setIsLoading(false))
    }

    const handleLogoutClick = async () => {
        await logout()
            .then(() => {
                setIsLoading(true)
                removeUser()
                clearAccounts()
                setCurrentAccount({})
                setSuccessMessage("Se ha cerrado la sesión.")
            })
            .catch((error) => {
                setError(error.toString())
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <header className={styles.Header}>
            <div className={styles.HeaderTitle}>
                <h1>{ title }</h1>
                {
                    user.displayName
                    ? <MARButton content="Cerrar sesión" variant="outlined" onEventClick={handleLogoutClick} />
                    : <MARButton content="Iniciar sesión" variant="outlined" onEventClick={handleLoginClick} />
                }
            </div>
            {
                user.displayName &&
                <div className={styles.HeaderUser}>
                    <img src={user.photoURL} alt="Avatar del usuario" />
                    <p>
                        {user.displayName}
                    </p>
                </div>
            }
            <MARSuccessMessage></MARSuccessMessage>
            <MARErrorHandler></MARErrorHandler>
            <MARAccountNavbar></MARAccountNavbar>
        </header>
    )
}

export default MARHeader;
