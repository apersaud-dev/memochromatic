import React from "react";
import { IBoxDimensions } from "../interfaces";

interface ITileProps {
    id: number;
    updateTurnCounter: () => void;
    colour: string;
    selectedTiles: number[];
    updateSelectedTiles: (tileId: number) => void;
    matched: number[];
    boxDim: IBoxDimensions;
    impossibleMode: boolean;
}

const Tile: React.FC<ITileProps> = ({ id, updateTurnCounter, colour, selectedTiles, updateSelectedTiles, matched, boxDim, impossibleMode }) => {

    const tileStyle = {
        background: colour,
        width: `${boxDim.length}px`,
        height: `${boxDim.length}px`,
    }
    let disableClick = false;

    let tile = ""
    if (impossibleMode) {
        if (selectedTiles.includes(Number(id)))
            tile = "box flip disabled impossible"
        else if (matched.includes(Number(id)))
            tile = "box disabled matched impossible"
        else
            tile = "box impossible"
    } else {
        if (selectedTiles.includes(Number(id)))
            tile = "box flip disabled"
        else if (matched.includes(Number(id)))
            tile = "box disabled matched"
        else
            tile = "box"
    }

    const tileBack = impossibleMode ?
        selectedTiles.includes(Number(id)) ?
            "back disabled impossible" :
            "back impossible"
        : "back";

    if (matched.includes(Number(id)) || selectedTiles.includes(Number(id)) || selectedTiles.length > 1) {
        disableClick = true;
    }
    const clickTile = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = evt.target as HTMLButtonElement;
        const tileId = Number(target.id);
        updateSelectedTiles(tileId);
        updateTurnCounter();
    }

    return (
        <button id={`${id}`} className={tile} style={{ width: `${boxDim.length}px`, height: `${boxDim.length}px`, margin: `${boxDim.margin}px` }} onClick={evt => clickTile(evt)} disabled={disableClick}>
            <div className={tileBack} style={tileStyle}></div>
        </button>
    )
}

export default Tile;