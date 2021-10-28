import view from './view';
import * as model from './model';
import { timer } from './helpers';

function gridController() {
  model.generateGridObj(view.getGridSize());
  view.renderGrid(model.state.grid);
}

function populationController(cell) {
  model.setCellState(cell);
}

function lifeCycleController() {
  setInterval(() => {
    model.getCycleResult();
    view.renderGrid(model.state.grid);
  }, 1000);
}

// IIFE for subscribers and first grid rendering
(function () {
  gridController();
  view.addHandlerRender(gridController);
  view.addHandlerPopulate(populationController);
  view.addHandlerInitLifeCycle(lifeCycleController);
})();
