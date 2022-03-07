import { Tree, Empty } from 'antd';
import { FolderOpenOutlined, FolderOutlined } from '@ant-design/icons';

import { useMemo, useState, useRef } from 'react';
import _ from 'lodash';

import { DataNode, EventDataNode } from 'antd/lib/tree';
import data from '../assets/classList.json';
import leafs from '../assets/object.json';

function fetchData(parentsAddress: string) {
  return new Promise<DataNode[]>((resolve) => {
    setTimeout(() => {
      resolve(
        _.map(leafs, ({ class_name, address, size }) => ({
          title: `${class_name} (${size}Byte)`,
          key: `${parentsAddress}.${address}`,
          isLeaf: true,
        }))
      );
    }, 500);
  });
}

interface IOriginDataNode {
  className: string;
  count: number;
  size: number;
}

export function useTreeData(
  originTreeData?: IOriginDataNode[]
): [DataNode[], (treeNode: EventDataNode) => Promise<void>] {
  const [nextChildren, setNextChildren] =
    useState<Record<string, DataNode[]>>();

  const treeData = useMemo<DataNode[]>(() => {
    return _.map(originTreeData ?? data, ({ className, count, size }) => ({
      title: `${className} (${count} ${size}Byte)`,
      key: className,
      selectable: false,
      isLeaf: false,

      icon: ({ expanded }) =>
        expanded ? <FolderOpenOutlined /> : <FolderOutlined />,

      ...(_.has(nextChildren, className)
        ? {
            children: nextChildren?.[className],
          }
        : null),
    }));
  }, [nextChildren, originTreeData]);

  const onLoadData = ({ key, children }: EventDataNode) =>
    new Promise<void>(async (resolve) => {
      if (children) {
        resolve();
        return;
      }

      const leafs = await fetchData(key as string);

      setNextChildren(_.assign({}, nextChildren, { [key]: leafs }));

      resolve();
    });

  return [treeData, onLoadData];
}

export default function AsyncTree() {
  const [treeData, onLoadData] = useTreeData();
  const nodeRef = useRef<HTMLDivElement>(null);

  const onSelect = (selectedKeys: DataNode['key'][]) => {
    console.log(selectedKeys);
  };

  return (
    <div ref={nodeRef}>
      {_.isEmpty(treeData) ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Tree
          height={896}
          loadData={onLoadData}
          treeData={treeData}
          showLine
          showIcon
          onSelect={onSelect}
        />
      )}
    </div>
  );
}
