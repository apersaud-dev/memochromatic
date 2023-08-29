import React, { Dispatch, SetStateAction } from 'react';
import { Score } from './Score';

interface IHeaderProps {
    score: number[];
    settingsOpen: boolean;
    restart: () => void;
    newGame: () => void;
    toggleSettings: Dispatch<SetStateAction<boolean>>;
    instructionsOpen: boolean;
    toggleInstructions: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<IHeaderProps> = ({ score, settingsOpen, restart, newGame, toggleSettings, instructionsOpen, toggleInstructions }) => {

    const handleClick = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        evt.preventDefault();
        if (settingsOpen)
            toggleSettings(false);
        else
            toggleSettings(true);
    }

    const openModal = (evt: React.MouseEvent<HTMLButtonElement>, modalState: boolean, setModalState: Dispatch<SetStateAction<boolean>>): void => {
        evt.preventDefault();
        if (modalState)
            setModalState(false);
        else
            setModalState(true);
    }

    return (
        <div className="header">
            <div className="header__firstRow">
                <div className="logo">
                    <h1 className="logo__header">MemoChromatic</h1>
                </div>
                <button className="header__instructions" type="button" onClick={(evt) => openModal(evt, instructionsOpen, toggleInstructions)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-40-176h24v-64h-24c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-80c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                </button>
                <button className="header__restart" type="button" onClick={restart}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2S50.1 48.1 57 55l41.6 41.6c87.6-86.5 228.7-86.2 315.8 1 87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2S177.7 224 168 224H48.5z" />
                    </svg>
                </button>
                <button className="header__newGame" type="button" onClick={newGame}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                    </svg>
                </button>
                <button className="header__settings" type="button" onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
                    </svg>
                </button>
            </div>
            <div className="header__secondRow">
                <Score score={score} />
            </div>
        </div>
    )
}

export default Header;