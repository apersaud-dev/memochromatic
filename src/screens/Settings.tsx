import React, { Dispatch, SetStateAction, useState } from "react"
import RangeSlider from "../components/RangeSlider";
import Dropdown from "../components/Dropdown";
import RadioButton from "../components/RadioButton";

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

    const resetButtonHandler = () => {
        setTilesSelection(columns);
        setColourSelection(colourScheme);
    }

    const closeSettings = () => {
        resetButtonHandler()
        close(false);
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
        <div className="settings__overlay">
            <div className="settings">
                <h2 className="settings__header">SETTINGS</h2>
                <button onClick={() => closeSettings()} className="settings__close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z" />
                    </svg>
                </button>
                <p className="settings__note">NOTE: Changing settings midgame will reset your current progress</p>
                <form className="settings__form">
                    <div className="settings__formRow">
                        <h3>Number of Tiles</h3>
                        <div>
                            <RangeSlider
                                val={tilesSelection}
                                updateTiles={setTilesSelection}
                                colourSelection={colourSelection}
                            />
                        </div>
                    </div>
                    <div className="settings__formDivider"></div>
                    <div className="settings__formRow">
                        <h3>Colour Scheme</h3>
                        <Dropdown
                            defVal={colourSelection}
                            updateScheme={setColourSelection}
                            tiles={tilesSelection}
                        />
                    </div>
                    <div className="settings__formDivider"></div>
                    {(width > 661 && height > 750) ?
                        <>
                            <div className="settings__formRow">
                                <h3>Impossible Mode</h3>
                                <div className="impossibleMode">
                                    <RadioButton
                                        id="impossibleOff"
                                        name="impossible"
                                        value="false"
                                        textDisplay="Off"
                                        difficulty={difficulty}
                                        updateMode={setDifficulty}
                                    />
                                    <RadioButton
                                        id="impossibleOn"
                                        name="impossible"
                                        value="true"
                                        textDisplay="On"
                                        difficulty={difficulty}
                                        updateMode={setDifficulty}
                                    />
                                </div>
                            </div>
                            <div className="settings__formDivider"></div>
                        </>
                        :
                        null
                    }
                    <div className="settings__formButtonRow">
                        <button
                            className="settings__button"
                            type="button"
                            onClick={() => resetButtonHandler()}
                        >
                            Reset
                        </button>
                        <button
                            className="settings__button"
                            type="submit"
                            onClick={(e) => handleFormSubmit(e)}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings;