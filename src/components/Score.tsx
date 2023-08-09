import React from "react";
import { totalScore } from "../helperFunctions";

interface Score {

}

export const Score = ({ score }: { score: number[] }) => {
    const calculatedScore = totalScore(score);

    return (
        <p>Score: <span className="scoreValue">{calculatedScore}</span></p>
    )
}