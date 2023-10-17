import { useState } from "react"
import MARSelect from "../../../../../../../../../Generics/MARSelect"
import { useTranslation } from "react-i18next"

const MARAccountMovementsItemHeader = ({ id, type, creationDate }) => {
    const { t, } = useTranslation()
    const [movementType, setMovementType] = useState(type)
    const options = [
        { key: 0, text: t('accountMovementIncomeType') },
        { key: 1, text: t('accountMovementOutcomeType') },
    ]

    const handleOnMovementTypeChange = (event) => {
        setMovementType(event.target.value)
    }

    const creationDateFormat = () => {
        return Intl.DateTimeFormat().format(creationDate)
    }

    return (
        <div>
            <MARSelect
                id={id}
                label="Tipo"
                value={ movementType }
                options={ options }
                onChange={ handleOnMovementTypeChange }
            />
            {
                creationDate && <small>{ creationDateFormat }</small>
            }
        </div>
    )
}

export default MARAccountMovementsItemHeader
