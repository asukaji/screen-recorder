import type Konva from 'konva';

import { Transformer } from './Transformer';
import { Rect } from 'react-konva';

interface RectTransformerProps {
  shapeProps: Konva.RectConfig;
  isSelected: boolean;
  boundBoxFunc?: Konva.TransformerConfig['boundBoxFunc'];
  onSelect: () => void;
  onChange: (config: Konva.RectConfig) => void;
}

export function RectTransformer({
  shapeProps,
  isSelected,
  boundBoxFunc,
  onSelect,
  onChange,
}: RectTransformerProps) {
  return (
    <Transformer
      isSelected={isSelected}
      enabledAnchors={[
        'top-center',
        'middle-right',
        'bottom-center',
        'middle-left',
      ]}
      ignoreStroke={true}
      borderStroke='blue'
      anchorFill='blue'
      anchorStrokeWidth={0}
      anchorCornerRadius={20}
      anchorStyleFunc={(anchor: any) => {
        if (anchor.hasName('top-center') || anchor.hasName('bottom-center')) {
          anchor.width(40);
          anchor.offsetX(20);
        }
        if (anchor.hasName('middle-right') || anchor.hasName('middle-left')) {
          anchor.height(40);
          anchor.offsetY(20);
        }
      }}
      boundBoxFunc={boundBoxFunc}
    >
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        {...shapeProps}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        // @ts-ignore
        onTransformEnd={(node: Konva.Group) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      ></Rect>
    </Transformer>
  );
}
