import React from 'react';
import { totalScore } from '../helperFunctions';

interface IGameOver {
    show: boolean;
    playAgain: () => void;
    score: number[];
}


export const GameOver: React.FC<IGameOver> = ({ show, playAgain, score }: IGameOver) => {

    const calculatedScore = totalScore(score);

    if (!show) {
        return null;
    }

    return (
        <div className="final">
            <h3>You did it!</h3>
            <p>Your final score is {calculatedScore}.</p>
            <p>It took you {score.length - 1} turns to match all the pairs.</p>
            <button onClick={playAgain}>Play Again</button>
        </div>
    )
}