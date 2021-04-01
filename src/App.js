import React from 'react';
import './App.css';
import BoardContainer from './modules/Board/containers/BoardContainer';
import ControlsContainer from './modules/Controls/containers/ControlsContainer';

function App() {
  return (
    <div className="App">
      <div className="controls">
        <ControlsContainer />
      </div>
      <div className="board">
        <BoardContainer />
      </div>
    </div>
  );
}

export default App;
