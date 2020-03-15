import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import 'antd/dist/antd/index.css';
import axios from 'axios';
import React from 'react';

const { confirm } = Modal;

interface ModalxProps {
  title: string;
  content: string;
}
const showConfirm = (content: string, title: string) => {
  confirm({
    title: title,
    icon: <ExclamationCircleOutlined />,
    content: content,
    async onOk() {
      const res = await axios.post('/api/question', 'blah');
      return res;
    },
    onCancel() {},
  });
};

const Modalx: React.FC<ModalxProps> = ({ content, title }) => {
  return <Button onClick={() => showConfirm(content, title)}>Confirm</Button>;
};

export default Modalx;
