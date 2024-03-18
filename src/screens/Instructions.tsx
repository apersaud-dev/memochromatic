import React, { Dispatch, SetStateAction } from 'react';
import Example from "../components/Example";

interface IInstructionsProps {
    open: boolean;
    close: Dispatch<SetStateAction<boolean>>;
}

const Instructions: React.FC<IInstructionsProps> = ({ open, close }) => {

    if (!open) {
        return null;
    }

    return (
        <div className="instructions__overlay">
            <div className="instructions">
                <div>
                    <button className="instructions__close" type="button" onClick={() => close(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z" />
                        </svg>
                    </button>
                </div>
                <div className="instructions__section">
                    <h2 className="instructions__heading">HOW TO PLAY</h2>
                    <div className="example">
                        <Example id={`q1w2e3`} time={4000} flipColour={"red"} startingColour={"#E7E7DA"} />
                        <Example id={`r4t5y6`} time={5000} flipColour={"blue"} startingColour={"#E7E7DA"} />
                        <p>Select any two tiles on the board.</p>
                    </div>
                    <div className="example">
                        <Example id={`a1s2d3`} time={8000} flipColour={"#fbfbfb"} startingColour={"purple"} />
                        <Example id={`f4g5h6`} time={8000} flipColour={"#fbfbfb"} startingColour={"purple"} />
                        <p>If the colours match exactly, the tiles will disappear.</p>
                    </div>
                    <div className="example">
                        <Example id={`z1x2c3`} time={10000} flipColour={"#E7E7DA"} startingColour={"magenta"} />
                        <Example id={`v4b5n6`} time={10000} flipColour={"#E7E7DA"} startingColour={"aqua"} />
                        <p>If they don't, they will flip back over.</p>
                    </div>
                    <div>
                        <p>Try to match all the pairs in as few guesses as possbile.</p>
                    </div>
                </div>
                <div className="instructions__section">
                    <h2 className="instructions__heading">Scoring</h2>
                    <p>Your score will increase by 100 for each matched pair, and will reduce by 10 for each miss.</p>
                </div>
                <div className="instructions__section">
                    <h2 className="instructions__heading">Settings</h2>
                    <p>Click the gear icon to adjust the number of tiles and colour schemes for the game.</p>
                </div>
            </div>
        </div>
    )
}

export default Instructions;