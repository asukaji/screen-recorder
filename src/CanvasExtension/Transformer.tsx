import type { ReactElement, ComponentProps } from 'react';
import type Konva from 'konva';

import { useRef, useEffect, cloneElement } from 'react';
import { Transformer as KonvaTransformer } from 'react-konva';

interface TransformerProps extends ComponentProps<typeof KonvaTransformer> {
  children: ReactElement<
    Omit<Konva.GroupConfig, 'onTransformEnd'> & {
      onTransformEnd: (node: Konva.Group | null) => void;
    }
  >;
  isSelected: boolean;
}

export function Transformer({
  children,
  isSelected,
  ...props
}: TransformerProps) {
  const trRef = useRef<Konva.Transformer>(null);
  const shapeRef = useRef<Konva.Group>(null);

  useEffect(() => {
    if (!shapeRef.current || !trRef.current || !isSelected) {
      return;
    }
    // we need to attach transformer manually
    trRef.current.nodes([shapeRef.current]);
    trRef.current.getLayer()?.batchDraw();
  }, [isSelected]);

  const onTransformEnd = () =>
    children.props.onTransformEnd?.(shapeRef.current);

  return (
    <>
      {cloneElement(children, {
        ref: shapeRef,
        onTransformEnd,
      })}

      {isSelected && (
        <KonvaTransformer
          ref={trRef}
          rotateEnabled={false}
          // boundBoxFunc={(oldBox, newBox) => {
          //   // limit resize
          //   if (newBox.width < 50 || newBox.height < 50) {
          //     return oldBox;
          //   }
          //   return newBox;
          // }}
          {...props}
        />
      )}
    </>
  );
}
