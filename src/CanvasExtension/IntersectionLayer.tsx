import type { ReactNode } from 'react';
import type Konva from 'konva';

import { Layer, Transformer } from 'react-konva';
import { Children, isValidElement, useRef } from 'react';

interface IntersectionLayerProps {
  children: ReactNode;
}

interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function haveIntersection(stillRect: IRect, draggingRect: IRect) {
  return !(
    draggingRect.x > stillRect.x + stillRect.width ||
    draggingRect.x + draggingRect.width < stillRect.x ||
    draggingRect.y > stillRect.y + stillRect.height ||
    draggingRect.y + draggingRect.height < stillRect.y
  );
}

export function IntersectionLayer({ children }: IntersectionLayerProps) {
  const layerRef = useRef<Konva.Layer>(null);

  const onDragMove = (event: Konva.KonvaEventObject<DragEvent>) => {
    const draggingTarget = event.target;
    // 矩形边框
    const draggingTargetRect = draggingTarget.getClientRect();

    if (!layerRef.current?.children) {
      return;
    }

    layerRef.current?.children.forEach((child) => {
      if (child === draggingTarget) {
        return;
      }

      console.log(child);
      if (haveIntersection(child.getClientRect(), draggingTargetRect)) {
        console.log(child.getClientRect(), draggingTargetRect);
      }
    });

    // Children.forEach(children, (child, index) => {
    //   if (index + 1 === draggingTarget.index) {
    //     return;
    //   }

    //   console.log(child?.valueOf());
    // });
  };

  return (
    <Layer ref={layerRef} onDragMove={onDragMove}>
      {children}
    </Layer>
  );
}
