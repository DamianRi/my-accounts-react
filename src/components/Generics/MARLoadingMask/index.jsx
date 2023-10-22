import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "../../../state/userState"
import styles from './MARLoadingMask.module.css'
import { useTranslation } from "react-i18next";

const MARLoadingMask = () => {
    const { t, } = useTranslation()
    const { isLoading } = useStore();

    return (
        <>
            {
                isLoading &&
                <div className={ styles.MARLoadingMask }>
                    <p>{ t('loading')}...</p>
                    <FontAwesomeIcon icon="fa-solid fa-spinner" spin />
                </div>
            }
        </>
    )
}

export default MARLoadingMask
