import { useState } from "react"
import styles from './MARAccountDetail.module.css'
import MARButton from "../../../../../Generics/MARButton"
import { useTranslation } from "react-i18next"
import MARInput from "../../../../../Generics/MARInput"
import MARSelect from "../../../../../Generics/MARSelect"

const formatAmount = (amount) => Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount)

const MARAccountDetail = ({ account, movements, onSaveAccount }) => {
    const { t, } = useTranslation()

    const isNewAccount = account === undefined

    const [accountName, setAccountName] = useState(account ? account.name : '')
    const [periodIndex, setPeriodIndex] = useState(new Date().getMonth())

    const [accountIncomes, setAccounIncomes] = useState(account && account.incomes || 0)
    const incomesFormat = formatAmount(accountIncomes)
    
    const [accountOutcomes, setOutcomes] = useState(account && account.outcomes || 0)
    const outcomesFormat = formatAmount(accountOutcomes)

    const getDifference = () => {
        const outcomesByMovements = movements
            .filter((movement) => movement.type === 'outcome')
            .reduce((accumulator, movement) => accumulator + parseFloat(movement.amount), 0)
        const incomesByMovements = movements
            .filter((movement) => movement.type === 'income')
            .reduce((accumulator, movement) => accumulator + parseFloat(movement.amount), 0)
        const incomesTotal = parseFloat(accountIncomes) + incomesByMovements 
        const outcomesTotal = parseFloat(accountOutcomes) + outcomesByMovements 
        return incomesTotal - outcomesTotal
    }
    const differenceFormat = formatAmount(getDifference())

    const [accountNameError, setAccountNameError] = useState('')
    const [accountIncomesError, setAccountIncomesError] = useState('')

    const months = [
        t('january'),
        t('february'),
        t('march'),
        t('april'),
        t('may'),
        t('june'),
        t('july'),
        t('agust'),
        t('september'),
        t('october'),
        t('november'),
        t('dicember'),
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
            return
        } else {
            const accountPrepared = {
                name: accountName,
                incomes: accountIncomes,
                outcomes: accountOutcomes,
            }
            onSaveAccount(accountPrepared)
        }
    }

    const handleOnPeriodChange = (event) => {
        setPeriodIndex(event.target.value)
    }

    const handleOnAccountNameChange = (event) => {
        setAccountName(event.target.value)
        setAccountNameError('')
    }

    const handleOnAccountIncomesChange = (event) => {
        setAccounIncomes(event.target.value)
        setAccountIncomesError('')
    }

    const handleOnAccountOutcomesChange = (event) => {
        setOutcomes(event.target.value)
    }

    return (
        <form className={ styles.MARAccountDetailForm } key={ account?.id ?? -1 }>
            <MARSelect
                id="accountPeriod"
                label={ t('accountPeriod') }
                value={ periodIndex }
                options={ months }
                onChange={ handleOnPeriodChange }
                disabled={ isNewAccount }
                variant={ !isNewAccount ? '' : 'no-editable' }
            />
            <MARInput
                label={t('accountNameField')}
                id='accountName'
                value={accountName}
                onInput={ handleOnAccountNameChange }
                placeholder={t('accountNameFieldPlaceholder')}
                disabled={!isNewAccount}
                error={accountNameError}
                variant={ isNewAccount ? '' : 'no-editable' }/>
            <MARInput
                label={t('accountIncomesField')}
                id='accountIncomes'
                value={ isNewAccount ? accountIncomes : incomesFormat }
                onInput={ handleOnAccountIncomesChange }
                placeholder={t('accountIncomesFieldPlaceholder')}
                disabled={!isNewAccount}
                error={accountIncomesError}
                type={ isNewAccount ? 'number' : 'text' }
                variant={ isNewAccount ? '' : 'no-editable'} />
            <MARInput
                label={ t('accountOutcomesField') }
                id='accountOutcomes'
                value={ isNewAccount ? accountOutcomes : outcomesFormat }
                onInput={ handleOnAccountOutcomesChange }
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
                    onEventClick={ handleOnSaveAccount }
                ></MARButton>
            }
        </form>
    )
}

export default MARAccountDetail
