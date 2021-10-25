import { DEFAULT_ROWS, DEFAULT_COLS } from './config';

export const state = {
  grid: {
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
    cells: [],
    population: [],
  },
};

function _populate(cell) {
  state.grid.population.push(cell);
}

function _unpopulate(cell) {
  const index = state.grid.population.indexOf(cell);
  state.grid.population.splice(index, 1);
}

function _getLivingNeighbours(cell) {
  cell.livingNeighbours = [];
  cell.neighbours.forEach(n => {
    const curcell = state.grid.cells.find(cell => cell.coords === n);
    if (curcell?.alive) cell.livingNeighbours.push(n);
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
        row: row,
        col: col,
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
  const curCell = state.grid.cells.find(el => el.coords === cell.cellCoords);
  curCell.alive = !curCell.alive;
  curCell.alive ? _populate(curCell) : _unpopulate(curCell);
}

export function getCycleResult() {
  const nextGeneration = JSON.parse(JSON.stringify(state.grid.cells));

  state.grid.cells.forEach(curCell => {
    _getLivingNeighbours(curCell);
    let aliveNeighbours = curCell.livingNeighbours.length;
    const nextGenCell = nextGeneration.find(
      cell => cell.coords === curCell.coords
    );
    if (aliveNeighbours < 2 || aliveNeighbours > 3) nextGenCell.alive = false;
    if (aliveNeighbours === 3) nextGenCell.alive = true;
  });

  state.grid.cells.forEach(curCell => {
    const nextGenCell = nextGeneration.find(
      cell => cell.coords === curCell.coords
    );
    curCell.alive = nextGenCell.alive;
  });
}
