import styles from './MARHeader.module.css'

const MARHeader = ({ title }) => {
    return (
        <header className={styles.Header}>
            <h1>{ title }</h1>
        </header>
    )
}

export default MARHeader;
