// NOTES
/*
types https://www.carlrippon.com/typed-usestate-with-typescript/
configuration https://medium.com/@abuduabiodunsulaiman/setup-react-app-with-webpack-ts-and-js-da80cf3b7278
configuration 2 https://www.smashingmagazine.com/2020/05/typescript-modern-react-projects-webpack-babel/
TS & SASS https://stackoverflow.com/questions/55071266/how-to-use-react-with-typescript-and-sass

*/

export interface ITile {
    tile: string;
    colour: string;
}

export interface IGameOver {
    show: boolean;
    playAgain: () => void;
    score: number[];
}

export interface IOption {
    id: string;
    name: string;
    value: number | string;
    selection: number | string;
}