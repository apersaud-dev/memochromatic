import React, { Dispatch, SetStateAction } from 'react';
import { handleInputChange } from '../helperFunctions';

interface IData {
    id: string;
    name: string;
    value: string | number;
}

interface IOptionProps {
    data: IData;
    checked: boolean;
    updateStateFunc: Dispatch<SetStateAction<number>> | Dispatch<SetStateAction<string>>;
    disabled?: boolean;
}

const Option: React.FC<IOptionProps> = ({ data, checked, updateStateFunc, disabled }) => {

    const labelOutput = typeof (data.value) === "number" ? data.value * 4 : data.value;

    return (
        <>
            <input
                id={data.id}
                type="radio"
                name={data.name}
                value={data.value}
                checked={checked}
                onChange={(evt) => { handleInputChange(evt.target.value, updateStateFunc) }}
                disabled={disabled}
            />
            <label htmlFor={data.id} >{labelOutput}</label>
        </>
    )
    // }
}

export default Option;