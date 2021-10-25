import gridView from './gridView';
import * as model from './model';
import { timer } from './helpers';

function gridController() {
  model.generateGridObj(gridView.getGridSize());
  gridView.renderGrid(model.state.grid);
}

function populationController(cell) {
  model.setCellState(cell);
}

function lifeCycleController() {
  model.getCycleResult();
  gridView.renderGrid(model.state.grid);
}

// IIFE for subscribers and first grid rendering
(function () {
  gridController();
  gridView.addHandlerRender(gridController);
  gridView.addHandlerPopulate(populationController);
  gridView.addHandlerInitLifeCycle(lifeCycleController);
})();
