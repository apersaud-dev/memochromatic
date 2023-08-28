import React, { Dispatch, SetStateAction } from 'react';

interface IData {
    id: string;
    name: string;
    value: string | number;
}

interface IOptionProps {
    data: IData;
    checked: boolean;
    updateStateFunc: Dispatch<SetStateAction<boolean>>;
    disabled?: boolean;
}

const Option: React.FC<IOptionProps> = ({ data, checked, updateStateFunc, disabled }) => {

    const labelOutput = typeof (data.value) === "number" ? data.value * 4 : data.value;
    const value = data.value;
    console.log(typeof value);

    const handleInputChange = (value: string | boolean, state: any) => {
        // How can I set the value of the input/radio to a number instead of a string?
        let input;
        switch (value) {
            case "5":
                input = 5;
                break;
            case "6":
                input = 6;
                break;
            case "7":
                input = 7;
                break;
            case 'true':
                input = true;
                break;
            case 'false':
                input = false;
                break;
            default:
                input = value;
                break;
        }
        state(input);
    }

    if (data.value === 6) {
        return (
            <>
                <input
                    id={data.id}
                    type="radio"
                    name={data.name}
                    value={data.value}
                    checked={checked}
                    onChange={(evt) => { handleInputChange(evt.target.value, updateStateFunc) }}
                />
                <label htmlFor={data.id} >{labelOutput}</label>
            </>
        )
    } else {
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
    }


}

export default Option;