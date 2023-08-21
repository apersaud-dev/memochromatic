import Tile from "./Tile";

const Board = ({ tiles, updateTilesState, impossibleMode, selectedTiles, updateTurnState, matched, score, boardWidth, boxDim }: { tiles: any, updateTilesState: any, impossibleMode: any, selectedTiles: any, updateTurnState: any, matched: any, score: any, boardWidth: any, boxDim: any }) => {

    const styleClass = { width: `${boardWidth}px` }

    // if (impossibleMode && score.length > 1) {
    //     const degrees = score.reduce(rotations, 0);
    //     styleClass["transform"] = `rotateZ(${degrees}deg)`;
    //     styleClass["transition"] = "all 1s";
    // }

    return (
        <div className="board">
            <div className="gridRow" style={styleClass}>
                {tiles.map((tile: any, index: number) => {
                    return <Tile
                        key={tile.tile}
                        id={index}
                        updateTurnCounter={updateTurnState}
                        selectedTiles={selectedTiles}
                        updateSelectedTiles={updateTilesState}
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

export default Board;