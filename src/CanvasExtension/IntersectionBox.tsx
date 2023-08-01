import type { ReactElement } from 'react';
import type Konva from 'konva';
import type { IRect } from '.';

import { StageContext } from '.';
import { cloneElement, useContext } from 'react';

interface IntersectionBoxProps {
  children: ReactElement<Konva.Node>;
  upperRect?: IRect;
  lowerRect?: IRect;
}

interface Vector2d {
  x: number;
  y: number;
}

export function IntersectionBox({
  children,
  upperRect,
  lowerRect,
}: IntersectionBoxProps) {
  const { rectShape, imageShape } = useContext(StageContext);

  const dragBoundFunc = (position: Vector2d) => {
    if (!rectShape || !imageShape) {
      return;
    }

    const nextPosition = {
      x:
        rectShape.x > position.x ||
        rectShape.x + rectShape.width < position.x + imageShape.width
          ? imageShape.x
          : position.x,
      y:
        rectShape.y > position.y ||
        rectShape.y + rectShape.height < position.y + imageShape.height
          ? imageShape.y
          : position.y,
    };

    return nextPosition;
  };

  const boundBoxFunc = (oldBox: IRect, newBox: IRect) => {
    if (!rectShape || !imageShape) {
      return;
    }

    if (
      upperRect &&
      (newBox.x + newBox.width > upperRect.x + upperRect.width ||
        newBox.y + newBox.height > upperRect.y + upperRect.height)
    ) {
      return oldBox;
    }

    if (
      lowerRect &&
      (newBox.x + newBox.width < lowerRect.x + lowerRect.width ||
        newBox.y + newBox.height < lowerRect.y + lowerRect.height ||
        newBox.y - lowerRect.y > 1 ||
        newBox.x - lowerRect.x > 1)
    ) {
      return oldBox;
    }

    return newBox;
  };

  return cloneElement(children, {
    // @ts-ignore
    dragBoundFunc,
    boundBoxFunc,
  });
}
