import type { ReactElement } from "react";
import type Konva from "konva";
import { StageContext } from ".";

import { cloneElement, useContext } from "react";

interface IntersectionBoxProps {
  children: ReactElement<Konva.Shape>;
}

interface Vector2d {
  x: number;
  y: number;
}

export function IntersectionBox({ children }: IntersectionBoxProps) {
  const { rectShape, imageShape } = useContext(StageContext);

  const dragBoundFunc = (position: Vector2d) => {
    if (!rectShape || !imageShape) {
      return;
    }

    return {
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
  };

  return cloneElement(children, {
    // @ts-ignore
    dragBoundFunc,
  });
}
