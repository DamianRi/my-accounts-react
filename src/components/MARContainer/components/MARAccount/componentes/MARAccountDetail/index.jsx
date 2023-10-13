import { useState } from "react"
import styles from './MARAccountDetail.module.css'
import MARButton from "../../../../../Generics/MARButton"

const formatAmount = (amount) => Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount)

const MARAccountDetail = ({ account, onSaveAccount }) => {
    const isNewAccount = account === undefined

    const [accountName, setAccountName] = useState(account && account.name || '')
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth())

    const [incomes, setIncomes] = useState(account && account.incomes || 0)
    const incomesFormat = formatAmount(incomes)
    
    const [outcomes, setOutcomes] = useState(account && account.outcomes || 0)
    const outcomesFormat = formatAmount(outcomes)

    const difference = incomes - outcomes
    const differenceFormat = formatAmount(difference)

    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ]

    const handleOnSaveAccount = () => {
        const accountPrepared = {
            name: accountName,
            incomes: incomes,
            outcomes: outcomes,
        }
        onSaveAccount(accountPrepared)
    }

    const handleAccountNameChange = (event) => {
        setAccountName(event.target.value)
    }

    const handleMonthChange = (event) => {
        setMonthIndex(event.target.value)
    }

    const handleIncomesChange = (event) => {
        setIncomes(event.target.value)
    }

    const handleOutcomesChange = (event) => {
        setOutcomes(event.target.value)
    }

    // TODO: Agregar validación sobre los campos a llenar

    return (
        <div className={ styles.MARAccountDetail } key={ account?.id ?? -1 }>
            <div className={ styles.MARAccountDetailHeader }>
                {
                    isNewAccount
                    ? <input type="text"
                        name="accountName"
                        value={ accountName }
                        onInput={ handleAccountNameChange }
                        disabled={ !isNewAccount }
                        id="accountName"
                        placeholder="Cuenta" />
                    : <p>{ accountName }</p>
                }
                <select
                    name="monthSelected"
                    value={ monthIndex }
                    disabled={ isNewAccount }
                    onChange={ handleMonthChange }
                >
                    { months.map(
                        (month, index) =>
                            <option key={ index } value={ index }>{ month }</option>
                        )
                    }
                </select>
            </div>
            <div className={ styles.MARAccountDetailIncomes }>
                <p>INGRESOS</p>
                {
                    isNewAccount
                    ? <input type="number"
                        name="incomes"
                        value={ incomes }
                        onInput={ handleIncomesChange }
                        id="incomes"
                        placeholder="Ingreso inicial" />
                    : <p>{ incomesFormat }</p> 
                }
            </div>
            <div className={ styles.MARAccountDetailOutcomes }>
                <p>GASTOS</p>
                {
                    isNewAccount
                    ? <input type="number"
                        name="outcomes"
                        value={ outcomes }
                        onInput={ handleOutcomesChange }
                        id="outcomes"
                        placeholder="Gasto inicial" />
                    : <p>{ outcomesFormat }</p> 
                }
            </div>
            <div className={ styles.MARAccountDetailDifference }>
                <p>DIFERENCIA</p><p>{ differenceFormat }</p>
            </div>
            {
                isNewAccount &&
                <MARButton
                    content="Guardar"
                    variant="outlined"
                    onClick={ handleOnSaveAccount }
                ></MARButton>
            }
        </div>
    )
}

export default MARAccountDetail
