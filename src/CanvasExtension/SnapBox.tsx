import type { IRect } from '.';
import type { ReactNode } from 'react';
import type Konva from 'konva';

import { Group } from 'react-konva';

// 吸附阈值
const snapThreshold = 10;

function snapTo(getCoordinate: (rect: IRect) => number) {
  return (shape: IRect, line: number) =>
    Math.abs(getCoordinate(shape) - line) < snapThreshold ? line : null;
}

const snapHorizontal = snapTo((rect: IRect) => rect.x);

const snapVertical = snapTo((rect: IRect) => rect.y);

function snapToLine(coordinate: number, line: number) {
  return Math.abs(coordinate - line) < snapThreshold ? line : null;
}

interface SnapBoxProps {
  shapeProps: IRect;
  lineY: number;
  lineX: number;
  children: ReactNode;
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

  return (
    <Group {...shapeProps} onDragMove={onDragMove}>
      {children}
    </Group>
  );
}
