import styles from './MARSelect.module.css'
/**
 * Create a react select component
 *
 * @param {options} must be a list of items with form { key: <value>, text: <string> } 
 * @returns react <select> component
 */
const MARSelect = ({ id, label, value, options, onChange, disabled, variant }) => {
    const variantSelectorClass = () => {
        switch (variant) {
            case 'no-editable':
                return styles.MARSelectorNoFocusable  
            default:
                return styles.MARSelector
        }
    }

    return (
        <div className={ styles.MARSelect }>
            <label htmlFor={id}>
                <p>{ label }</p>
                <div className={ variantSelectorClass() }>
                    <select
                        id={id}
                        name={id}
                        value={ value }
                        disabled={ disabled || variant === 'no-editable' }
                        onChange={ (event) => onChange(event) }
                    >
                        {
                            options.map(
                                (option, index) => <option key={ index } value={ index }>{ option }</option>)
                        }
                    </select>
                </div>
            </label>
        </div>
    )
}

export default MARSelect
