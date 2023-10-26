import { useState } from "react"
import styles from './MARAccountDetail.module.css'
import { useTranslation } from "react-i18next"
import MARButton from "../../../../../Generics/MARButton"
import MARInput from "../../../../../Generics/MARInput"
// import MARSelect from "../../../../../Generics/MARSelect"
import useStore from "../../../../../../state/userState"

const formatAmount = (amount) => Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount)

const MARAccountDetail = ({ account, onSaveAccount }) => {
    const { t, } = useTranslation()

    const {
        currentAccount,
        currentAccountMovements
    } = useStore()

    const isNewAccount = account?.id === undefined

    const [accountName, setAccountName] = useState(currentAccount?.name ?? '')

    // TODO: Manejar posteriormente el periodo de los movimientos
    // const [periodIndex, setPeriodIndex] = useState(new Date().getMonth())

    const [accountBudget, setAccounIncomes] = useState(currentAccount?.budget || '')
    const incomesFormat = formatAmount(accountBudget || 0)

    // const [accountOutcomes, setOutcomes] = useState(currentAccount?.outcomes ?? 0)
    // const outcomesFormat = formatAmount(accountOutcomes)

    const getDifference = () => {
        const outcomesByMovements = currentAccountMovements
            .filter((movement) => movement.type === 'outcome')
            .reduce((accumulator, movement) => accumulator + parseFloat(movement.amount), 0)
        const incomesByMovements = currentAccountMovements
            .filter((movement) => movement.type === 'income')
            .reduce((accumulator, movement) => accumulator + parseFloat(movement.amount), 0)
        const incomesTotal = parseFloat(accountBudget || 0) + incomesByMovements 
        const outcomesTotal = outcomesByMovements 
        return incomesTotal - outcomesTotal
    }
    const differenceFormat = formatAmount(getDifference())

    const [accountNameError, setAccountNameError] = useState('')
    const [accountIncomesError, setAccountIncomesError] = useState('')

    // const months = [
    //     t('january'),
    //     t('february'),
    //     t('march'),
    //     t('april'),
    //     t('may'),
    //     t('june'),
    //     t('july'),
    //     t('agust'),
    //     t('september'),
    //     t('october'),
    //     t('november'),
    //     t('dicember'),
    // ]

    const validateRequiredFields = () => {
        let noErrorsInForm = true
        if (accountName.length <= 0) {
            noErrorsInForm = false
            setAccountNameError(t('accountNameRequiredError'))
        }
        if (!accountBudget || accountBudget <= 0) {
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
                budget: accountBudget,
                // outcomes: accountOutcomes,
            }
            onSaveAccount(accountPrepared)
        }
    }

    // const handleOnPeriodChange = (event) => {
    //     setPeriodIndex(event.target.value)
    // }

    const handleOnAccountNameChange = (event) => {
        setAccountName(event.target.value)
        setAccountNameError('')
    }

    const handleOnAccountIncomesChange = (event) => {
        setAccounIncomes(event.target.value)
        setAccountIncomesError('')
    }

    // const handleOnAccountOutcomesChange = (event) => {
    //     setOutcomes(event.target.value)
    // }

    return (
        <form className={ styles.MARAccountDetailForm } key={ account?.id ?? -1 }>
            {/* 
            TODO: Manejar posteriormente el periodo de los movimientos
            <MARSelect
                id="accountPeriod"
                label={ t('accountPeriod') }
                value={ periodIndex }
                options={ months }
                onChange={ handleOnPeriodChange }
                disabled={ isNewAccount }
                variant={ !isNewAccount ? '' : 'no-editable' }
            />
            */}
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
                label={t('accountBudgetField')}
                id='accountBudget'
                value={ isNewAccount ? accountBudget : incomesFormat }
                onInput={ handleOnAccountIncomesChange }
                placeholder={t('accountIncomesFieldPlaceholder')}
                disabled={!isNewAccount}
                error={accountIncomesError}
                type={ isNewAccount ? 'number' : 'text' }
                variant={ isNewAccount ? '' : 'no-editable'} />
            {/* <MARInput
                label={ t('accountOutcomesField') }
                id='accountOutcomes'
                value={ isNewAccount ? accountOutcomes : outcomesFormat }
                onInput={ handleOnAccountOutcomesChange }
                placeholder={ t('accountOutcomesFieldPlaceholder') }
                disabled={!isNewAccount}
                type={ isNewAccount ? 'number' : 'text' }
                variant={ isNewAccount ? '' : 'no-editable'} /> */}
            <MARInput
                label={ t('acountRemainingLabel') }
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
