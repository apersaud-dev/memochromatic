import React, { Dispatch, SetStateAction } from 'react';
import { handleInputChange } from '../helperFunctions';

interface IRadioButtonProps {
    id: string;
    name: string;
    value: string;
    difficulty: boolean;
    textDisplay: string;
    updateMode: Dispatch<SetStateAction<boolean>>;
}

const RadioButton: React.FC<IRadioButtonProps> = ({ id, name, value, difficulty, textDisplay, updateMode }) => {

    const checked = difficulty === JSON.parse(value);
    const checkedLabel = checked ? "radioInput__label-checked" : "radioInput__label"

    return (
        <div className="radioInput">
            <input
                type="radio"
                id={id}
                className="radioInput__button"
                name={name}
                value={value}
                checked={checked}
                onChange={(e) => { handleInputChange(e.target.value, updateMode) }}
            />
            <label
                className={checkedLabel}
                htmlFor={id}
            >
                {textDisplay}
            </label>
        </div>
    )

}

export default RadioButton;