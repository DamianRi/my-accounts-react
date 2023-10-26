import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MARInput.module.css'

const MARInput = ({
    label,
    id,
    value,
    onInput,
    placeholder,
    disabled,
    error,
    type = 'text',
    prependIcon,
    appendIcon,
    variant = 'editable',
    autoFocus,
}) => {
    const prependIconComponent = () => {
        const icon = `fa-solid ${prependIcon}`
        return prependIcon && <FontAwesomeIcon icon={icon} />
    }

    const appendIconComponent = () => {
        const icon = `fa-solid ${appendIcon}`
        return appendIcon && <FontAwesomeIcon icon={icon} />
    }

    const variantContentClass = () => {
        switch (variant) {
            case 'no-editable':
                return styles.MARInputContentNoFocusable  
            default:
                return styles.MARInputContent
        }
    }

    return (
        <div className={ styles.MARInput }>
            <label htmlFor={ id }>
                <p>{ label }</p>
                <div className={ variantContentClass() }>
                    { prependIconComponent() }
                    <input
                        type={ type }
                        name={ id }
                        value={ value }
                        onChange={ (event) => onInput(event) }
                        disabled={ disabled || variant === 'no-editable' }
                        id={ id }
                        placeholder={ placeholder }
                        autoFocus={ autoFocus }
                    />
                    {
                        error &&
                        <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" className={styles.MARError} />
                    }
                    { appendIconComponent() }
                </div>  
            </label>
            { error && <small className={ styles.MARError }>{error}</small> }
        </div>
    )
}

export default MARInput
