import React, { Component } from 'react';
import Box from '../components/Box';
import * as constants from '../../constants';

class BoardContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chance: 0,
            winner: ''
        }
    }
    // Init results array
    //result = new Array(constants.boardSize).fill(new Array(constants.boardSize).fill(''));
    result = Array(constants.boardSize).fill(Array(constants.boardSize).fill(''));
    // functions to check winner
    checkRowWinner = () => {
        this.result.forEach((row, i) => {
            let hasXRow = 0;
            let hasORow = 0;
            row.forEach((column, j) => {
                if (column === 'X') hasXRow++;
                if (column === 'O') hasORow++;
            })
            if (hasXRow === constants.boardSize)
                this.setState({ winner: 'X' })
            else if (hasORow === constants.boardSize)
                this.setState({ winner: 'O' })
        })
    }
    transpose = () => {
        for (var i = 0; i < this.result.length; i++) {
            for (var j = 0; j < i; j++) {
                const tmp = this.result[i][j];
                this.result[i][j] = this.result[j][i];
                this.result[j][i] = tmp;
            }
        }
    }
    checkColWinner = () => {
        this.transpose()
        this.checkRowWinner()
        this.transpose()
    }
    checkDiaWinner = () => {
        let leftXDia = 0;
        let leftODia = 0;
        let rightXDia = 0;
        let rightODia = 0;
        for (let boardRow = 0; boardRow < constants.boardSize; boardRow++) {
            for (let boardColumn = 0; boardColumn < constants.boardSize; boardColumn++) {
                if (boardRow === boardColumn) {
                    if (this.result[boardRow][boardColumn] === 'X') leftXDia++;
                    else if (this.result[boardRow][boardColumn] === 'O') leftODia++;
                }
                else if ((boardRow + boardColumn + 1) === constants.boardSize) {
                    if (this.result[boardRow][boardColumn] === 'X') rightXDia++;
                    else if (this.result[boardRow][boardColumn] === 'O') rightODia++;
                }
            }
        }
        if (leftXDia === constants.boardSize || rightXDia === constants.boardSize)
            this.setState({ winner: 'X' })
        else if (leftODia === constants.boardSize || rightODia === constants.boardSize)
            this.setState({ winner: 'O' })
    }
    checkDraw = () => {
        let isDraw = true;
        this.result.forEach((row) => {
            if (isDraw && (row.indexOf('') !== -1)) isDraw = false
        })
        if (isDraw && (this.state.winner === ''))
            this.setState({ winner: 'Draw' })
    }
    // master function to check results
    checkResult = () => {
        this.checkRowWinner(this.result)
        this.checkColWinner(this.result)
        this.checkDiaWinner(this.result)
        this.checkDraw(this.result)
    }
    // callback function to pass in Box. For updating turns of players
    chanceInc = (boardRow, boardColumn) => {
        this.setState({ chance: this.state.chance + 1 })
        this.result = this.result.map((row, i) =>
            row.map((column, j) =>
                (i === boardRow && j === boardColumn) ?
                    this.state.chance % 2 === 0 ? 'X' : 'O'
                    : column

            )
        )
        this.checkResult(this.result)
        return this.result[boardRow][boardColumn];
    }
    // UI components for Boxes
    returnBox = () => {
        let ret = [];
        for (let boardRow = 0; boardRow < constants.boardSize; boardRow++) {
            for (let boardColumn = 0; boardColumn < constants.boardSize; boardColumn++) {
                ret.push(<Box key={boardRow + " " + boardColumn} winner={this.state.winner} boardRow={boardRow} boardColumn={boardColumn} chanceInc={this.chanceInc.bind(this)} />)
            }
            ret.push(<br key={boardRow + "key"} />)
        }
        return ret
    }
    render() {
        return (
            <div>
                {this.state.winner === '' ?
                    <h1>{this.state.chance % 2 === 0 ? 'Player X\'s turn!' : 'Player O\'s turn!'}</h1> :
                    this.state.winner === 'Draw' ? <h1>Match Draw! Start New Game</h1> :
                        <h1>Player {this.state.winner} wins! Start New Game</h1>
                }
                {/* Display the game board */}
                {this.returnBox()}
            </div>
        )
    }
}

export default BoardContainer;