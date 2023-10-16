import { useState } from "react"
import styles from './MARAccountDetail.module.css'
import MARButton from "../../../../../Generics/MARButton"
import { useTranslation } from "react-i18next"
import MARInput from "../../../../../Generics/MARInput"

const formatAmount = (amount) => Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount)

const MARAccountDetail = ({ account, onSaveAccount }) => {
    const { t, } = useTranslation()

    const isNewAccount = account === undefined

    const [accountName, setAccountName] = useState(account ? account.name : '')
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth())

    const [accountIncomes, setAccounIncomes] = useState(account && account.incomes || 0)
    const incomesFormat = formatAmount(accountIncomes)
    
    const [accountOutcomes, setOutcomes] = useState(account && account.outcomes || 0)
    const outcomesFormat = formatAmount(accountOutcomes)

    const difference = accountIncomes - accountOutcomes
    const differenceFormat = formatAmount(difference)

    const [accountNameError, setAccountNameError] = useState('')
    const [accountIncomesError, setAccountIncomesError] = useState('')

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

    const validateRequiredFields = () => {
        let noErrorsInForm = true
        if (accountName.length <= 0) {
            noErrorsInForm = false
            setAccountNameError(t('accountNameRequiredError'))
        }
        if (accountIncomes <= 0) {
            noErrorsInForm = false
            setAccountIncomesError(t('accountIncomesRequiredError'))
        }
        return noErrorsInForm
    }

    const handleOnSaveAccount = (event) => {
        event.preventDefault()

        if (!validateRequiredFields()) {
            // TODO: Aquí se debería actualizar el estado del error para manejar dichos eventos
            console.log('Llevar los campos faltantes', accountNameError, accountIncomesError)
        } else {
            const accountPrepared = {
                name: accountName,
                incomes: accountIncomes,
                outcomes: accountOutcomes,
            }
            onSaveAccount(accountPrepared)
        }
    }

    const handleMonthChange = (event) => {
        setMonthIndex(event.target.value)
    }

    const handleAccountNameChange = (event) => {
        setAccountName(event.target.value)
        setAccountNameError('')
    }

    const handleAccountIncomesChange = (event) => {
        setAccounIncomes(event.target.value)
        setAccountIncomesError('')
    }

    const handleAccountOutcomesChange = (event) => {
        setOutcomes(event.target.value)
    }

    return (
        <form className={ styles.MARAccountDetailForm } key={ account?.id ?? -1 }>
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
            <MARInput
                label={t('accountNameField')}
                id='accountName'
                value={accountName}
                onInput={ handleAccountNameChange }
                placeholder={t('accountNameFieldPlaceholder')}
                disabled={!isNewAccount}
                error={accountNameError}
                variant={ isNewAccount ? '' : 'no-editable' }/>
            <MARInput
                label={t('accountIncomesField')}
                id='accountIncomes'
                value={ isNewAccount ? accountIncomes : incomesFormat }
                onInput={ handleAccountIncomesChange }
                placeholder={t('accountIncomesFieldPlaceholder')}
                disabled={!isNewAccount}
                error={accountIncomesError}
                type={ isNewAccount ? 'number' : 'text' }
                variant={ isNewAccount ? '' : 'no-editable'} />
            <MARInput
                label={ t('accountOutcomesField') }
                id='accountOutcomes'
                value={ isNewAccount ? accountOutcomes : outcomesFormat }
                onInput={ handleAccountOutcomesChange }
                placeholder={ t('accountOutcomesFieldPlaceholder') }
                disabled={!isNewAccount}
                type="number"
                variant={ isNewAccount ? '' : 'no-editable'} />
            <MARInput
                label={ t('accountBudgetField') }
                id='accountRest'
                value={differenceFormat}
                disabled={true}
                variant='no-editable' />

            {
                isNewAccount &&
                <MARButton
                    content={ t('saveButton') }
                    variant="solid-stretch"
                    onClick={ handleOnSaveAccount }
                ></MARButton>
            }
        </form>
    )
}

export default MARAccountDetail
