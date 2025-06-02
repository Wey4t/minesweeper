import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';

interface Difficulty {
  name: string;
  width: number;
  height: number;
  mines: number;
}

const difficulties: Difficulty[] = [
  { name: 'Easy', width: 9, height: 9, mines: 10 },
  { name: 'Medium', width: 16, height: 16, mines: 40 },
  { name: 'Hard', width: 30, height: 30, mines: 99 }
];

function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficulties[0]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setGameStarted(false);
  };

  return (
    <div className="App h-screen w-screen flex flex-col bg-gray-900 pt-4">
      <header className="p-1">
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex gap-1">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.name}
                className={`px-2 py-0.5 text-xs ${
                  selectedDifficulty.name === difficulty.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                } `}
                onClick={() => handleDifficultyChange(difficulty)}
              >
                {difficulty.name}
              </button>
            ))}
          </div>
          {!gameStarted && (
            <button
              className="px-2 py-0.5 bg-green-600 text-white hover:bg-green-500 text-xs font-bold"
              onClick={handleStartGame}
            >
              Start Game
            </button>
          )}
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        {gameStarted && (
          <Board 
            width={selectedDifficulty.width} 
            height={selectedDifficulty.height} 
            mines={selectedDifficulty.mines}
          />
        )}
      </main>
    </div>
  );
}

export default App;
