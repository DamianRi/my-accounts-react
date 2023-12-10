import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useStore from "../../../../state/userState"
import styles from './MARErrorHandler.module.css'

const MARErrorHandler = () => {
    const { error, setError } = useStore()

    return (
        <>
        {
            error &&
            <div className={ styles.MARErrorHandler }>
                <div className={ styles.MARErrorHandlerContainer }>
                    <span>
                        <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
                        Error
                    </span>
                    <p>{ JSON.stringify(error) }</p>
                </div>
                <button onClick={ () => setError(null) }>
                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </button>
            </div>
        }
        </>
    )
}

export default MARErrorHandler
