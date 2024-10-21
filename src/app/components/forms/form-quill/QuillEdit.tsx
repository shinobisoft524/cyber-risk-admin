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

import Paper from '@mui/material/Paper';

const QuillEdit = (props: { handleUpdate: (value: string) => void }) => {
  const [text, setText] = useState('');

  const { handleUpdate } = props;
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  useEffect(() => {
    if (handleUpdate) {
      handleUpdate(text);
    }
  }, [text]);

  return (
    <Paper sx={{ border: `1px solid ${borderColor}` }} variant="outlined">
      <ReactQuill
        // value={text}
        onChange={(value: any) => {
          console.log('--------------value', value);
          setText(value);
        }}
        placeholder="Type here..."
      />
    </Paper>
  );
};

export default QuillEdit;
