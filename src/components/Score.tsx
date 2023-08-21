import React from "react";
import { totalScore } from "../helperFunctions";


export const Score = ({ score }: { score: number[] }) => {

    const calculatedScore = totalScore(score);

    return (
        <p className="score">Score: <span className="score__value">{calculatedScore}</span></p>
    )
}