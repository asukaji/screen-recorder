import type { ReactElement } from 'react';
import type Konva from 'konva';

import { cloneElement } from 'react';

interface IntersectionBoxProps {
  children: ReactElement<Konva.Shape>;
}

interface Vector2d {
  x: number;
  y: number;
}

export function IntersectionBox({ children }: IntersectionBoxProps) {
  const dragBoundFunc = (position: Vector2d) => {
    return {
      x: position.y,
      y: position.x,
    };
  };

  return cloneElement(children, {
    // @ts-ignore
    dragBoundFunc,
  });
}
