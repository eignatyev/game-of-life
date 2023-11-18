import { BinaryMatrix, triggerLifeStep } from '../src';

describe('triggering cellular life step', (): void => {
    describe('when all cells have 3 neighbors', (): void => {
        test('makes all cells alive', (): void => {
            const cells: BinaryMatrix = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ];

            const actual = triggerLifeStep(cells);

            const expected = [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1],
            ];

            expect(actual).toMatchObject(expected);
        });
    });

    describe('when all cells have less then 2 neighbors', (): void => {
        test('makes all cells dead', (): void => {
            const cells: BinaryMatrix = [
                [0, 0, 0],
                [1, 0, 1],
                [0, 0, 0],
            ];

            const actual = triggerLifeStep(cells);

            const expected = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ];

            expect(actual).toMatchObject(expected);
        });
    });

    describe('when 3 live cells are in a row', (): void => {
        test('live cells rotate by 90 degrees', (): void => {
            const cells: BinaryMatrix = [
                [0, 0, 0, 0],
                [0, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ];

            const actual = triggerLifeStep(cells);

            const expected = [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
            ];

            expect(actual).toMatchObject(expected);
        });
    });
});
