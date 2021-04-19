/* eslint-disable class-methods-use-this */
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { ETLPortModel } from './ETLPortModel';

export class ETLPortFactory extends AbstractModelFactory {
  constructor() {
    super('ETLPort');
  }

  generateModel() {
    return new ETLPortModel({
      name: 'unknown',
    });
  }
}
