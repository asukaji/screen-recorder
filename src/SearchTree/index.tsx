import { Spin } from 'antd';
import AsyncTree from './AsyncTree';
import SearchInput from './SearchInput';
import HighLightTree, { useSearchTree } from './HighLightTree';
import styles from './index.module.less';

import { useState } from 'react';

export default function SearchTree() {
  const [keywords, setKeywords] = useState<string>();
  const [fetching, setFetching] = useState(false);
  const { loading, treeData, onSearch } = useSearchTree();

  return (
    <div className={styles.container}>
      <SearchInput
        loading={loading}
        disabled={loading}
        onSearch={(value: string) => {
          setKeywords(value);
          onSearch(value);
        }}
      />
      <Spin spinning={fetching}>
        {keywords ? (
          <HighLightTree loading={loading} treeData={treeData} />
        ) : (
          <AsyncTree />
        )}
      </Spin>
    </div>
  );
}
