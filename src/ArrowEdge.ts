import { ModelConfig, IGroup, IShape } from '@antv/g6';

interface cfg extends ModelConfig {
  id?: string;
  isActive?: boolean;
}

const arrowEdge = {
  getPath(points: any) {
    const [startPoint, endPoint] = points;

    return [
      ['M', startPoint.x - 40, startPoint.y],
      ['L', endPoint.x / 2 + (1 / 2) * startPoint.x, startPoint.y],
      ['L', endPoint.x / 2 + (1 / 2) * startPoint.x, endPoint.y],
      ['L', endPoint.x + 40, endPoint.y],
    ];
  },

  draw(cfg?: cfg, group?: IGroup) {
    if (!cfg || !group) {
      return {} as IShape;
    }

    const { startPoint, endPoint } = cfg;

    if (!startPoint || !endPoint) {
      return {} as IShape;
    }

    const path = this.getPath([startPoint, endPoint]);

    const shape = group.addShape('path', {
      attrs: {
        stroke: '#BBB',
        path,
        startArrow: true,
        endArrow: true,
      },
      name: 'path-shape',
    });

    group.addShape('text', {
      attrs: {
        text: '2222',
        fill: '#BBB',
        x: endPoint.x + 64,
        y: endPoint.y - 12,
      },
      name: 'left-text-shape',
    });

    return shape;
  },
};

export default arrowEdge;
