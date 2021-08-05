import { Modal } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

function getNodeString(node: Node) {
  if (typeof(XMLSerializer) !== 'undefined') {
    var serializer = new XMLSerializer();
    return serializer.serializeToString(node);
 }
}

export interface ISandboxRef {
  open(node: Node): void;
};

export default forwardRef<ISandboxRef>(
  function SandBox(props, ref) {
    const [visible, setVisible] = useState<boolean>(false);
    const [content, setContent] = useState<string>();

    useImperativeHandle(
      ref, 
      () => ({
        open(node: Node) {
          setContent(`
            <script type="text/javascript">
            const oHead = document.getElementsByTagName("head")[0];
            const arrStyleSheets = parent.document.getElementsByTagName("style");
            for (let i = 0; i < arrStyleSheets.length; i++) {
              oHead.appendChild(arrStyleSheets[i].cloneNode(true));
            }
            </script>
            ${getNodeString(node)}
          `);
          setVisible(true);
        }
      })
    );

    return (
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <iframe
          title="sandbox"
          sandbox="
            allow-same-origin
            allow-scripts
          "
          srcDoc={content} 
        />
      </Modal>
    );
  }
)
