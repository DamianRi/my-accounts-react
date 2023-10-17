import { useTranslation } from "react-i18next"
import styles from "./MARAccountMovements.module.css"
import MARAccountMovementsItem from "./components/MARAccountMovementsItem"
import MARButton from "../../../../../Generics/MARButton"

const MARAccountMovements = ({ account }) => {
    const { t, } = useTranslation()

    const handleOnSaveIncomeMovement = (accountMovement) => {
        console.log('Creando ingreso', accountMovement)
    }

    const handleOnSaveOutcomeMovement = (accountMovement) => {
        console.log('Creando gasto', accountMovement)
    }

    return (
        <section className={ styles.MARAccountMovements }>
            <h2>{ t('accountMovementsTitle') }</h2>
            <div className={ styles.MARAccountMovementsActions }>
                <MARButton
                    content={ t('saveAccountIncomeMovementButton') }
                    variant='outlined-stretch'
                    prependIcon="fa-plus"
                    onClick={ handleOnSaveIncomeMovement }
                ></MARButton>
                <MARButton
                    content={ t('saveAccountOutcomeMovementButton') }
                    variant='solid-stretch'
                    prependIcon="fa-plus"
                    onClick={ handleOnSaveOutcomeMovement }
                ></MARButton>
                {/* TODO: Continuar manejando los eventos para crear los movimientos */}
            </div>
            {
                account?.movements && account.movements.map((movement, index) =>
                    <MARAccountMovementsItem key={index} movement={movement} />
                )
            }
        </section>
    )
}

export default MARAccountMovements
