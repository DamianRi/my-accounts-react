import './App.css'
import MARLoadingMask from './components/Generics/MARLoadingMask'
import MARContainer from './components/MARContainer'
import MARHeader from './components/MARHeader'
import { useTranslation } from 'react-i18next'

function App() {
    const { t, } = useTranslation()
    return (
      <>
        <MARLoadingMask></MARLoadingMask>        
        <MARHeader title={ t("appName") }></MARHeader>
        <MARContainer></MARContainer>
      </>
    )
}

export default App
