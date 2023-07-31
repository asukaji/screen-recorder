import { Stage, Layer } from 'react-konva';
import { useEffect, useRef, useState, createContext } from 'react';
import { RectTransformer } from './RectTransformer';
import { ImageTransformer } from './ImageTransformer';
import { IntersectionLayer } from './IntersectionLayer';
import { IntersectionBox } from './IntersectionBox';

import type Konva from 'konva';

export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const initialRectangle = {
  x: 150,
  y: 150,
  width: 512,
  height: 512,
};

type Cursor = 'grab' | 'grabbing' | undefined;
export interface CanvasExtensionCtx {
  rectShape?: IRect;
  imageShape?: IRect;
  cursor?: Cursor;

  setRectShape?: (shape: IRect) => void;
  setImageShape?: (shape: IRect) => void;
  setCursor?: (cursor: Cursor) => void;
}

export const StageContext = createContext<CanvasExtensionCtx>({});

export default function CanvasExtension() {
  const [rectangle, setRectangle] = useState(initialRectangle);
  const [selectedId, selectShape] = useState<string>();
  const stageRef = useRef(null);
  const [shape, setShape] = useState<IRect>({
    x: 150,
    y: 150,
    width: 128,
    height: 128,
  });
  const [cursor, setCursor] = useState<Cursor>();

  const checkDeselect = (e: Konva.KonvaEventObject<unknown>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(undefined);
    }
  };

  return (
    <StageContext.Provider
      value={{
        rectShape: rectangle,
        imageShape: shape,
        cursor,
        setCursor,
        setRectShape: setRectangle,
        setImageShape: setShape,
      }}
    >
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        style={{
          cursor,
        }}
      >
        <Layer>
          <IntersectionBox lowerRect={shape}>
            <RectTransformer
              shapeProps={{ ...rectangle, id: 'rect2' }}
              isSelected
              onChange={setRectangle}
            />
          </IntersectionBox>
          <IntersectionBox
            upperRect={rectangle}
            onRectChange={(rect) => {
              setShape({
                ...shape,
                ...rect,
              });
            }}
          >
            <ImageTransformer
              shapeProps={{ ...shape, id: 'image' }}
              isSelected={selectedId === 'image'}
              onSelect={() => {
                selectShape('image');
              }}
              onChange={setShape}
            />
          </IntersectionBox>
        </Layer>
      </Stage>
    </StageContext.Provider>
  );
}
