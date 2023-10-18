import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MARAccountMovementsItemHeader.module.css'
import { useTranslation } from 'react-i18next'

const MARAccountMovementsItemHeader = ({ type, creationDate }) => {
    const { t, } = useTranslation()

    const creationDateFormat = (date) => Intl.DateTimeFormat().format(date)

    const movementTypeTag = () => {
        if (type === 'outcome') {
            return (
                <div>
                    <span>{ t('accountMovementOutcomeType') }</span> <FontAwesomeIcon icon="fa-solid fa-arrow-trend-down" />
                </div>
            )
        } else {
            return (
                <div>
                    <span>{ t('accountMovementIncomeType') }</span> <FontAwesomeIcon icon="fa-solid fa-arrow-trend-up" />
                </div>
            )
        }
    }

    return (
        <div className={ styles.MARAccountMovementsItemHeader}>
            { movementTypeTag() }
            <span>{ creationDateFormat(creationDate) }</span>
        </div>
    )
}

export default MARAccountMovementsItemHeader
