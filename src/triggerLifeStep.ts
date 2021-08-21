type Binary = 0 | 1;
type BinaryArray = Binary[];
export type BinaryMatrix = BinaryArray[];

type Coordinates = [number, number];

function getIndices(matrixSize: number, indices: Coordinates) {
    return indices.map(
        (index: number): number => (matrixSize + index) % matrixSize,
    );
}

function getAdjacentIndices(coordinates: Coordinates): Coordinates[] {
    const [i, j] = coordinates;

    return [
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j + 1],
        [i + 1, j + 1],
        [i + 1, j],
        [i + 1, j - 1],
        [i, j - 1],
    ];
}

function countAliveNeighbours(
    matrix: BinaryMatrix,
    coordinates: Coordinates,
): number {
    return getAdjacentIndices(coordinates).reduce(
        (counter: number, indices: Coordinates): number => {
            const [k, m] = getIndices(matrix.length, indices);
            return counter + matrix[k][m];
        },
        0,
    );
}

function isAlive(matrix: BinaryMatrix, coordinates: Coordinates): boolean {
    const [i, j] = coordinates;
    return matrix[i][j] === 1;
}

function determineLifeState(
    matrix: BinaryMatrix,
    coordinates: Coordinates,
): Binary {
    const aliveNeighboursCount = countAliveNeighbours(matrix, coordinates);

    const isAliveAndHealthy =
        isAlive(matrix, coordinates) && [2, 3].includes(aliveNeighboursCount);

    const isDeadAndReproduced =
        !isAlive(matrix, coordinates) && aliveNeighboursCount === 3;

    return isAliveAndHealthy || isDeadAndReproduced ? 1 : 0;
}

export function triggerLifeStep(matrix: BinaryMatrix): BinaryMatrix {
    return matrix.map(
        (binaryArray: BinaryArray, i: number): BinaryArray =>
            binaryArray.map(
                (_binary: Binary, j: number): Binary =>
                    determineLifeState(matrix, [i, j]),
            ),
    );
}
