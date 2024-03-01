import React from "react";
import { totalScore } from "../helperFunctions";

interface IScoreProps {
    score: number[]
}

export const Score: React.FC<IScoreProps> = ({ score }) => {

    const calculatedScore = totalScore(score);

    return (
        <p className="score">Score: <span className="score__value">{calculatedScore}</span></p>
    )
}