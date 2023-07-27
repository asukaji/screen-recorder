import type Konva from 'konva';

import { useEffect, useContext, useRef } from 'react';
import { Image } from 'react-konva';
import { Transformer } from './Transformer';
import useImage from 'use-image';

interface ImageTransformerProps
  extends Omit<Konva.ImageConfig, 'isSelected' | 'onSelect'> {
  isSelected: boolean;
  onSelect: () => void;
}

export function ImageTransformer({
  isSelected,
  onSelect,
  ...imageProps
}: ImageTransformerProps) {
  const [image] = useImage('https://konvajs.org/assets/lion.png');
  // const { setCursorStyle } = useContext(AppContext);
  const imageRef = useRef<Konva.Image>(null);

  // useEffect(() => {
  //   if (imageRef.current) {
  //     imageRef.current.on("mouseenter", function () {
  //       setCursorStyle("pointer");
  //     });
  //   }
  // }, []);

  return (
    <Transformer
      // ref={imageRef}
      isSelected={isSelected}
      enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
    >
      <Image draggable image={image} onClick={onSelect} {...imageProps} />
    </Transformer>
  );
}
