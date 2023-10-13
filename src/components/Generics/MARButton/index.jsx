import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MARButton.module.css'

const MARButton = ({ content, variant, prependIcon, appendIcon, onClick }) => {

    const variantClass = () => {
        switch (variant) {
            case 'solid':
                return styles.MARSolidButton
            case 'outlined':
                return styles.MAROutlinedButton
            default:
                return styles.MARButton
        }
    }

    return (
        <button className={variantClass()} onClick={onClick}>
            { prependIcon && <span className={styles.AppendIcon}><FontAwesomeIcon icon={`fa-solid ${prependIcon}`} /></span>}
            { content }
            { appendIcon && <span className={styles.PrependIcon}><FontAwesomeIcon icon={`fa-solid ${appendIcon}`} /></span>}
        </button>
    )
}

export default MARButton
