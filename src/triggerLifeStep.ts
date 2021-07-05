type Binary = 0 | 1;
type BinaryArray = Binary[];
export type BinaryMatrix = BinaryArray[];

type Indices = [number, number];

function getIndices(matrixSize: number, indices: Indices) {
    return indices.map(
        (index: number): number => (matrixSize + index) % matrixSize,
    );
}

function getAdjacentIndices(i: number, j: number): Indices[] {
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
    i: number,
    j: number,
): number {
    return getAdjacentIndices(i, j).reduce(
        (counter: number, indices: Indices): number => {
            const [k, m] = getIndices(matrix.length, indices);
            return counter + matrix[k][m];
        },
        0,
    );
}

function isAlive(matrix: BinaryMatrix, i: number, j: number): boolean {
    return matrix[i][j] === 1;
}

function determineLifeState(
    matrix: BinaryMatrix,
    i: number,
    j: number,
): Binary {
    const aliveNeighboursCount = countAliveNeighbours(matrix, i, j);

    const isAliveAndHealthy =
        isAlive(matrix, i, j) && [2, 3].includes(aliveNeighboursCount);

    const isDeadAndReproduced =
        !isAlive(matrix, i, j) && aliveNeighboursCount === 3;

    return isAliveAndHealthy || isDeadAndReproduced ? 1 : 0;
}

export function triggerLifeStep(matrix: BinaryMatrix): BinaryMatrix {
    return matrix.reduce(
        (
            newMatrix: BinaryMatrix,
            binaryArray: BinaryArray,
            i: number,
        ): BinaryMatrix => [
            ...newMatrix,
            binaryArray.reduce(
                (
                    newBinaryArray: BinaryArray,
                    _binary: Binary,
                    j: number,
                ): BinaryArray => [
                    ...newBinaryArray,
                    determineLifeState(matrix, i, j),
                ],
                [],
            ),
        ],
        [],
    );
}
