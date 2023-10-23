import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useStore from "../../../../state/userState"
import styles from './MARSuccessMessage.module.css'

const MARSuccessMessage = () => {
    const { successMessage, setSuccessMessage } = useStore()

    if (successMessage) {
        setTimeout(() => {
            setSuccessMessage(null)
        }, 3_000);
    }

    return (
        <>
        {
            successMessage &&
            <div className={ styles.MARSuccessMessage }>
                <div>
                    <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                    <p>{ successMessage }</p>
                </div>
                <button onClick={ () => setSuccessMessage(null) }>
                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </button>
            </div>
        }
        </>
    )
}

export default MARSuccessMessage
