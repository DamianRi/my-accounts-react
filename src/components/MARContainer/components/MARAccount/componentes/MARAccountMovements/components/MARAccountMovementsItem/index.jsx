import MARAccountMovementsItemHeader from "./components/MARAccountMovementsItemHeader"

const MARAccountMovementsItem = ({ movement }) => {
    console.log('Movement ', movement)
    return (
        <div>
            <MARAccountMovementsItemHeader
                id={ `accountMovement-${movement.id}` }
                type={0}
                creationDate={undefined}
            ></MARAccountMovementsItemHeader>
        </div>
    )
}

export default MARAccountMovementsItem
