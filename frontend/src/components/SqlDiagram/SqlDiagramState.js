/* eslint-disable brace-style */
import {
  SelectingState,
  State,
  Action,
  InputType,
  DragCanvasState,
} from '@projectstorm/react-canvas-core';
import {
  DragDiagramItemsState,
  DragNewLinkState,
} from '@projectstorm/react-diagrams';
import { ETLPortModel } from '@/components/ETLPort/ETLPortModel';

export class SqlDiagramState extends State {
  constructor() {
    super({ name: 'starting-state' });
    this.childStates = [new SelectingState()];
    this.dragCanvas = new DragCanvasState();
    this.dragLinks = new DragNewLinkState();
    this.dragItems = new DragDiagramItemsState();

    // determine what was clicked on
    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: event => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(event);
          //  以前superset抓classname 現在用style component 我暫時用id去抓
          const diagram = document.getElementById('sqldiagram');
          if (diagram.contains(event.event.target)) {
            // the canvas was clicked on, transition to the dragging canvas state
            if (!element) {
              this.transitionWithEvent(this.dragCanvas, event);
            }
            // initiate dragging a new link
            else if (element instanceof ETLPortModel) {
              this.transitionWithEvent(this.dragLinks, event);
            }
            // move the items (and potentially link points)
            else {
              this.transitionWithEvent(this.dragItems, event);
            }
          }
        },
      }),
    );
  }
}
