import { Stage, Layer } from "react-konva";
import { useEffect, useRef, useState, createContext } from "react";
import { RectTransformer } from "./RectTransformer";
import { ImageTransformer } from "./ImageTransformer";
import { IntersectionLayer } from "./IntersectionLayer";
import { IntersectionBox } from "./IntersectionBox";

import type Konva from "konva";

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

export interface CanvasExtensionCtx {
  // layers: string[];
  rectShape?: IRect;
  imageShape?: IRect;

  setRectShape?: (shape: IRect) => void;
  setImageShape?: (shape: IRect) => void;
}

export const StageContext = createContext<CanvasExtensionCtx>({});

export default function CanvasExtension() {
  const [rectangle, setRectangle] = useState(initialRectangle);
  const [selectedId, selectShape] = useState<string>();
  const stageRef = useRef(null);
  const [shap, setShap] = useState<IRect>({
    x: 150,
    y: 150,
    width: 128,
    height: 128,
  });

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
        imageShape: shap,
        setRectShape: setRectangle,
        setImageShape: setShap,
      }}
    >
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          <RectTransformer
            shapeProps={{ ...rectangle, id: "rect2" }}
            isSelected
            // @ts-ignore
            onChange={setRectangle}
          />
          <IntersectionBox>
            <ImageTransformer
              {...shap}
              isSelected={selectedId === "image"}
              onSelect={() => {
                selectShape("image");
              }}
            />
          </IntersectionBox>
        </Layer>
      </Stage>
    </StageContext.Provider>
  );
}
