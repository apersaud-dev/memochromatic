import React, { Dispatch, SetStateAction } from 'react';
import { handleInputChange } from '../helperFunctions';

interface IRangeSliderProps {
    val: number;
    updateTiles: Dispatch<SetStateAction<number>>;
    colourSelection: string;
}

const RangeSlider: React.FC<IRangeSliderProps> = ({ val, updateTiles, colourSelection }) => {

    const disableSlider = colourSelection == "analogous" || colourSelection == "triadic" || colourSelection == "split-complementary";

    return (
        <>
            <input
                type="range"
                className="range"
                min="5"
                max="7"
                step="1"
                disabled={disableSlider}
                value={val}
                onChange={(evt) => handleInputChange(Number(evt.target.value), updateTiles)}
            >
            </input>

            <ul className="range__labelWrapper">
                <li className="range__label active selected">20</li>
                <li className="range__label">24</li>
                <li className="range__label">28</li>
            </ul>
        </>
    )
}

export default RangeSlider;