import { useTranslation } from "react-i18next"
import MARInput from "../../../../../../../../../Generics/MARInput"
import styles from './MARAccountMovementsItemDesc.module.css'

const formatAmount = (amount) =>
    Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', signDisplay: 'always' }).format(amount)

const MARAccountMovementsItemDescription = ({
    id,
    description,
    amount,
    type,
    disabled,
    onDescriptionChange,
    descriptionError,
    onAmountChange,
    amountError
}) => {
    const { t, } = useTranslation()

    const getAmountValue = (amount) => {
        if (disabled) {
            return formatAmount(type === 'outcome' ? amount * -1 : amount)
        } else {
            return amount
        }
    }

    return (
        <div className={ styles.MARAccountMovementsItemDescription }>
            <MARInput
                id={ `description-${id}` }
                label={ t('accountMovementDescription') }
                value={ description }
                onInput={ onDescriptionChange }
                placeholder={ t('accountMovementDescription') }
                disabled={ disabled }
                variant={ disabled ? 'no-editable': '' }
                error={ descriptionError }
                />
            <MARInput
                id={ `${id}Amount` }
                label={ t('accountMovementAmount') }
                value={ getAmountValue(amount) }
                onInput={ onAmountChange }
                placeholder={ t('accountMovementAmount') }
                type={ disabled ? "text" : "number"}
                disabled={ disabled }
                variant={ disabled ? 'no-editable': '' }
                error={ amountError }
            />
        </div>
    )
}

export default MARAccountMovementsItemDescription
