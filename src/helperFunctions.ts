import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { IBoxDimensions, ITile } from "./interfaces";

export const totalScore = (inputArray: number[]) => {
    return inputArray.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
}

export const gameStart = (numOfColumns: number, setTile: React.Dispatch<SetStateAction<ITile[]>>): void => {
    const newGameTiles = buildGrid(numOfColumns);
    setTile(generateRandomPairs(numOfColumns, newGameTiles))
}

export const buildGrid = (int: number): string[] => {
    let grid: string[] = [];
    if (Math.abs(int) % 5 === 0) {
        grid = createTilesArray(5);
    } else if (Math.abs(int) % 6 === 0) {
        grid = createTilesArray(6);
    } else if (Math.abs(int) % 7 === 0) {
        grid = createTilesArray(7);
    } else {
        grid = createTilesArray(9);
    }

    return grid;
};

export const createTilesArray = (int: number): string[] => {
    const tiles: string[] = [];
    const limit = Math.abs(int);

    // can replace the nested for loop with a single loop + use uuid instead of r#c# syntax for tiles
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < limit; j++) {
            tiles.push(`r${i}c${j}`)
        }
    }

    return tiles;
};

export const generateRandomPairs = (columnsState: number, gameTiles: string[], colourChoice = 'square') => {
    const initialTiles = [...gameTiles];
    const finalTiles: ITile[] = [];

    const shuffledTiles = shuffleArray(initialTiles);
    const arr1: string[] = [];
    const arr2: string[] = [];

    for (let a = 0; a < shuffledTiles.length / 2; a++) {
        arr1.push(shuffledTiles[a]);
    }
    for (let b = shuffledTiles.length - 1; b > ((shuffledTiles.length / 2) - 1); b--) {
        arr2.push(shuffledTiles[b]);
    }

    const gameColours = generateColours(colourChoice, columnsState * 4);

    randomizePairs(arr1, arr2, gameColours, finalTiles);
    finalTiles.sort((a: ITile, b: ITile) => (a.tile > b.tile ? 1 : -1));
    // console.log("finalTiles");
    // console.log(finalTiles);
    return finalTiles;
};



export const rotations = (a: number, b: number) => {
    if (b < 0) {
        b = b * 9;
    } else {
        b = b * 0.9;
    }
    return a + b;
};

export const gameOver = (updateGameOverState: Dispatch<SetStateAction<boolean>>) => {
    setTimeout(() => {
        updateGameOverState(true);
    }, 500);
}

export const gameLogic = (gameTiles: ITile[], selectedTiles: number[], updateSelectedTiles: Dispatch<SetStateAction<number[]>>, matchedTiles: number[], updateMatchedTiles: Dispatch<SetStateAction<number[]>>, currentScore: number[], updateScore: Dispatch<SetStateAction<number[]>>, updateTurnCount: Dispatch<SetStateAction<number>>) => {
    setTimeout(() => {
        if (checkForMatch(gameTiles, selectedTiles)) {
            updateMatchedTiles([...matchedTiles, ...selectedTiles]);
            const newScore = [...currentScore, 100];
            updateScore(newScore);
        } else {
            const newScore = [...currentScore, -10];
            updateScore(newScore);
        }
        updateTurnCount(0);
        updateSelectedTiles([]);
    }, 750);
}

// const gameEngine = (columnsState: any, tilesState: any, turnState: any, selectedTilesState: any, matchedState: any, scoreState: any, updateTilesState: any, updateTurnState: any, updateMatchedState: any, updateScoreState: any, updateGameOver: any) => {
//     // determine how and when to load preferences from localStorage - probably should have a separate function to run that code, but need to do some type of check to gate the function


//     // determine how to start a new game
//     // if tiles array is empty, then the tiles haven't been built and the game hasn't startd
//     if (tilesState.length === 0) {
//         const newGameTiles = buildGrid(columnsState);
//         updateTilesState(generateRandomPairs(columnsState, newGameTiles));
//     }

//     // determine how to evaluate what to do after the first selection
//     // determine how to evaluate what to do after second selection
//     if (turnState > 1) {
//         setTimeout(() => {
//             if (checkForMatch(tilesState, selectedTilesState)) {
//                 updateMatchedState([...matchedState, ...selectedTilesState]);
//                 const newScore = [...scoreState, 100];
//                 updateScoreState(newScore);
//             } else {
//                 const newScore = [...scoreState, -10];
//                 updateScoreState(newScore);
//             }
//             updateTurnState(0);
//             updateTilesState([]);
//         }, 1500);
//     }

//     // determine if the game is over
//     if (tilesState.length > 0 && matchedState.length === tilesState.length) {

//         // should memorize or check if stored data has changed before saving/overwriting it
//         // const calculatedScore = score.reduce((previousValue, currentValue) => previousValue + currentValue);

//         // const info = {
//         // // possibly make this an array of top 3 or 5 high scores
//         //   highScore: calculatedScore,
//         //   columns: columns,
//         //   colourScheme: colourScheme
//         // };

//         // window.localStorage.setItem('gameData', JSON.stringify(info));

//         setTimeout(() => {
//             updateGameOver(true);
//         }, 500);
//     }
// };

const shuffleArray = (tilesArray: string[]) => {
    const copyOfArray = [...tilesArray];

    const shuffledArray: string[] = [];
    let i = tilesArray.length;

    while (i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        shuffledArray.push(copyOfArray[randomIndex]);
        copyOfArray.splice(randomIndex, 1);
    }

    return shuffledArray;
};

const randomizePairs = (arr1: string[], arr2: string[], colourArray: string[], resultArray: ITile[]) => {
    let i = arr1.length;

    while (i--) {
        const pair1: ITile = { tile: "", pair: 0, colour: "" };
        const pair2: ITile = { tile: "", pair: 0, colour: "" };
        let randomIndex1 = Math.floor(Math.random() * (i + 1));
        let randomIndex2 = Math.floor(Math.random() * (i + 1));
        // resultObject[arr1[randomIndex1]] = i;
        // resultObject[arr2[randomIndex2]] = i;
        pair1.tile = arr1[randomIndex1];
        pair1.pair = i;
        pair1.colour = colourArray[i];
        resultArray.push(pair1);
        pair2.tile = arr2[randomIndex2];
        pair2.pair = i;
        pair2.colour = colourArray[i];
        resultArray.push(pair2);
        arr1.splice(randomIndex1, 1);
        arr2.splice(randomIndex2, 1);
        colourArray.splice(i, 1);
    }

    return resultArray;
};

const checkForMatch = (tilesState: ITile[], selectedTilesState: number[]) => {
    if (tilesState[selectedTilesState[0]]["pair"] === tilesState[selectedTilesState[1]]["pair"])
        return true;
    return false;
};

const generateMonochromaticScheme = (numOfTiles: number) => {
    const colours: string[] = [];
    const numOfColours = numOfTiles / 2;
    const hue = Math.floor(Math.random() * 361);

    for (let i = 0; i < numOfColours; i++) {
        const saturationOne = generateRandomWithinRange(50, 100);
        const lightnessOne = generateRandomWithinRange(20, 80);
        const lightnessTwo = 100 - lightnessOne;
        const colourOne = `hsl(${hue}deg, ${saturationOne}%, ${lightnessOne}%)`;
        const colourTwo = `hsl(${hue}deg, ${saturationOne}%, ${lightnessTwo}%)`;

        colours.push(colourOne, colourTwo);
    }

    return colours;
}

const generateComplementaryColours = (numOfTiles: number) => {
    const colours: string[] = [];
    const numOfColours = numOfTiles / 4;
    const hueOne = Math.floor(Math.random() * 361);
    let hueTwo = hueOne + 180;
    if (hueTwo > 360)
        hueTwo -= 360;

    for (let i = 0; i < numOfColours; i++) {
        const saturationOne = generateRandomWithinRange(50, 100);
        const lightnessOne = generateRandomWithinRange(20, 80);

        // Check if colour already exists in array by looping through the colours array and checking if 
        // each nested array contains the saturation and lightness colours that were just generated in this iteration of the loop
        // if the value exists, generate new values; otherwise push the value into the array along with it's complementary value
        //if(ensureNoDuplicateColours(colours, newColour)) {
        // figure out how to do this recursively
        //}

        const lightnessTwo = 100 - lightnessOne;
        const colourOne = `hsl(${hueOne}deg, ${saturationOne}%, ${lightnessOne}%)`
        const colourTwo = `hsl(${hueTwo}deg, ${saturationOne}%, ${lightnessTwo}%)`

        colours.push(colourOne, colourTwo);
    }
    return colours;
}

const generateThreeColours = (numOfTiles: number, style: string) => {
    const colours: string[] = [];
    const numOfColours = numOfTiles / 3;
    const hueOne = Math.floor(Math.random() * 361);
    let change = 0;
    let hueTwo = 0;
    let hueThree = 0;

    switch (style) {
        case 'analogous':
            change = 30;
            break;
        case 'triadic':
            change = 120;
            break;
        case 'split':
            change = 150;
            break;
        default:
            change = 120;
            break;
    }


    if (style === 'split') {
        hueTwo = hueOne + change;
        hueThree = hueOne - change;
    } else {
        hueTwo = hueOne + change;
        hueThree = hueTwo + change;
    }


    for (let i = 0; i < numOfColours; i++) {
        const saturationOne = generateRandomWithinRange(50, 100);
        const lightnessOne = generateRandomWithinRange(20, 80);

        const colourOne = `hsl(${hueOne}deg, ${saturationOne}%, ${lightnessOne}%)`
        const colourTwo = `hsl(${hueTwo}deg, ${saturationOne}%, ${lightnessOne}%)`
        const colourThree = `hsl(${hueThree}deg, ${saturationOne}%, ${lightnessOne}%)`

        colours.push(colourOne, colourTwo, colourThree);
    }
    return colours;
}

const generateFourColours = (numOfTiles: number, style: string) => {
    const colours: string[] = [];
    const numOfColours = numOfTiles / 4;
    const hueOne = Math.floor(Math.random() * 361);
    let hueTwo = 0;
    let hueThree = 0;
    let hueFour = 0;

    switch (style) {
        case 'tetradic':
            hueTwo = hueOne + 30;
            hueThree = hueOne + 180;
            hueFour = hueTwo + 180;
            break;
        case 'square':
            hueTwo = hueOne + 90;
            hueThree = hueTwo + 90
            hueFour = hueThree + 90;
            break;
        default:
            hueTwo = hueOne + 90;
            hueThree = hueTwo + 90
            hueFour = hueThree + 90;
            break;
    }

    for (let i = 0; i < numOfColours; i++) {
        const saturationOne = generateRandomWithinRange(50, 100);
        const lightnessOne = generateRandomWithinRange(20, 80);

        const colourOne = `hsl(${hueOne}deg, ${saturationOne}%, ${lightnessOne}%)`
        const colourTwo = `hsl(${hueTwo}deg, ${saturationOne}%, ${lightnessOne}%)`
        const colourThree = `hsl(${hueThree}deg, ${saturationOne}%, ${lightnessOne}%)`
        const colourFour = `hsl(${hueFour}deg, ${saturationOne}%, ${lightnessOne}%)`

        colours.push(colourOne, colourTwo, colourThree, colourFour);
    }
    return colours;
}

const generateRandomWithinRange = (min: number, max: number) => {
    const difference = max - min + 1;
    const value = Math.floor(Math.random() * difference) + min;
    return value;
}

export const generateColours = (style: string, tiles: number) => {
    let gameColours: string[];

    if (style === "tetradic" || style === "square") {
        gameColours = generateFourColours(tiles, style);
    } else if (style === "analogous" || style === "triadic" || style === "split-complementary") {
        gameColours = generateThreeColours(tiles, style);
    } else if (style === "complementary") {
        gameColours = generateComplementaryColours(tiles)
    } else {
        gameColours = generateMonochromaticScheme(tiles);
    }

    return gameColours;
}



function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

// https://stackoverflow.com/questions/12710905/how-do-i-dynamically-assign-properties-to-an-object-in-typescript
// https://stackoverflow.com/questions/12710905/how-do-i-dynamically-assign-properties-to-an-object-in-typescript/54445030#54445030

export const defineBoxDim = (width: number, impMode: boolean) => {
    let boxDim: IBoxDimensions = { length: 0, margin: 0 };

    if (!impMode) {
        if (width < 484) {
            boxDim["length"] = 50;
            boxDim["margin"] = 4;
        }
        else if (width > 484 && width <= 554) {
            boxDim["length"] = 60;
            boxDim["margin"] = 4;
        }
        else if (width > 554 && width <= 656) {
            boxDim["length"] = 70;
            boxDim["margin"] = 4;
        }
        else if (width > 656 && width <= 758) {
            boxDim["length"] = 80;
            boxDim["margin"] = 6;
        }
        else if (width > 758 && width <= 860) {
            boxDim["length"] = 90;
            boxDim["margin"] = 8;
        }
        else {
            boxDim["length"] = 100;
            boxDim["margin"] = 10;
        }
    } else {
        boxDim["length"] = 70;
        boxDim["margin"] = 4;
    }


    return boxDim;
}

export const defineBoardWidth = (width: number, columns: number, impMode: boolean) => {
    let gridWidth: number;

    if (impMode) {
        gridWidth = 468;
    } else {
        const boxDim = defineBoxDim(width, false);
        // console.log(boxDim);
        // console.log(columns);
        gridWidth = (boxDim.length * columns) + (boxDim.margin * (columns * 2));
    }

    return gridWidth;
}

export const handleInputChange = (value: string | number, state: any) => {
    // How can I set the value of the input/radio to a number instead of a string?
    let input: number | string | boolean;
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

export const forceMatches = (tiles: ITile[], updateMatchedTiles: Dispatch<SetStateAction<number[]>>) => {
    const resArr = [];
    
    for (let i=1; i <tiles.length; i++) {
        if(tiles[i].pair !== tiles[0].pair) {
            // push values into matched array state
            resArr.push(i);
        }
    }
    updateMatchedTiles(resArr);
}


/*
function shuffleFisherYates(array) {
 let i = array.length;
 while (i--) {
   const ri = Math.floor(Math.random() * i);
   [array[i], array[ri]] = [array[ri], array[i]];
 }
 return array;
}
*/


// HSL Colour Math
/*
Complementary:          180d from C1 to C2
Anagolous:              30d from C1 to C2; 30d from C2 to C3
Triadic:                120d from C1 to C2; 120d from C2 to C3;
Split-complementary:    150d from C1 to C2; 150d from C1 to C3 in opposite direction on the wheel
Tetradic:               30d from C1 to C2; 180d from C1 to C3; 180d from C2 to C4
Square:                 90d from C1 to C2; 90d from C2 to C3; 90d from C3 to C4;
*/