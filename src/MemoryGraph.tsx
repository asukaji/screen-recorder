import G6, { Graph, IG6GraphEvent, NodeConfig } from '@antv/g6';
import Node from './Node';
import ArrowEdge from './ArrowEdge';
import ZoomHandler from './ZoomHandler';

import { useRef, useEffect, useState } from 'react';

import data from './assets/g6Data.json';

interface Model {
  id: string;
  label: string;
  size: number;
}

G6.registerNode('object', Node);
G6.registerEdge('arrowEdge', ArrowEdge);

export default function MemoryGraph() {
  const graphRef = useRef<HTMLDivElement>(null);
  const graph = useRef<Graph>();
  const target = useRef<IG6GraphEvent['target']>();
  const [model, setModel] = useState<Model>();
  // TODO watch el size changed

  useEffect(() => {
    const container = graphRef.current;

    if (!container) {
      return;
    }

    graph.current = new G6.TreeGraph({
      container,
      width: 900,
      height: 600,
      fitView: true,
      fitCenter: true,
      animate: false,
      linkCenter: true,
      plugins: [ZoomHandler()],
      modes: {
        default: ['drag-canvas', 'click-select'],
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => {
          return 20;
        },
        getWidth: () => {
          return 80;
        },
        getVGap: () => {
          return 100;
        },
        getHGap: () => {
          return 100;
        },
        getSide: ({ id }: NodeConfig) => {
          return id === '10774766256' ? 'left' : 'right';
        },
      },
      defaultNode: {
        type: 'object',
      },
      defaultEdge: {
        type: 'arrowEdge',
      },
    });

    graph.current.data(data);
    graph.current.render();

    // appendAutoShapeListener(graph.current);

    graph.current?.on('node:click', ({ item }) => {
      if (!item) {
        return;
      }

      if (target?.current) {
        // @ts-ignore
        graph.current?.updateItem(target?.current, {
          isActive: false,
        });
      }

      // @ts-ignore
      setModel(item?.getModel());

      // @ts-ignore
      target.current = item;
      graph.current?.updateItem(item, {
        isActive: true,
      });
    });

    graph.current.on('node:dblclick', ({ item }) => {
      if (!item) {
        return;
      }

      const nodeModel = item.getModel();
      nodeModel.collapsed = false;

      // graph.current?.updateItem(item, {
      //   collapsed: false,
      // });
      graph.current?.layout();
      graph.current?.setItemState(item, 'collapsed', false);
      // graph.current?.refresh();
    });

    // const node = graph.current?.findById('5871807504');

    return () => graph.current?.destroy();
  }, []);

  return (
    <div ref={graphRef}>
      <div>
        {model?.label}
        {model?.id}
      </div>
    </div>
  );
}
