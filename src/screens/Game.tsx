import React, { useState } from 'react';
import { ITile } from '../interfaces';
import Tile from '../components/Tile';
import * as func from '../helperFunctions';

interface IStyleClass {
    width: string;
    transform?: string;
    transition?: string;
}


const Game = ({ tiles, updateSelectedTiles, impossibleMode, selectedTiles, updateTurnCounter, matched, score, boardWidth, boxDim }: { tiles: ITile[], updateSelectedTiles: any, impossibleMode: boolean, selectedTiles: any, updateTurnCounter: any, matched: any, score: any, boardWidth: any, boxDim: any }) => {

    const styleClass: IStyleClass = { width: `${boardWidth}px` }

    if (impossibleMode && score.length > 1) {
        const degrees = score.reduce(func.rotations, 0);
        styleClass["transform"] = `rotateZ(${degrees}deg)`;
        styleClass["transition"] = "all 1s";
    }

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