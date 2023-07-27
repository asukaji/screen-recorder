import { Stage, Layer } from 'react-konva';
import { useEffect, useRef, useState } from 'react';
import { RectTransformer } from './RectTransformer';
import { ImageTransformer } from './ImageTransformer';
import { IntersectionLayer } from './IntersectionLayer';
import { IntersectionBox } from './IntersectionBox';

import type Konva from 'konva';

const initialRectangle = {
  x: 150,
  y: 150,
  width: 512,
  height: 512,
  id: 'rect2',
};

export default function CanvasExtension() {
  const [rectangle, setRectangle] = useState(initialRectangle);
  const [selectedId, selectShape] = useState<string>();
  const stageRef = useRef(null);

  const checkDeselect = (e: Konva.KonvaEventObject<unknown>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(undefined);
    }
  };

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        <RectTransformer
          shapeProps={rectangle}
          isSelected
          // @ts-ignore
          onChange={setRectangle}
        />
        <IntersectionBox>
          <ImageTransformer
            shapeProps={{
              x: 150,
              y: 150,
              width: 128,
              height: 128,
            }}
            isSelected={selectedId === 'image'}
            onSelect={() => {
              selectShape('image');
            }}
          />
        </IntersectionBox>
      </Layer>
    </Stage>
  );
}
