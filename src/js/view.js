class View {
  //#region fields
  _gridForm = document.querySelector('.grid__form');
  _parentElement = document.querySelector('.grid--container');
  //#endregion

  //#region methods
  //protected
  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup(gridObj) {
    const markup = [];
    for (let row = 1; row <= gridObj.rows; row++) {
      markup.push(`<div class="row">`);
      gridObj.cells
        .filter(cell => cell.coords.includes(`r${row}-`))
        .forEach(cell =>
          markup.push(
            `<div class="cell ${cell.alive ? 'alive' : ''}" data-cell-coords="${
              cell.coords
            }" data-cell-alive="${cell.alive}"></div>`
          )
        );
      markup.push('</div>');
    }

    return markup.join('');
  }
  //public
  getGridSize() {
    const rows = +this._gridForm.querySelector('#inputRows').value;
    const cols = +this._gridForm.querySelector('#inputCols').value;
    return { rows, cols };
  }

  renderGrid(gridObj) {
    const markup = this._generateMarkup(gridObj);
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  //publisher
  addHandlerRender(handler) {
    this._gridForm
      .querySelectorAll('.inputs')
      .forEach(el => el.addEventListener('change', () => handler()));
  }

  addHandlerPopulate(handler) {
    this._parentElement.addEventListener('click', event => {
      const cell = event.target.closest('.cell');
      if (!cell) return;
      cell.classList.contains('alive')
        ? cell.classList.remove('alive')
        : cell.classList.add('alive');

      cell.dataset.cellAlive = cell.classList.contains('alive') ? true : false;
      handler(cell.dataset);
    });
  }

  addHandlerInitLifeCycle(handler) {
    const btn = document.querySelector('.btn--init');
    if (!btn) return;
    btn.addEventListener('click', () => {
      handler();
    });
  }
}
//#endregion

export default new View();
