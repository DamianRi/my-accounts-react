import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MARButton.module.css'

const MARButton = ({ content, variant, prependIcon, appendIcon, onEventClick }) => {

    const variantClass = () => {
        switch (variant) {
            case 'solid':
                return styles.MARSolidButton
            case 'outlined':
                return styles.MAROutlinedButton
            case 'solid-stretch':
                return styles.MARSolidStretchButton
            case 'outlined-stretch':
                return styles.MAROutlinedButtonStretch
            case 'solid-secondary':
                return styles.MARSolidSecondaryButton
            case 'outlined-secondary':
                return styles.MAROutlinedSecondaryButton
            case 'solid-secondary-stretch':
                return styles.MARSolidSecondaryStretchButton
            case 'outlined-secondary-stretch':
                return styles.MAROutlinedSecondaryStretchButton
            default:
                return styles.MARButton
        }
    }

    return (
        <button className={variantClass()} onClick={onEventClick}>
            { prependIcon && <span className={styles.PrependIcon}><FontAwesomeIcon icon={`fa-solid ${prependIcon}`} /></span>}
            { content }
            { appendIcon && <span className={styles.AppendIcon}><FontAwesomeIcon icon={`fa-solid ${appendIcon}`} /></span>}
        </button>
    )
}

export default MARButton
