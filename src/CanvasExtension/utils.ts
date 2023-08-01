import type Konva from 'konva';

export function transform(event: Konva.KonvaEventObject<Event>) {
  const node = event.target;

  // transformer is changing scale of the node
  // and NOT its width or height
  // but in the store we have only width and height
  // to match the data better we will reset scale on transform end
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  // we will reset it back
  node.scaleX(1);
  node.scaleY(1);

  return {
    x: node.x(),
    y: node.y(),
    width: node.width() * scaleX,
    height: node.height() * scaleY,
  };
}

interface Vector2d {
  x: number;
  y: number;
}

export function dragBound(position: Vector2d) {}
