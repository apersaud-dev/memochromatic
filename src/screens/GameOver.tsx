import React from 'react';
import { totalScore } from '../helperFunctions';

interface IGameOverProps {
    show: boolean;
    playAgain: () => void;
    score: number[];
}


export const GameOver: React.FC<IGameOverProps> = ({ show, playAgain, score }) => {

    const calculatedScore = totalScore(score);

    const shareScore = () => {
        navigator.clipboard.writeText(calculatedScore.toString());

    };

    if (!show) {
        return null;
    }

    return (
        <div className="final__overlay">
            <div className="final">
                <h3 className="final__heading">CONGRATULATIONS!</h3>
                <p className="final__score">Your final score is <b>{calculatedScore}</b>.</p>
                <p className="final__turns">It took you {score.length - 1} turns to match all the pairs.</p>
                <button className="final__playAgain" onClick={playAgain}>Play Again</button>
                <button className="final__" onClick={shareScore}>Share</button>
            </div>
        </div>
    )
}