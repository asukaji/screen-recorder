import { Spin } from 'antd';
import AsyncTree from './AsyncTree';
import SearchInput from './SearchInput';
import HighLightTree, { useSearchTree } from './HighLightTree';
import styles from './index.module.less';

import { useState, useRef, useLayoutEffect } from 'react';

export default function SearchTree() {
  const [keywords, setKeywords] = useState<string>();
  const [fetching, setFetching] = useState(false);
  const { loading, treeData, onSearch } = useSearchTree();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(
    () => {
      setTimeout(() => {
        if (!ref.current) {
          return;
        }

        const containerHeight = ref.current.clientHeight;

        setHeight(containerHeight - 96);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div ref={ref} className={styles.container}>
      <SearchInput
        loading={loading}
        disabled={loading}
        onSearch={(value: string) => {
          setKeywords(value);
          onSearch(value);
        }}
      />
      {/* @ts-ignore */}
      <Spin spinning={fetching}>
        {keywords ? (
          <HighLightTree
            height={height}
            loading={loading}
            treeData={treeData}
            onSelect={setFetching.bind(null, true)}
          />
        ) : (
          <AsyncTree height={height} onSelect={setFetching.bind(null, true)} />
        )}
      </Spin>
    </div>
  );
}
