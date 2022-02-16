import { Graph, IG6GraphEvent, INode, IShape } from '@antv/g6';

export type ShapeEventListener = (
  event: IG6GraphEvent,
  node: INode | null,
  shape: IShape,
  graph: Graph
) => void;

export interface EventAttrs {
  onClick?: ShapeEventListener;
  onNextClick?: ShapeEventListener;
}
const propsToEventMap = {
  click: 'onClick',
  onCollapse: 'onCollapse',
};

export function appendAutoShapeListener(graph: Graph) {
  Object.entries(propsToEventMap).map(([eventName, propName]) => {
    graph.on(`node:${eventName}`, (evt) => {
      const shape = evt.shape;
      const item = evt.item as INode;
      const graph = evt.currentTarget as Graph;
      const func = shape?.get(propName) as ShapeEventListener;
      if (func) {
        func(evt, item, shape, graph);
      }
    });
  });
}
