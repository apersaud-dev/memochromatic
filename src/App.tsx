import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { GameOver } from './screens/GameOver';
import Settings from './screens/Settings';
import * as func from './helperFunctions';
import Game from './screens/Game';
import { ITile } from './interfaces';
import Instructions from './screens/Instructions';

function App() {

  const [columns, setColumns] = useState(5);
  const [colourScheme, setColourScheme] = useState("square");
  const [impossibleMode, setImpossibleMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInstructions, setShowInstrucctions] = useState(false);
  const [tiles, setTiles] = useState<ITile[]>([]);
  const [score, setScore] = useState([0])
  const [turnCounter, setTurnCounter] = useState(0);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [matched, setMatched] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { height, width } = func.useWindowDimensions();


  const updateTurnCount = () => {
    setTurnCounter(turnCounter + 1);
  }

  const updateSelectedTiles = (tileId: string) => {
    setSelectedTiles([...selectedTiles, tileId]);
  }

  const updateSettings = (col: any, colour: any) => {
    setMatched([]);
    setScore([0]);
    setColumns(col);
    setColourScheme(colour);
    setImpossibleMode(false);
    const newGameTiles = func.buildGrid(col);
    setTiles(func.generateRandomPairs(columns, newGameTiles, colour));
  }

  const startImpossibleMode = (colourChoice: string) => {
    setMatched([]);
    setScore([0]);
    setColumns(9);
    setColourScheme(colourChoice);
    setImpossibleMode(true);
    const newGameTiles = func.buildGrid(9);
    setTiles(func.generateRandomPairs(9, newGameTiles, colourChoice));
  }

  const restartGame = () => {
    setMatched([]);
    setScore([0]);
  }

  const playAgain = () => {
    setMatched([]);
    setScore([0]);
    const newGameTiles = func.buildGrid(columns);
    setTiles(func.generateRandomPairs(columns, newGameTiles, colourScheme));
    setGameCompleted(false);
  }

  // Game Start
  if (tiles.length === 0) {
    func.gameStart(columns, setTiles);
  }

  // Game Over
  if (tiles.length > 0 && matched.length === tiles.length) {
    func.gameOver(setGameCompleted);
  }

  // In game logic
  if (turnCounter > 1) {
    func.gameLogic(tiles, selectedTiles, setSelectedTiles, matched, setMatched, score, setScore, setTurnCounter);
  }

  const boxDim = func.defineBoxDim(width, impossibleMode);
  const boardWidth = func.defineBoardWidth(width, columns, impossibleMode);


  return (
    <div className="App">
      <Instructions open={showInstructions} close={setShowInstrucctions} />
      <Header
        score={score}
        instructionsOpen={showInstructions}
        toggleInstructions={setShowInstrucctions}
        settingsOpen={showSettings}
        restart={restartGame}
        newGame={playAgain}
        toggleSettings={setShowSettings}
      />
      <Game
        tiles={tiles}
        impossibleMode={impossibleMode}
        updateSelectedTiles={updateSelectedTiles}
        selectedTiles={selectedTiles}
        updateTurnCounter={updateTurnCount}
        matched={matched}
        score={score}
        boardWidth={boardWidth}
        boxDim={boxDim}
      />
      <Settings
        columns={columns}
        colourScheme={colourScheme}
        impossibleMode={impossibleMode}
        startImpossibleMode={startImpossibleMode}
        open={showSettings}
        close={setShowSettings}
        updateSettings={updateSettings}
      />
      <GameOver show={gameCompleted} playAgain={playAgain} score={score} />
    </div>
  );
}

export default App;
