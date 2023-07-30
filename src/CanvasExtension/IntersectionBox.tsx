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
