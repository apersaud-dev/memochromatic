import { useState } from 'react';
//import './App.css';
import './style.scss'
import Header from './components/Header';
import Settings from './screens/Settings';
import Game from './screens/Game';
import Instructions from './screens/Instructions';
import { GameOver } from './screens/GameOver';
import Footer from './components/Footer';
import { ITile } from './interfaces';
import * as func from './helperFunctions';

function App() {

  const [columns, setColumns] = useState(5);
  const [colourScheme, setColourScheme] = useState("square");
  const [impossibleMode, setImpossibleMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInstructions, setShowInstrucctions] = useState(false);
  const [tiles, setTiles] = useState<ITile[]>([]);
  const [score, setScore] = useState([0])
  const [turnCounter, setTurnCounter] = useState(0);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { height, width } = func.useWindowDimensions();


  const updateTurnCount = () => {
    setTurnCounter(turnCounter + 1);
  }

  const updateSelectedTiles = (tileId: number) => {
    setSelectedTiles([...selectedTiles, tileId]);
  }

  const updateSettings = (col: number, colour: string) => {
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
      <Header
        score={score}
        instructionsOpen={showInstructions}
        toggleInstructions={setShowInstrucctions}
        settingsOpen={showSettings}
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
      <Instructions open={showInstructions} close={setShowInstrucctions} />
      <Settings
        columns={columns}
        colourScheme={colourScheme}
        impossibleMode={impossibleMode}
        startImpossibleMode={startImpossibleMode}
        open={showSettings}
        close={setShowSettings}
        updateSettings={updateSettings}
        width={width}
        height={height}
      />
      <GameOver show={gameCompleted} playAgain={playAgain} score={score} />
      <Footer />
    </div>
  );
}

export default App;