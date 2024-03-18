import { createTilesArray, buildGrid } from '../helperFunctions';

describe('createTilesArray function', () => {
    test('Positive integer yields array of strings', () => {
        expect(createTilesArray(1)).toStrictEqual(["r0c0", "r1c0", "r2c0", "r3c0"])
    });

    test('Negative interger yields array of strings', () => {
        expect(createTilesArray(-2)).toStrictEqual(["r0c0", "r0c1", "r1c0", "r1c1", "r2c0", "r2c1", "r3c0", "r3c1"]
        )
    });
});

describe('buildGrid function', () => {
    test('Input value that is a multiple of 7 yeilds an array with a length of 28', () => {
        expect(buildGrid(28)).toHaveLength(28)
    });

    test('Input value that is not a multiple of 5, 6, or 7 yields an array with a length of 36', () => {
        expect(buildGrid(-753)).toHaveLength(36);
    });
})

// test shuffleArray to see if same number of elements and no duplicate values appear in output
