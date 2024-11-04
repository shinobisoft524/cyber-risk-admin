'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import './Quill.css';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill: any = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
);

const QuillEdit = (props: { value: string; handleUpdate?: (value: string) => void }) => {
  const [text, setText] = useState(props.value || '');

  const { handleUpdate } = props;
  const theme = useTheme();

  useEffect(() => {
    if (handleUpdate) {
      handleUpdate(text);
    }
  }, [text]);

  return (
    <ReactQuill
      value={text}
      onChange={(value: any) => {
        console.log('--------------value', value);
        setText(value);
      }}
      placeholder="Type here..."
    />
  );
};

export default QuillEdit;
