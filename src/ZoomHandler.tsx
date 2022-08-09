import G6 from '@antv/g6';

import styles from './ZoomHandler.module.less';

export default function ZoomHandler() {
  return new G6.ToolBar({
    position: { x: 128, y: 32 },
    className: styles.toolbar,
    getContent: () => {
      return `
        <ul>
          <li code='zoomOut'>+</li>
          <li code='zoomIn'>-</li>
        </ul>
      `;
    },
    handleClick: (code, graph) => {
      switch (code) {
        case 'zoomOut':
          graph.zoom(1.2);
          break;
        case 'zoomIn':
          graph.zoom(0.8);
          break;
        default:
          break;
      }
    },
  });
}
