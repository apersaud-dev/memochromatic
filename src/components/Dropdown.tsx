import React, { Dispatch, SetStateAction } from 'react';
import { handleInputChange } from '../helperFunctions';
import * as Data from '../staticData'

interface IDropdownProps {
    defVal: string;
    updateScheme: Dispatch<SetStateAction<string>>;
    tiles: number;
}

const Dropdown: React.FC<IDropdownProps> = ({ defVal, updateScheme, tiles }) => {

    return (
        <select
            name="colourScheme"
            id="selectColourScheme"
            className="colourDropdown"
            defaultValue={defVal}
            onChange={(evt) => { handleInputChange(evt.target.value, updateScheme) }}
        >
            {Data.colourSchemes.map((scheme) => {

                const unselectable = scheme.numOfColours != 3 ? false : tiles * 4 == 24 ? false : true;
                return (
                    <option
                        key={`${scheme.name}-${scheme.id}`}
                        className="colourDropdown__option"
                        value={scheme.value}
                        disabled={unselectable}
                    >
                        {scheme.value}
                    </option>
                )
            })}
        </select>
    )
}

export default Dropdown;