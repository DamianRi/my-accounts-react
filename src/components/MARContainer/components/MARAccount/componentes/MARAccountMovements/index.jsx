import { useTranslation } from "react-i18next"
import styles from "./MARAccountMovements.module.css"
import MARAccountMovementsItem from "./components/MARAccountMovementsItem"
import MARButton from "../../../../../Generics/MARButton"
import { useState } from "react"

const MARAccountMovements = ({ movements, onSaveMovement }) => {
    const { t, } = useTranslation()

    const incomeMovementType = 'income' // t('accountMovementIncomeType')
    const outcomeMovementType = 'outcome' // t('accountMovementOutcomeType')
    const [addNewMovement, setAddNewMovement] = useState(false)
    const [newMovementType, setNewMovementType] = useState(incomeMovementType)

    const handleOnCreateIncomeMovement = () => {
        setAddNewMovement(true)
        setNewMovementType(incomeMovementType)
    }
    
    const handleOnCreateOutcomeMovement = () => {
        setAddNewMovement(true)
        setNewMovementType(outcomeMovementType)
    }

    const handleOnSaveMovement = (movement) => {
        onSaveMovement(movement)
        setAddNewMovement(false)
    }

    return (
        <section className={ styles.MARAccountMovements }>
            <h2>{ t('accountMovementsTitle') }</h2>
            <div className={ styles.MARAccountMovementsActions }>
                <MARButton
                    content={ t('saveAccountIncomeMovementButton') }
                    variant='outlined-stretch'
                    prependIcon="fa-plus"
                    onClick={ handleOnCreateIncomeMovement }
                ></MARButton>
                <MARButton
                    content={ t('saveAccountOutcomeMovementButton') }
                    variant='solid-stretch'
                    prependIcon="fa-plus"
                    onClick={ handleOnCreateOutcomeMovement }
                ></MARButton>
            </div>
            <div className={ styles.MARAccountMovementsList }>
                {
                    addNewMovement &&
                    <MARAccountMovementsItem
                        type={newMovementType}
                        description={''}
                        amount={0}
                        creationDate={new Date()}
                        editable={ true }
                        onSaveMovement={ handleOnSaveMovement }
                    />
                }
                {
                    movements.map((movement, index) => {
                        return <MARAccountMovementsItem
                            key={index}
                            id={index}
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
