import React, { useState, useEffect } from 'react'
import { Cell } from './Cell';

interface BoardProps {
    width: number;
    height: number;
    mines: number;
}

export const Board = (props : BoardProps) => {
    const [gameOver, setGameOver] = useState(false);
    const [flaggedMines, setFlaggedMines] = useState(props.mines);
    const neighbors = [
        [1, 1],
        [1, 0],
        [0, 1],
        [-1, -1],
        [-1, 0],
        [0, -1],
        [-1, 1],
        [1, -1],
    ];
    const generateBoard = function (h:number,w:number,mine:number) {
        const grid = Array.from({ length: h }, () => Array(w).fill(0)); // Initialize a 2D grid
        for (let i = 0; i < props.height; i++) {
            for (let j = 0; j < props.width; j++) {
                grid[i][j] = 'E';
            }
        }
        // init mines, mine is 'M'
        let minesPlaced = 0;
        while (minesPlaced < mine) {
            const row = Math.floor(Math.random() * h);
            const col = Math.floor(Math.random() * w);
            if (grid[row][col] !== 'M') {  // Only place mine if cell is empty
                grid[row][col] = 'M';
                minesPlaced++;
            }
        }
        return grid;
    }
    const [board, setBoard] = useState(generateBoard(props.height, props.width, props.mines));
    
    

    const revealAllMines = (board: string[][]) => {
        return board.map(row => 
            row.map(cell => cell === 'M' ? 'X' : cell)
        );
    };

    var updateBoard = function (board:Array<Array<string>>, click:Array<number>) {
        const newBoard = board.map(row => [...row]);
        function helper(rowIndex:number, columnIndex:number) {
            let count = 0;
            for (const [rowInd, colInd] of neighbors) {
                if (
                    newBoard[rowIndex + rowInd] &&
                    newBoard[rowIndex + rowInd][columnIndex + colInd] !== undefined
                ) {
                    if (newBoard[rowIndex + rowInd][columnIndex + colInd] === 'M') {
                        count += 1;
                    }
                }
            }
            newBoard[rowIndex][columnIndex] = (count && `${count}`) || 'B';
            if (count) {
                return;
            }
            for (const [rowInd, colInd] of neighbors) {
                if (
                    newBoard[rowIndex + rowInd] &&
                    newBoard[rowIndex + rowInd][columnIndex + colInd] === 'E'
                ) {
                    helper(rowIndex + rowInd, columnIndex + colInd);
                }
            }
            return;
        }

        if (newBoard[click[0]][click[1]] === 'M') {
            setGameOver(true);
            return revealAllMines(newBoard);
        }
        helper(click[0], click[1]);
        // if number of E == number of M, you win
        if (newBoard.flat().filter(cell => cell === 'E').length === 0) {
            setGameOver(true);
            alert('You win!');
            // change all E to BB
            for (let i = 0; i < newBoard.length; i++) {
                for (let j = 0; j < newBoard[i].length; j++) {
                    if (newBoard[i][j] === 'M') {
                        newBoard[i][j] = 'BB'
                    }
                }
            }
        }
        return newBoard;
    };

    const handleClick = (rowIndex:number, cellIndex:number, e:React.MouseEvent<HTMLDivElement>) => {
        
        if (gameOver) return; // Prevent clicks after game over
        if (e.type === 'contextmenu') {
            setFlaggedMines(flaggedMines - 1);

        }else{
            const newBoard = updateBoard([...board], [rowIndex, cellIndex]);
            setBoard(newBoard);
        }
    }

    const resetGame = () => {
        setGameOver(false);
        setFlaggedMines(props.mines)
        setBoard(generateBoard(props.height, props.width, props.mines));
    }

    // Calculate cell size based on total cells
    const totalCells = props.width * props.height;
    const getCellSize = () => {
        if (totalCells <= 81) { // Easy mode (9x9)
            return '30px';
        } else if (totalCells <= 256) { // Medium mode (16x16)
            return '22px';
        } else { // Hard mode (30x16)
            return '18px';
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-center items-center p-1">
                <div className='flex flex-col justify-center items-center bg-gray-800  p-1 text-white'>
                    <span className="text-xs">Mines: {props.mines}</span>
                    <button 
                        className="bg-blue-600 text-white px-2 py-1 hover:bg-blue-500 text-xs"
                        onClick={resetGame}
                    >
                        New Game
                    </button> 
                </div>
            </div>
            <div className="flex justify-center items-center p-1">
                <div className="border-2 border-gray-700 bg-white">
                    <div className="grid gap-px bg-gray-700" style={{
                        gridTemplateColumns: `repeat(${props.width}, ${getCellSize()})`,
                        gridTemplateRows: `repeat(${props.height}, ${getCellSize()})`
                    }}>
                        {board.map((row, rowIndex) => (
                            row.map((_, cellIndex) => (
                                <div 
                                    key={`${rowIndex}-${cellIndex}`}
                                    className="bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors text-sm border border-gray-600 [border-top-color:gray-500] [border-left-color:gray-500] [border-bottom-color:gray-800] [border-right-color:gray-800]"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(rowIndex, cellIndex, e);
                                    }}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        handleClick(rowIndex, cellIndex, e);
                                    }}
                                >
                                    <Cell type={board[rowIndex][cellIndex]} />
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Board