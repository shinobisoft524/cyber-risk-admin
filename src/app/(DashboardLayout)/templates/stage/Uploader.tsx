'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import readXlsxFile from 'read-excel-file';

export interface IQuestion {
  cyberkey: string;
  cyberId: string;
  templateInfo: {
    templateId: number;
    stageId: string; // stage1
  };

  nId: number;
  question: string;
  answers: {
    id: number;
    label: string;
    value?: string;
  }[];
  date1: string;
  date2: string;
  _ref?: {
    [key: string]: any;
  };
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
          const ref: any = {};
          keys.forEach((key: string, index: number) => {
            ref[key] = row[index];
          });
          if (index !== 0) {
            if (stageId.toString() === '1') {
              const length = row.length;
              const question = row[0].toString();
              const answers = [];
              for (let i = 1; i < length - 1; i++) {
                if (!!row[i]) answers.push({ id: answers.length, label: row[i].toString() });
              }

              temp.push({
                cyberkey: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1`,
                cyberId: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1-n-id-${(
                  index - 1
                ).toString()}`,
                templateInfo: {
                  stageId: `stage${stageId}`,
                  templateId: templateId,
                },
                nId: index - 1,
                question,
                answers,
                date1: new Date().toString(),
                date2: new Date().toString(),
                _ref: ref,
              });
            } else if (stageId.toString() === '2') {
              const question = row[4].toString();
              const answers = [
                {
                  id: 0,
                  value: 'true',
                  label: 'True',
                },
                {
                  id: 1,
                  value: 'false',
                  label: 'False',
                },
                {
                  id: 2,
                  value: 'partial',
                  label: 'Partial',
                },
                {
                  id: 3,
                  value: 'notApplicable',
                  label: 'Not Applicable',
                },
                {
                  id: 4,
                  value: 'toBeConfirmed',
                  label: 'To Be Confirmed',
                },
              ];

              temp.push({
                cyberkey: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1`,
                cyberId: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1-n-id-${(
                  index - 1
                ).toString()}`,
                templateInfo: {
                  stageId: `stage${stageId}`,
                  templateId: templateId,
                },
                nId: index - 1,
                question,
                answers,
                date1: new Date().toString(),
                date2: new Date().toString(),
                _ref: ref,
              });
            }
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
