import {
  Group,
  Text,
  Image,
  Circle,
  Rect,
  createNodeFromReact,
} from '@antv/g6-react-node';

import { FC } from 'react';
import { ModelConfig } from '@antv/g6';
import object from '@/assets/object.svg';
import collapse from '@/assets/collapse.svg';

interface nodeProps {
  cfg: ModelConfig & { id: string; isActive?: boolean };
}

const MAX_LABEL_SIZE = 12;
const ELLIPSIS_SIZE = 20;
const ELLIPSIS_MIN = 8;
const KEY_REG = /[A-Z(_ ]/;

// 切片换行
// eslint-disable-next-line
function formatLabel(label?: string): string {
  const nextLabel = [],
    length = label?.length ?? 0;
  let index = 0;

  for (; index < length / MAX_LABEL_SIZE; index++) {
    nextLabel.push(
      label?.slice(MAX_LABEL_SIZE * index, MAX_LABEL_SIZE * (index + 1))
    );
  }

  return nextLabel.join('\n') ?? '';
}

function reverse(label: string) {
  return label.split('').reverse().join('');
}

function getLastIndexOfKey(label: string): number {
  const size = label.length - 1;
  const last = size - (reverse(label).match(KEY_REG)?.index ?? 0);

  return last === size ? ELLIPSIS_MIN : last;
}

function getIndexOfKey(label: string): number {
  const first = label.match(KEY_REG)?.index ?? 0;

  return first <= 1 ? ELLIPSIS_MIN : first;
}

// 省略填充
function ellipsisLabel(label?: string): string {
  if (!label) {
    return '';
  }

  const size = label.length;

  return size > ELLIPSIS_SIZE
    ? `${label.substring(0, getIndexOfKey(label))}...${label.substring(
        getLastIndexOfKey(label),
        size
      )}`
    : label;
}

function GraphNode({ cfg }: nodeProps) {
  const { collapsed } = cfg;

  return (
    <Group>
      <Rect
        style={{
          width: 80,
          fill: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Rect
          style={{
            fill: cfg.isActive ? '#7955ff' : 'transparent',
            opacity: 0.4,
          }}
        >
          <Image
            style={{
              img: object,
              width: 60,
              height: 50,
              cursor: 'pointer',
            }}
          />
        </Rect>
        <Rect
          style={{
            fill: cfg.isActive ? '#7955ff' : 'transparent',
            padding: [0, 8, 8],
            margin: [4, 0, 0],
            opacity: 0.8,
          }}
        >
          <Text
            style={{
              fill: cfg.isActive ? '#fff' : '#333',
              fontSize: 18,
              textBaseline: 'alphabetic',
              cursor: 'pointer',
              alignContent: 'center',
            }}
          >
            {/* {formatLabel(cfg.label as string)} */}
            {ellipsisLabel(cfg.label as string)}
          </Text>
        </Rect>
      </Rect>
      {collapsed && (
        <Circle
          style={{
            // @ts-ignore
            position: 'absolute',
            x: 10,
            y: 5,
            stroke: '#ccc',
            r: 12,
            fill: '#fff',
            cursor: 'pointer',
            zIndex: 9,
          }}
          name='collapse'
        >
          <Image
            style={{
              // @ts-ignore
              position: 'absolute',
              x: 0,
              y: -4,
              img: collapse,
              width: 20,
              height: 20,
              cursor: 'pointer',
            }}
          />
        </Circle>
      )}
    </Group>
  );
}

export default createNodeFromReact(GraphNode as FC<{ cfg: ModelConfig }>);
