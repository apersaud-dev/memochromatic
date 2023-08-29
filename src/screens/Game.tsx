import React from 'react';
import { IBoxDimensions, ITile } from '../interfaces';
import Tile from '../components/Tile';
import * as func from '../helperFunctions';

interface IStyleClass {
    width: string;
    transform?: string;
    transition?: string;
}

interface IGameProps {
    tiles: ITile[];
    updateSelectedTiles: (tileId: number) => void;
    impossibleMode: boolean;
    selectedTiles: number[];
    updateTurnCounter: () => void;
    matched: number[];
    score: number[];
    boardWidth: number;
    boxDim: IBoxDimensions;
}

const Game: React.FC<IGameProps> = ({ tiles, updateSelectedTiles, impossibleMode, selectedTiles, updateTurnCounter, matched, score, boardWidth, boxDim }) => {

    const styleClass: IStyleClass = { width: `${boardWidth}px` }

    if (impossibleMode && score.length > 1) {
        const degrees = score.reduce(func.rotations, 0);
        styleClass["transform"] = `rotateZ(${degrees}deg)`;
        styleClass["transition"] = "all 1s";
    }
    console.log(tiles);
    return (
        <div className="board">
            <div className="gridRow" style={styleClass}>
                {tiles.map((tile, index) => {
                    return <Tile
                        key={tile.tile}
                        id={index}
                        updateTurnCounter={updateTurnCounter}
                        selectedTiles={selectedTiles}
                        updateSelectedTiles={updateSelectedTiles}
                        matched={matched}
                        colour={tile.colour}
                        boxDim={boxDim}
                        impossibleMode={impossibleMode}
                    />
                })}
            </div >
        </div>
    )
}

export default Game;