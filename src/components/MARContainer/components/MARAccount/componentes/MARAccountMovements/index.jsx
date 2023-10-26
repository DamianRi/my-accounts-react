import { useTranslation } from "react-i18next"
import styles from "./MARAccountMovements.module.css"
import MARAccountMovementsItem from "./components/MARAccountMovementsItem"
import MARButton from "../../../../../Generics/MARButton"
import { useState } from "react"

const MARAccountMovements = ({ movements, onSaveMovement }) => {
    const { t, } = useTranslation()

    const incomeMovementType = 'income'
    const outcomeMovementType = 'outcome'
    const [addNewMovement, setAddNewMovement] = useState(false)
    const [newMovementType, setNewMovementType] = useState(incomeMovementType)

    const handleOnCreateIncomeMovement = () => {
        setNewMovementType(incomeMovementType)
        setAddNewMovement(true)
    }
    
    const handleOnCreateOutcomeMovement = () => {
        setNewMovementType(outcomeMovementType)
        setAddNewMovement(true)
    }

    const handleOnSaveMovement = (movement) => {
        onSaveMovement(movement)
        setAddNewMovement(false)
    }

    const handleOnCancelMovement = () => {
        setAddNewMovement(false)
    }

    return (
        <section className={ styles.MARAccountMovements }>
            <h2>{ t('accountMovementsTitle') }</h2>
            <div className={ styles.MARAccountMovementsActions }>
                <MARButton
                    content={ t('saveAccountIncomeMovementButton') }
                    variant='outlined-secondary-stretch'
                    prependIcon="fa-arrow-trend-up"
                    onEventClick={ handleOnCreateIncomeMovement }
                ></MARButton>
                <MARButton
                    content={ t('saveAccountOutcomeMovementButton') }
                    variant='outlined-secondary-stretch'
                    appendIcon="fa-arrow-trend-down"
                    onEventClick={ handleOnCreateOutcomeMovement }
                ></MARButton>
            </div>
            <div className={ styles.MARAccountMovementsList }>
                {
                    addNewMovement &&
                    <MARAccountMovementsItem
                        id={-1}
                        type={ newMovementType }
                        description={''}
                        creationDate={new Date()}
                        editable={ true }
                        onSaveMovement={ handleOnSaveMovement }
                        onCancelMovement={ handleOnCancelMovement }
                    />
                }
                {
                    movements.map((movement) => {
                        return <MARAccountMovementsItem
                            key={`account-movement-${movement.id}`}
                            id={movement.id}
                            type={movement.type}
                            description={movement.description}
                            amount={movement.amount}
                            editable={ false }
                            creationDate={new Date(movement.creationDate)}
                        />
                    })
                }
            </div>
        </section>
    )
}

export default MARAccountMovements
