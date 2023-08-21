import React from 'react';

interface IOption {
    data: any;
    checked: any;
    updateStateFunc: any;
    disabled?: any;
}

const Option = ({ data, checked, updateStateFunc, disabled }: IOption) => {

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

    // Fix disabled state so it works for all inputs

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

export default Option;