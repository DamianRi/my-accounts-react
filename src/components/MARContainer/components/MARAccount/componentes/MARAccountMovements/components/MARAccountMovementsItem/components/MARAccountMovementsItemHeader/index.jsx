import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MARAccountMovementsItemHeader.module.css'
import { useTranslation } from 'react-i18next'

const MARAccountMovementsItemHeader = ({ type, creationDate }) => {
    const { t, } = useTranslation()

    const creationDateFormat = (date) => Intl.DateTimeFormat(
        'es-MX',
        { weekday: 'short', day: '2-digit', month: 'short', year: '2-digit' }).format(date)

    const movementTypeTag = () => {
        if (type === 'outcome') {
            return (
                <div className={ styles.MARAccountMovementOutcomeType }>
                    <span>{ t('accountMovementOutcomeType') }</span>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-trend-down" />
                </div>
            )
        } else {
            return (
                <div className={ styles.MARAccountMovementIncomeType }>
                    <span>{ t('accountMovementIncomeType') }</span>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-trend-up" />
                </div>
            )
        }
    }

    return (
        <div className={ styles.MARAccountMovementsItemHeader }>
            { movementTypeTag() }
            <span>{ creationDateFormat(creationDate) }</span>
        </div>
    )
}

export default MARAccountMovementsItemHeader
