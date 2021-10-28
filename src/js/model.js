import { DEFAULT_ROWS, DEFAULT_COLS } from './config';

export const state = {
  grid: {
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
    cells: [],
  },
};

function _findCell(arrayOfCells, cell) {
  return arrayOfCells.find(
    curCell =>
      curCell.coords === cell ||
      curCell.coords === cell?.coords ||
      curCell.coords === cell?.cellCoords
  );
}

function _populate(cell) {
  cell.alive = true;
}

function _unpopulate(cell) {
  cell.alive = false;
}

function _getLivingNeighbours(cell) {
  cell.livingNeighbours = [];
  cell.neighbours.forEach(n => {
    const curcell = _findCell(state.grid.cells, n);
    curcell?.alive && cell.livingNeighbours.push(n);
  });
}

export function generateGridObj({ rows = DEFAULT_ROWS, cols = DEFAULT_COLS }) {
  state.grid.rows = rows;
  state.grid.cols = cols;
  state.grid.cells.length = 0;
  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      state.grid.cells.push({
        coords: `r${row}-c${col}`,
        alive: false,
        neighbours: [
          `r${row + 1}-c${col + 1}`,
          `r${row}-c${col + 1}`,
          `r${row - 1}-c${col + 1}`,
          `r${row + 1}-c${col}`,
          `r${row - 1}-c${col}`,
          `r${row + 1}-c${col - 1}`,
          `r${row}-c${col - 1}`,
          `r${row - 1}-c${col - 1}`,
        ],
      });
    }
  }
}

export function setCellState(cell) {
  const curCell = _findCell(state.grid.cells, cell);
  curCell.alive = !curCell.alive;
  // or curCell.alive ? _unpopulate(curCell) : _populate(curCell);
}

export function getCycleResult() {
  const nextGeneration = JSON.parse(JSON.stringify(state.grid.cells));

  state.grid.cells.forEach(cell => {
    _getLivingNeighbours(cell);
    let aliveNeighbours = cell.livingNeighbours.length;
    const nextGenCell = _findCell(nextGeneration, cell);
    if (aliveNeighbours < 2 || aliveNeighbours > 3) _unpopulate(nextGenCell);
    if (aliveNeighbours === 3) _populate(nextGenCell);
  });

  state.grid.cells.forEach(cell => {
    const nextGenCell = _findCell(nextGeneration, cell);
    cell.alive = nextGenCell.alive;
  });
}
