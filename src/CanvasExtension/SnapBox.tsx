import type { IRect } from '.';
import type { ReactElement } from 'react';
import type Konva from 'konva';

import { cloneElement } from 'react';

// 吸附阈值
const snapThreshold = 20;

function snapToLine(coordinate: number, line: number) {
  return Math.abs(coordinate - line) < snapThreshold ? line : null;
}

interface SnapBoxProps {
  shapeProps: IRect;
  lineY: number;
  lineX: number;
  children: ReactElement;
  onSnap: (shape: Partial<IRect>) => void;
}

export function SnapBox(props: SnapBoxProps) {
  const { children, lineY, lineX, shapeProps, onSnap } = props;

  const onDragMove = (event: Konva.KonvaEventObject<DragEvent>) => {
    const node = event.target;

    const snapX = snapToLine(node.x(), lineX);
    const snapY = snapToLine(node.y(), lineY);

    if (snapX || snapY) {
      onSnap({
        x: snapX ?? node.x(),
        y: snapY ?? node.y(),
      });
    }
  };

  return cloneElement(children, {
    onDragMove,
  });
}
