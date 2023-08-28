import React, { Dispatch, SetStateAction } from 'react';
import Example from "../components/Example";

interface IInstructions {
    open: boolean;
    close: Dispatch<SetStateAction<boolean>>;
}

const Instructions: React.FC<IInstructions> = ({ open, close }) => {

    if (!open) {
        return null;
    }

    return (
        <div className="instructions">
            <div>
                <button className="instructions__close" type="button" onClick={() => close(false)}>X</button>
            </div>
            <div>
                <h2 className="instructions__heading">How to Play</h2>
                <div className="example">
                    <Example id={`q1w2e3`} time={4000} flipColour={"red"} startingColour={"#3d3d3d"} />
                    <Example id={`r4t5y6`} time={5000} flipColour={"blue"} startingColour={"#3d3d3d"} />
                    <p>Select any two tiles on the board.</p>
                </div>
                <div className="example">
                    <Example id={`a1s2d3`} time={8000} flipColour={"greenyellow"} startingColour={"purple"} />
                    <Example id={`f4g5h6`} time={8000} flipColour={"greenyellow"} startingColour={"purple"} />
                    <p>If the colours match exactly, the tiles will disappear.</p>
                </div>
                <div className="example">
                    <Example id={`z1x2c3`} time={10000} flipColour={"#3d3d3d"} startingColour={"magenta"} />
                    <Example id={`v4b5n6`} time={10000} flipColour={"#3d3d3d"} startingColour={"aqua"} />
                    <p>If they don't, they will flip back over.</p>
                </div>
                <div>
                    <p>Try to match all the pairs in as few guesses as possbile.</p>
                </div>
            </div>
            <div>
                <h2 className="instructions__heading">Scoring</h2>
                <p>Your score will increase by 100 for each matched pair, and will reduce by 10 for each miss.</p>
            </div>
            <div>
                <h2 className="instructions__heading">Settings</h2>
                <p>Click the gear icon to adjust the number of tiles and colour schemes for the game.</p>
            </div>
        </div>
    )
}

export default Instructions;