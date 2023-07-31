import type Konva from 'konva';
import type { IRect } from '.';

import { Image } from 'react-konva';
import { Transformer } from './Transformer';
import { StageContext } from '.';
import { useContext } from 'react';
import useImage from 'use-image';

interface ImageTransformerProps
  extends Omit<Konva.ImageConfig, 'isSelected' | 'onSelect'> {
  boundBoxFunc?: Konva.TransformerConfig['boundBoxFunc'];
  isSelected: boolean;
  onSelect: () => void;
  onChange: (config: IRect) => void;
}

export function ImageTransformer({
  isSelected,
  onSelect,
  boundBoxFunc,
  onChange,
  shapeProps,
  ...imageProps
}: ImageTransformerProps) {
  const [image] = useImage('https://konvajs.org/assets/lion.png');
  const { setCursor } = useContext(StageContext);

  const onMouseEnter = () => {
    setCursor?.('grab');
  };
  const onMouseDown = () => {
    setCursor?.('grabbing');
  };
  const onMouseUp = () => {
    setCursor?.('grab');
  };
  const onMouseLeave = () => {
    setCursor?.(undefined);
  };

  return (
    <Transformer
      // ref={imageRef}
      isSelected={isSelected}
      enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
      boundBoxFunc={boundBoxFunc}
    >
      <Image
        draggable
        image={image}
        {...shapeProps}
        onClick={onSelect}
        onMouseEnter={onMouseEnter}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTransform={(event) => {
          const node = event.target;

          onChange({
            width: node.width(),
            height: node.height(),
            x: node.x(),
            y: node.y(),
          });
        }}
        {...imageProps}
      />
    </Transformer>
  );
}
