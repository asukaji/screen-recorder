import { Button, Input } from 'antd';
import {
  CameraOutlined,
  PictureOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import { useState, useRef } from 'react';
// @ts-ignore
// import { toJSON, toDom } from 'dom-to-json';

import RecordBtn from './RecordBtn';
import SandBox, { ISandboxRef } from './Sandbox';
import styles from './index.module.less';

const root = document.querySelector('#root') ?? document.documentElement;

function onPlay() {

}

export default function Recorder() {
  const [node, setNode] = useState<Node>();
  const sandboxRef = useRef<ISandboxRef>(null);

  function onCamera() {
    // const domJson = toJSON(root.cloneNode(true));
    
    setNode(root.cloneNode(true));
  }

  function onPicture() {
    node && sandboxRef.current?.open(node);
  }

  return (
    <>
      <div className={styles.container}>
        <RecordBtn />
        <Button type="primary" icon={<CameraOutlined />} onClick={onCamera} />
        <Button type="primary" icon={<PlayCircleOutlined />} onClick={onPlay} />
        <Button type="primary" icon={<PictureOutlined />} onClick={onPicture} />
        
        <Input.TextArea placeholder="请输入项目描述" />
      </div>


      <SandBox ref={sandboxRef} />
    </>
  );
}
