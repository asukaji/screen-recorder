import { Button, Tooltip } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import styles from './index.module.less';

import { ReactNode, forwardRef, useImperativeHandle, useState } from 'react';

export interface IFullScreenRef {
  open: () => void;
}

interface IFullScreenProps {
  children: ReactNode;
  trigger?: ReactNode;
}

export default forwardRef<IFullScreenRef, IFullScreenProps>(function FullScreen(
  props,
  ref
) {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: setVisible.bind(null, true),
  }));

  return (
    <>
      {props.trigger ?? (
        <Tooltip title='大屏查看'>
          <Button
            icon={<FullscreenOutlined />}
            type='text'
            onClick={setVisible.bind(null, true)}
          />
        </Tooltip>
      )}
      {visible && (
        <div className={styles.container}>
          <Tooltip title='退出'>
            <Button
              icon={<FullscreenExitOutlined />}
              type='text'
              className={styles.exit}
              onClick={setVisible.bind(null, false)}
            />
          </Tooltip>
          {props.children}
        </div>
      )}
    </>
  );
});
