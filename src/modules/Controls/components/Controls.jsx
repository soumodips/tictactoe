import React from 'react';
import '../stylesheet/Controls.css'

const Controls = props => {
    // Returns the Controls Component
    return (
        <button className='control-menu' onClick={() => window.location.reload()}>
            <h1>New Game</h1>
        </button>
    );
}

export default Controls;