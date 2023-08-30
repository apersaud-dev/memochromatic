import React, { Dispatch, SetStateAction, useState } from "react"
import Option from "../components/Option";
import * as Data from '../staticData';
import { handleInputChange } from "../helperFunctions";

interface ISettingsProps {
    columns: number;
    colourScheme: string;
    impossibleMode: boolean;
    startImpossibleMode: (str: string) => void;
    updateSettings: (col: number, colour: string) => void;
    open: boolean;
    close: Dispatch<SetStateAction<boolean>>;
    width: number;
    height: number;
}

const Settings: React.FC<ISettingsProps> = ({ columns, colourScheme, impossibleMode, startImpossibleMode, updateSettings, open, close, width, height }) => {

    const [tilesSelection, setTilesSelection] = useState(columns);
    const [colourSelection, setColourSelection] = useState(colourScheme);
    const [difficulty, setDifficulty] = useState(impossibleMode);

    if (!open) {
        return null;
    }

    const disableTiles = colourSelection === "split-complementary" || colourSelection === "triadic" || colourSelection === "analogous" ? true : false;

    const resetButtonHandler = () => {
        setTilesSelection(columns);
        setColourSelection(colourScheme);
    }

    const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        close(false);

        if (difficulty)
            startImpossibleMode(colourSelection)
        else {
            updateSettings(tilesSelection, colourSelection);
        }
    }

    return (
        <div className="settings">
            <h2 className="settings__header">Settings</h2>
            <button onClick={() => close(false)} className="settings__close">X</button>
            <p className="settings__note">NOTE: Changing settings midgame will reset your current progress</p>
            <form>
                <fieldset>
                    <legend>Number of Tiles</legend>
                    {Data.tileSettingsData.map(datum => {
                        console.log(datum);
                        const checked = tilesSelection === datum.value;

                        return (
                            <Option
                                key={`${datum.id}-${datum.name}`}
                                data={datum}
                                checked={checked}
                                updateStateFunc={setTilesSelection}
                                disabled={disableTiles}
                            />
                        )
                    })}
                </fieldset>
                <fieldset>
                    <legend>Colour Scheme</legend>
                    <div>
                        <h3>1-Colour Scheme</h3>
                        {Data.monoChromaticSettings.map(datum => {
                            const checked = colourSelection === datum.value;

                            return (
                                <Option
                                    key={`${datum.id}-${datum.name}`}
                                    data={datum}
                                    checked={checked}
                                    updateStateFunc={setColourSelection}
                                />
                            )
                        })}
                    </div>
                    <div>
                        <h3>2-Colour Scheme</h3>
                        {Data.diChromaticSettings.map(datum => {
                            const checked = colourSelection === datum.value;

                            return (
                                <Option
                                    key={`${datum.id}-${datum.name}`}
                                    data={datum}
                                    checked={checked}
                                    updateStateFunc={setColourSelection}
                                />
                            )
                        })}
                    </div>
                    <div>
                        <h3>3-Colour Scheme</h3>
                        {Data.triChromaticSettings.map(datum => {
                            const checked = colourSelection === datum.value;

                            return (
                                <Option
                                    key={`${datum.id}-${datum.name}`}
                                    data={datum}
                                    checked={checked}
                                    updateStateFunc={setColourSelection}
                                    disabled={tilesSelection * 4 === 24 ? false : true}
                                />
                            )
                        })}
                    </div>
                    <div>
                        <h3>4-Colour Scheme</h3>
                        {Data.tetraChromaticSettings.map(datum => {
                            const checked = colourSelection === datum.value;

                            return (
                                <Option
                                    key={`${datum.id}-${datum.name}`}
                                    data={datum}
                                    checked={checked}
                                    updateStateFunc={setColourSelection}
                                />
                            )
                        })}
                    </div>
                </fieldset>
                {(width > 661 && height > 750) ?
                    <fieldset>
                        <legend>Impossible Mode</legend>
                        <input
                            id="impossibleOff"
                            type="radio"
                            name="impossible"
                            value="false"
                            checked={difficulty === false}
                            onChange={(e) => { handleInputChange(e.target.value, setDifficulty) }}
                        />
                        <label htmlFor="impossibleOff">Off</label>
                        <input
                            id="impossibleOn"
                            type="radio"
                            name="impossible"
                            value="true"
                            checked={difficulty === true}
                            onChange={(e) => { handleInputChange(e.target.value, setDifficulty) }}
                        />
                        <label htmlFor="impossibleOn">On</label>
                    </fieldset>
                    :
                    null
                }
                <button type="submit" onClick={(e) => handleFormSubmit(e)}>Save</button>
                <button type="button" onClick={() => resetButtonHandler()}>Reset</button>
            </form>
        </div>
    )
}


export default Settings;