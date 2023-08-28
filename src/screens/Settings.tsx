import React, { SetStateAction, useState } from "react"
import Option from "../components/Option";
import * as Data from '../staticData';

/*
const Settings = ({ columns, colourScheme, impossibleMode, startImpossibleMode, updateSettings, open, close }: { columns: any, colourScheme: any, impossibleMode: any, startImpossibleMode: any, updateSettings: any, open: any, close: any }) => {

    const [tilesSelection, setTilesSelection] = useState(columns);
    const [colourSelection, setColourSelection] = useState(colourScheme);
    const [difficulty, setDifficulty] = useState(impossibleMode);

    if (!open) {
        return null;
    }

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
            <p className="settings__note">Changing settings midgame will reset your current progress.</p>
            <form>
                <fieldset>
                    <legend>Number of Tiles</legend>
                    <input
                        id="twenty"
                        type="radio"
                        name="tiles"
                        value={5}
                        checked={tilesSelection * 4 === 20}
                        onChange={(e) => { handleInputChange(e.target.value, setTilesSelection) }}
                        disabled={disableTiles}
                    />
                    <label htmlFor="twenty">20</label>
                    <input
                        id="twentyFour"
                        type="radio"
                        name="tiles"
                        value={6}
                        checked={tilesSelection * 4 === 24}
                        onChange={(e) => { handleInputChange(e.target.value, setTilesSelection) }}
                    />
                    <label htmlFor="twentyFour">24</label>
                    <input
                        id="twentyEight"
                        type="radio"
                        name="tiles"
                        value={7}
                        checked={tilesSelection * 4 === 28}
                        onChange={(e) => { handleInputChange(e.target.value, setTilesSelection) }}
                        disabled={disableTiles}
                    />
                    <label htmlFor="twentyEight">28</label>
                </fieldset>
                <fieldset>
                    <legend>Colour Scheme</legend>
                    <div>
                        <h3>1-Colour Schemes</h3>
                        <input
                            id="monochromatic"
                            type="radio"
                            name="scheme"
                            value="monochromatic"
                            checked={colourSelection === "monochromatic"}
                            onChange={(e) => { handleInputChange(e.target.value, setColourSelection) }}
                        />
                        <label htmlFor="monochromatic">Monochromatic</label>
                    </div>
                    <div>
                        <h3>2-Colour Schemes</h3>
                        <input
                            id="complementary"
                            type="radio"
                            name="scheme"
                            value="complementary"
                            checked={colourSelection === "complementary"}
                            onChange={(e) => { handleInputChange(e.target.value, setColourSelection) }}
                        />
                        <label htmlFor="complementary">Complementary</label>
                    </div>
                    <div>
                        <h3>3-Colour Schemes</h3>
                        <input
                            id="analogous"
                            type="radio"
                            name="scheme"
                            value="analogous"
                            checked={colourSelection === "analogous"}
                            onChange={(e) => { handleInputChange(e.target.value, setColourSelection) }}
                            disabled={tilesSelection * 4 === 24 ? false : true}
                        />
                        <label htmlFor="analogous">Analogous</label>
                        <input
                            id="triadic"
                            type="radio"
                            name="scheme"
                            value="triadic"
                            checked={colourSelection === "triadic"}
                            onChange={(e) => { handleInputChange(e.target.value, setColourSelection) }}
                            disabled={tilesSelection * 4 === 24 ? false : true}
                        />
                        <label htmlFor="triadic">Triadic</label>
                        <input
                            id="split-complementary"
                            type="radio"
                            name="scheme"
                            value="split-complementary"
                            checked={colourSelection === "split-complementary"}
                            onChange={(e) => { handleInputChange(e.target.value, setColourSelection) }}
                            disabled={tilesSelection * 4 === 24 ? false : true}
                        />
                        <label htmlFor="split-complementary">Split-Complementary</label>
                    </div>
                    <div>
                        <h3>4-Colour Schemes</h3>
                        <input
                            id="tetradic"
                            type="radio"
                            name="scheme"
                            value="tetradic"
                            checked={colourSelection === "tetradic"}
                            onChange={(e) => { handleInputChange(e.target.value, setColourSelection) }}
                        />
                        <label htmlFor="tetradic">Tetradic</label>
                        <input
                            id="square"
                            type="radio"
                            name="scheme"
                            value="square"
                            checked={colourSelection === "square"}
                            onChange={(e) => { handleInputChange(e.target.value, setColourSelection) }}
                        />
                        <label htmlFor="square">Square</label>
                    </div>
                </fieldset>
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
                <button type="submit" onClick={(e) => handleFormSubmit(e)}>Save</button>
                <button type="button" onClick={() => resetButtonHandler()}>Reset</button>
            </form>
        </div>
    )
}



/*
interface Settings {
    columns: number;
    colourScheme: string;
    impossibleMode: boolean;
    //startImpossibleMode: (str: string) => {};
    open: boolean;
    close: React.Dispatch<SetStateAction<boolean>>;
    // boardWidth: number;
    // width: number;
    // height: number;
    updateSettings: (col: React.SetStateAction<number>, colour: React.SetStateAction<string>) => {};
}

interface IOption {
    id: string;
    name: string;
    value: number | string;
}
*/
const Settings = ({ columns, colourScheme, impossibleMode, startImpossibleMode, updateSettings, open, close }: { columns: any, colourScheme: any, impossibleMode: any, startImpossibleMode: any, updateSettings: any, open: any, close: any }) => {

    const [tilesSelection, setTilesSelection] = useState(columns);
    const [colourSelection, setColourSelection] = useState(colourScheme);
    const [difficulty, setDifficulty] = useState(impossibleMode);

    if (!open) {
        return null;
    }

    // const handleInputChange = (value: string | boolean, state: any) => {
    //     // How can I set the value of the input/radio to a number instead of a string?
    //     let input;
    //     switch (value) {
    //         case "5":
    //             input = 5;
    //             break;
    //         case "6":
    //             input = 6;
    //             break;
    //         case "7":
    //             input = 7;
    //             break;
    //         case 'true':
    //             input = true;
    //             break;
    //         case 'false':
    //             input = false;
    //             break;
    //         default:
    //             input = value;
    //             break;
    //     }
    //     state(input);
    // }

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
                <button type="submit" onClick={(e) => handleFormSubmit(e)}>Save</button>
                <button type="button" onClick={() => resetButtonHandler()}>Reset</button>
            </form>
        </div>
    )
}


export default Settings;