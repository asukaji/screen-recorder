import { Input, InputProps } from 'antd';
import styles from './index.module.less';

interface ISearchInputProps extends InputProps {
  loading: boolean;
  onSearch: (value: string) => void;
}

export default function SearchInput(props: ISearchInputProps) {
  return (
    <Input.Search
      {...props}
      placeholder='input'
      size='small'
      allowClear
      className={styles.input}
    />
  );
}
