/* eslint-disable class-methods-use-this */
import * as React from 'react';
import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import { LinkNodeModel } from './LinkNodeModel';
import { LinkNodeWidget } from './LinkNodeWidget';

export class LinkNodeFactory extends DefaultLinkFactory {
  constructor() {
    super('LinkNode'); // <-- this matches with the link model above
  }

  generateModel() {
    return new LinkNodeModel(); // <-- this is how we get new instances
  }

  generateLink(model, path) {
    return <LinkNodeWidget model={model} path={path} />;
  }
}
