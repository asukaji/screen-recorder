import Highlighter from 'react-highlight-words';
import { Empty, Spin } from 'antd';
import { FolderOpenOutlined, FolderOutlined } from '@ant-design/icons';
import AsyncTree from './AsyncTree';

import { useState } from 'react';
import _ from 'lodash';

import { DataNode, EventDataNode } from 'antd/lib/tree';
import result from '../assets/result.json';

function fetchData(keywords: string) {
  return new Promise<DataNode[]>((resolve) => {
    setTimeout(() => {
      resolve(
        _.values(
          _.reduce<any[], Record<string, DataNode>>(
            result,
            (nodes, { address, size, parent }) => {
              const title = (
                <Highlighter
                  searchWords={[keywords]}
                  textToHighlight={`${address}(${size}Byte)`}
                />
              );

              if (_.has(nodes, parent)) {
                nodes[parent].children = _.concat(nodes[parent].children, {
                  title,
                  key: `${parent}.${address}`,
                  isLeaf: true,
                }) as DataNode[];
              } else {
                _.assign(nodes, {
                  [parent]: {
                    title: parent,
                    key: parent,
                    selectable: false,
                    expanded: true,

                    icon: ({ expanded }: EventDataNode) =>
                      expanded ? <FolderOpenOutlined /> : <FolderOutlined />,
                    children: [
                      {
                        title,
                        key: `${parent}.${address}`,
                        isLeaf: true,
                      },
                    ],
                  },
                });
              }

              return nodes;
            },
            {}
          )
        )
      );
    }, 500);
  });
}

export function useSearchTree() {
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState<DataNode[]>([]);

  const onSearch = async (value: string) => {
    if (!value) {
      return;
    }

    setLoading(true);

    const result = await fetchData(value);

    setTreeData(result);
    setLoading(false);
  };

  return { loading, treeData, onSearch };
}

interface IHighLightTreeProps {
  height?: number;
  treeData: DataNode[];
  loading: boolean;
  onSelect?: (key: DataNode['key']) => void;
}

export default function HighLightTree({
  height,
  treeData,
  loading,
  onSelect,
}: IHighLightTreeProps) {
  return (
    <Spin spinning={loading}>
      {_.isEmpty(treeData) ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <AsyncTree
          height={height}
          // treeData={treeData}
          onSelect={onSelect}
        />
      )}
    </Spin>
  );
}
