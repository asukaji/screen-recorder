import { Button } from 'antd';
import { AimOutlined } from '@ant-design/icons';

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

export function mouseEventListener(e: Event) {}

export interface IRecordBtnRef {
  stop(): void;
  animations: Node[];
}

export default forwardRef<IRecordBtnRef>(function RecordBtn(props, ref) {
  const root = document.querySelector('#root') ?? document.documentElement;
  const observer = useRef<any>(null);
  const regAnimation = useRef<any>(null);
  const animations: Node[] = [];

  function step() {
    console.log(1);
    regAnimation.current = window.requestAnimationFrame(step);
  }

  function onRecord() {
    observer.current = new MutationObserver((mutationList) =>
      console.log(mutationList)
    );

    observer.current.observe(root, {
      childList: true,
      attributes: true,
      subtree: true,
    });

    regAnimation.current = window.requestAnimationFrame(step);

    window.cancelAnimationFrame(regAnimation.current);
    // root.addEventListener('mousemove', mouseEventListener, false);
  }

  function stopRecord() {
    // root.removeEventListener('mousemove', mouseEventListener, false);
    observer.current.disconnect();
    observer.current = null;
  }

  useEffect(() => {}, []);

  useImperativeHandle(ref, () => ({
    stop: stopRecord,
    animations,
  }));

  return <Button type='primary' icon={<AimOutlined />} onClick={onRecord} />;
});
