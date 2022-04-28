import { Tree, Empty, TreeProps } from 'antd';
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

export interface IOriginDataNode {
  className: string;
  count?: number;
  size: number;
  children?: Omit<IOriginDataNode, 'children'>[];
}

type useTreeDataProps = {
  originTreeData: IOriginDataNode[];
  children?: Record<string, DataNode[]>;
};

export function useTreeData({
  originTreeData,
  children,
}: useTreeDataProps): [DataNode[], (treeNode: EventDataNode) => Promise<void>] {
  const [nextChildren, setNextChildren] = useState<
    Record<string, DataNode[]> | undefined
  >(children);

  const treeData = useMemo<DataNode[]>(() => {
    return _.map(originTreeData, ({ className, count, size }) => ({
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

interface IAsyncTreeProps extends Omit<TreeProps, 'treeData' | 'onSelect'> {
  treeData?: IOriginDataNode[];
  children?: useTreeDataProps['children'];
  onSelect?: (key: DataNode['key']) => void;
}

export default function AsyncTree(props: IAsyncTreeProps) {
  const [treeData, onLoadData] = useTreeData({
    originTreeData: props.treeData ?? data,
    children: props.children,
  });
  const nodeRef = useRef<HTMLDivElement>(null);

  const onSelect = (selectedKeys: DataNode['key'][]) => {
    const selectedKey = _.first(selectedKeys);

    selectedKey && props.onSelect?.(selectedKey);
  };

  return (
    <div ref={nodeRef}>
      {_.isEmpty(treeData) ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Tree
          height={props.height}
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
