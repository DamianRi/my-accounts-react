import { useTranslation } from "react-i18next"
import MARButton from "../../../../../../../Generics/MARButton"
import MARAccountMovementsItemDescription from "./components/MARAccountMovementsItemDescription"
import MARAccountMovementsItemHeader from "./components/MARAccountMovementsItemHeader"
import styles from './MARAccountMovementsItem.module.css'
import { useState } from "react"

const MARAccountMovementsItem = ({ id, type, description, amount, creationDate, editable, onSaveMovement, onCancelMovement }) => {
    const { t, } = useTranslation()

    const [ descriptionState, setDescriptionState ] = useState(description)
    const [ amountState, setAmountState ] = useState(amount)

    const [movementDescriptionError, setmovementDescriptionError] = useState('')
    const [movementAmountError, setmovementAmountError] = useState('')

    const validateRequiredFields = () => {
        let noErrorsInForm = true
        if (descriptionState.length <= 0) {
            noErrorsInForm = false
            setmovementDescriptionError(t('accountMovementDescriptionError'))
        }
        if (amountState <= 0) {
            noErrorsInForm = false
            setmovementAmountError(t('accountMovementAmountError'))
        }
        return noErrorsInForm
    }

    const handleOnDescriptionChange = (event) => {
        setDescriptionState(event.target.value)
    }

    const handleOnAmountChange = (event) => {
        setAmountState(event.target.value)
    }

    const handleOnSaveMovement = (event) => {
        event.preventDefault()
        if (validateRequiredFields()) {            
            const newMovement = {
                description: descriptionState,
                amount: amountState,
            }
            onSaveMovement(newMovement)
        }
    }

    const handleOnCancelMovement = (event) => {
        event.preventDefault()
        onCancelMovement()
    }

    return (
        <form className={ styles.MARAccountMovementsItem }>
            <MARAccountMovementsItemHeader
                type={ type }
                creationDate={ creationDate }
            ></MARAccountMovementsItemHeader>
            <MARAccountMovementsItemDescription
                id={id}
                description={ descriptionState }
                amount={ amountState }
                onDescriptionChange={ handleOnDescriptionChange }
                descriptionError={ movementDescriptionError }
                onAmountChange={ handleOnAmountChange }
                amountError={ movementAmountError }
                disabled={ !editable }
            ></MARAccountMovementsItemDescription>
            {
                editable &&
                <div className={ styles.MARAccountMovementsItemActions }>
                    <MARButton
                        content={ t('cancelButton') }
                        variant="outlined-secondary-stretch"
                        onEventClick={ handleOnCancelMovement }
                    ></MARButton>
                    <MARButton
                        content={ t('saveButton') }
                        variant="solid-secondary-stretch"
                        onEventClick={ handleOnSaveMovement }
                    ></MARButton>
                </div>
            }
        </form>
    )
}

export default MARAccountMovementsItem
