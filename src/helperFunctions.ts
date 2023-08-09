export const totalScore = (inputArray: number[]) => {
    return inputArray.reduce((previousValue: number, currentValue: number) => previousValue + currentValue);
}