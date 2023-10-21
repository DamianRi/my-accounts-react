import { useState } from 'react';
import { login, logout } from '../../firebase_auth_google_provider';
import MARButton from '../Generics/MARButton';
import styles from './MARHeader.module.css'

const MARHeader = ({ title }) => {

    const [user, setUser] = useState({})

    const handleLoginClick = async () => {
        await login()
            .then((result) => {
                setUser(result.user)
            })
            .catch((error) => {
                console.error("Login error ", error)
            })
    }

    const handleLogoutClick = async () => {
        await logout()
            .then(() => {
                setUser({})
            })
            .catch((error) => {
                console.error("Logout error ", error)
            })
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
        </header>
    )
}

export default MARHeader;
