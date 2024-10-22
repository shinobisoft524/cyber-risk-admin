'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import readXlsxFile from 'read-excel-file';

export interface IQuestion {
  cyberId: string;
  templateInfo: {
    templateId: number;
    stageId: string; // stage1
  };

  nId: number;
  question: string;
  answers: {
    id: number;
    value: string;
  }[];
  date1: string;
  date2: string;
}

const Uploader = (props: {
  stageId: number;
  templateId: number;
  handleUpdate: (values: IQuestion[]) => void;
}) => {
  const { templateId, stageId, handleUpdate } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    console.log('acceptedFiles', acceptedFiles);
    const file = acceptedFiles[0];
    if (file) {
      readXlsxFile(file).then((rows) => {
        console.log(rows);
        const temp: IQuestion[] = [];
        const keys: string[] = rows[0] as string[];

        rows.forEach((row, index) => {
          if (index !== 0) {
            const length = row.length;
            const question = row[0].toString();
            const answers = [];
            for (let i = 1; i < length - 1; i++) {
              if (!!row[i]) answers.push({ id: answers.length, value: row[i].toString() });
            }

            temp.push({
              cyberId: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1`,
              templateInfo: {
                stageId: `stage${stageId}`,
                templateId: templateId,
              },
              nId: index - 1,
              question,
              answers,
              date1: new Date().toString(),
              date2: new Date().toString(),
            });
          }
        });
        handleUpdate(temp);
        console.log('-------------', temp);
      });
    }
  }, [acceptedFiles]);

  return (
    <Box p={3}>
      <Typography variant="h5">Xlsx Upload</Typography>

      <Box
        mt={3}
        fontSize="12px"
        sx={{
          backgroundColor: 'primary.light',
          color: 'primary.main',
          padding: '40px 30px',
          textAlign: 'center',
          border: `1px dashed`,
          borderColor: 'primary.main',
        }}
        {...getRootProps({ className: 'dropzone' })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Box>
    </Box>
  );
};

export default Uploader;
