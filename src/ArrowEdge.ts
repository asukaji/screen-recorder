import { ModelConfig, GraphOptions } from '@antv/g6';

interface cfg extends ModelConfig {
  id: string;
  isActive?: boolean;
}

const arrowEdge = {
  getPath(points: any) {
    const [startPoint, endPoint] = points;

    return [
      ['M', startPoint.x - 40, startPoint.y],
      ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
      ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
      ['L', endPoint.x + 40, endPoint.y],
    ];
  },

  getShapeStyle(cfg: cfg): GraphOptions['defaultEdge'] {
    const { startPoint, endPoint } = cfg;
    const points = [startPoint, endPoint];

    const path = this.getPath(points);

    return {
      stroke: '#BBB',
      lineWidth: 1,
      path,
      startArrow: true,
      endArrow: true,
    };
  },
};

export default arrowEdge;
