import React, { useState } from 'react';
import '../stylesheet/Board.css'

const Box = props => {
    const handleBoxClick = () => {
        changed && props.winner === '' && setBoxVal(props.chanceInc(props.boardRow, props.boardColumn))
        setChanged(false)
    }
    // state variable for Value in boxes
    const [boxVal, setBoxVal] = useState('[  ]')
    // State variable to check if the box is filled
    const [changed, setChanged] = useState(true)
    // Returns each boxes
    return (
        <div className='box' onClick={() => handleBoxClick()}>
            <h2>{boxVal}</h2>
        </div>
    );
}

export default Box;