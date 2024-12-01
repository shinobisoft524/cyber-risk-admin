'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import readXlsxFile, { readSheetNames } from 'read-excel-file';
import { setNotificationList } from '@/store/notification';
import { useDispatch } from '@/store/hooks';
import MultipleContainers from './container/MultipleContainers';
import BlankCard from '@/app/components/shared/BlankCard';
import { SortableTree } from './tree/tree';
import { SortableTree2 } from './tree/tree2';
import MultipleContainers2 from './container/MultipleContainers2';

export interface IQuestion {
  cyberkey: string;
  cyberId: string;
  templateInfo: {
    templateId: number;
    stageId: string; // stage1
  };
  stageId: string;
  nId: number;
  question: string;
  answers: {
    id: number;
    label: string | null;
    value?: string;
    keyId: number;
    answerType: 'Confirmed' | 'Delayed';
  }[];
  date1: string;
  date2: string;
  _ref?: {
    [key: string]: any;
  };
  _info?: any;
}

const Uploader = (props: {
  stageId: number;
  templateId: number;
  handleSave: (values: IQuestion[]) => void;
}) => {
  const dispatch = useDispatch();

  const { templateId, stageId, handleSave: handleSaveData } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [data, setData] = useState<string[][][]>([]);
  const [keyData, setKeyData] = useState<string[][]>([]);

  const [stage0Data, setStage0Data] = useState<{ [key: string]: string[] }>({});
  const [stage1Data, setStage1Data] = useState<{ [key: string]: string[] }>({});

  const [category0, setCategory0] = useState<any>(null);
  const [category1, setCategory1] = useState<any>(null);

  console.log(data);
  console.log(keyData);

  useEffect(() => {
    console.log('acceptedFiles', acceptedFiles);
    const file = acceptedFiles[0];
    // if (file) {
    //   readXlsxFile(file).then((rows) => {
    //     console.log(rows);
    //     const temp: IQuestion[] = [];
    //     const keys: string[] = rows[0] as string[];

    //     rows.forEach((row, index) => {
    //       const ref: any = {};
    //       keys.forEach((key: string, index: number) => {
    //         ref[key] = row[index];
    //       });
    //       if (index !== 0) {
    //         if (stageId.toString() === '1') {
    //           const length = row.length;
    //           const question = row[0].toString();
    //           const answers = [];
    //           for (let i = 1; i < length - 1; i++) {
    //             if (!!row[i]) answers.push({ id: answers.length, label: row[i].toString() });
    //           }

    //           temp.push({
    //             cyberkey: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1`,
    //             cyberId: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1-n-id-${(
    //               index - 1
    //             ).toString()}`,
    //             templateInfo: {
    //               stageId: `stage${stageId}`,
    //               templateId: templateId,
    //             },
    //             nId: index - 1,
    //             question,
    //             answers,
    //             date1: new Date().toString(),
    //             date2: new Date().toString(),
    //             _ref: ref,
    //           });
    //         } else if (stageId.toString() === '2') {
    //           const question = row[4].toString();
    //           const answers = [
    //             {
    //               id: 0,
    //               value: 'true',
    //               label: 'True',
    //             },
    //             {
    //               id: 1,
    //               value: 'false',
    //               label: 'False',
    //             },
    //             {
    //               id: 2,
    //               value: 'partial',
    //               label: 'Partial',
    //             },
    //             {
    //               id: 3,
    //               value: 'notApplicable',
    //               label: 'Not Applicable',
    //             },
    //             {
    //               id: 4,
    //               value: 'toBeConfirmed',
    //               label: 'To Be Confirmed',
    //             },
    //           ];

    //           temp.push({
    //             cyberkey: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1`,
    //             cyberId: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1-n-id-${(
    //               index - 1
    //             ).toString()}`,
    //             templateInfo: {
    //               stageId: `stage${stageId}`,
    //               templateId: templateId,
    //             },
    //             nId: index - 1,
    //             question,
    //             answers,
    //             date1: new Date().toString(),
    //             date2: new Date().toString(),
    //             _ref: ref,
    //           });
    //         }
    //       }
    //     });
    //     handleUpdate(temp);

    //     dispatch(
    //       setNotificationList([
    //         {
    //           code: null,
    //           msg: 'Loading was successful!',
    //         },
    //       ])
    //     );

    //     console.log('-------------', temp);
    //   });
    // }

    if (file) {
      let tempData: string[][];
      const tempHeaderData: string[][] = [];

      readSheetNames(file).then((sheetNames) => {
        const promises = sheetNames.map((sn) => readXlsxFile(file, { sheet: sn }));
        Promise.all(promises)
          .then((results) => {
            setData(results as any);
            setKeyData(results.map((row) => row[0]) as any);
          })
          .catch((error) => console.error(error));
      });
    }
  }, [acceptedFiles]);

  const intialItems0 = useMemo(() => {
    return {
      A: keyData[0],
      B: [],
      C: [],
      D: [],
    };
  }, [keyData]);
  const intialItems1 = useMemo(() => {
    return {
      A: keyData[1],
      B: [],
      C: [],
      D: [],
      E: [],
    };
  }, [keyData]);

  const initialTreeItem0 = useMemo(() => {
    return (stage0Data as any).A?.map((v: string) => {
      return {
        id: v,
        children: [],
      };
    });
  }, [stage0Data]);

  const initialTreeItem1 = useMemo(() => {
    return (stage1Data as any).A?.map((v: string) => {
      return {
        id: v,
        children: [],
      };
    });
  }, [stage1Data]);

  const handleSave = () => {
    console.log('---');

    const temp: IQuestion[] = [];

    data.forEach((_data, index1) => {
      const keys: string[] = _data[0];
      const fieldInfo = index1 === 0 ? stage0Data : stage1Data;
      const questionIndex = keys.findIndex((k) => k === fieldInfo['B'][0]);
      let answerIndexs = fieldInfo['C'].map((f, index) => {
        return {
          id: index,
          index: keys.findIndex((k) => k === f),
          answerType: 'Confirmed',
        };
      });
      const delayIndex = keys.findIndex((k) => k === fieldInfo['D'][0]);
      answerIndexs &&
        answerIndexs.length > 0 &&
        answerIndexs.push({
          id: answerIndexs.length,
          index: delayIndex,
          answerType: 'Delayed',
        });

      _data.forEach((row, index: number) => {
        const ref: any = [];
        keys.forEach((key: string, index: number) => {
          ref.push({
            key: key,
            value: row[index],
          });
        });
        if (index !== 0) {
          const question = row[questionIndex].toString();
          let answers = [];

          if (answerIndexs.length > 0) {
            for (const ans of answerIndexs) {
              answers.push({
                id: answers.length,
                keyId: ans.index,
                answerType: ans.answerType,
                label:
                  ans.index > -1
                    ? row[ans.index]
                      ? row[ans.index].toString()
                      : null
                    : 'To be confirmed',
                value: answers.length.toString(),
              });
            }
          } else {
            answers = [
              {
                id: 0,
                keyId: -1,
                value: 'true',
                label: 'True',
                answerType: 'Confirmed',
              },
              {
                id: 1,
                keyId: -1,
                value: 'false',
                label: 'False',
                answerType: 'Confirmed',
              },
              {
                id: 2,
                keyId: -1,
                value: 'partial',
                label: 'Partial',
                answerType: 'Confirmed',
              },
              {
                id: 3,
                keyId: -1,
                value: 'notApplicable',
                label: 'Not Applicable',
                answerType: 'Confirmed',
              },
              {
                id: 4,
                keyId: -1,
                value: 'toBeConfirmed',
                label: 'To Be Confirmed',
                answerType: 'Delayed',
              },
            ];
          }

          temp.push({
            cyberkey: `cyber-template-id-${templateId}-stage-id-${(index1 + 1).toString()}-version-id-1`,
            cyberId: `cyber-template-id-${templateId}-stage-id-${(index1 + 1).toString()}-version-id-1-n-id-${(
              index - 1
            ).toString()}`,
            stageId: `stage${(index1 + 1).toString()}`,
            templateInfo: {
              stageId: `stage${(index1 + 1).toString()}`,
              templateId: templateId,
            },
            nId: index - 1,
            question,
            answers: answers as any,
            date1: new Date().toString(),
            date2: new Date().toString(),
            _ref: ref,
            _info: {
              ...fieldInfo,
              questionIndexs: questionIndex,
              answerIndexs: answerIndexs,
            },
          });
        }
      });
    });
    console.log(temp);
    handleSaveData(temp);
  };

  // useEffect(() => {
  //   console.log('acceptedFiles', acceptedFiles);
  //   const file = acceptedFiles[0];
  //   if (file) {
  //     readXlsxFile(file).then((rows) => {
  //       console.log(rows);
  //       const temp: IQuestion[] = [];
  //       const keys: string[] = rows[0] as string[];

  //       rows.forEach((row, index) => {
  //         const ref: any = {};
  //         keys.forEach((key: string, index: number) => {
  //           ref[key] = row[index];
  //         });
  //         if (index !== 0) {
  //           if (stageId.toString() === '1') {
  //             const length = row.length;
  //             const question = row[0].toString();
  //             const answers = [];
  //             for (let i = 1; i < length - 1; i++) {
  //               if (!!row[i]) answers.push({ id: answers.length, label: row[i].toString() });
  //             }

  //             temp.push({
  //               cyberkey: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1`,
  //               cyberId: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1-n-id-${(
  //                 index - 1
  //               ).toString()}`,
  //               templateInfo: {
  //                 stageId: `stage${stageId}`,
  //                 templateId: templateId,
  //               },
  //               nId: index - 1,
  //               question,
  //               answers,
  //               date1: new Date().toString(),
  //               date2: new Date().toString(),
  //               _ref: ref,
  //             });
  //           } else if (stageId.toString() === '2') {
  //             const question = row[4].toString();
  //             const answers = [
  //               {
  //                 id: 0,
  //                 value: 'true',
  //                 label: 'True',
  //               },
  //               {
  //                 id: 1,
  //                 value: 'false',
  //                 label: 'False',
  //               },
  //               {
  //                 id: 2,
  //                 value: 'partial',
  //                 label: 'Partial',
  //               },
  //               {
  //                 id: 3,
  //                 value: 'notApplicable',
  //                 label: 'Not Applicable',
  //               },
  //               {
  //                 id: 4,
  //                 value: 'toBeConfirmed',
  //                 label: 'To Be Confirmed',
  //               },
  //             ];

  //             temp.push({
  //               cyberkey: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1`,
  //               cyberId: `cyber-template-id-${templateId}-stage-id-${stageId}-version-id-1-n-id-${(
  //                 index - 1
  //               ).toString()}`,
  //               templateInfo: {
  //                 stageId: `stage${stageId}`,
  //                 templateId: templateId,
  //               },
  //               nId: index - 1,
  //               question,
  //               answers,
  //               date1: new Date().toString(),
  //               date2: new Date().toString(),
  //               _ref: ref,
  //             });
  //           }
  //         }
  //       });
  //       handleUpdate(temp);

  //       dispatch(
  //         setNotificationList([
  //           {
  //             code: null,
  //             msg: 'Loading was successful!',
  //           },
  //         ])
  //       );

  //       console.log('-------------', temp);
  //     });
  //   }

  //   if (file) {
  //     readSheetNames(file).then((sheetNames) => {
  //       console.log(sheetNames);
  //       // sheetNames === ['Sheet1', 'Sheet2']
  //     });
  //   }
  // }, [acceptedFiles]);

  return (
    <>
      {data.length === 0 && (
        <Stack mt={3} spacing={3}>
          <BlankCard>
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
          </BlankCard>
        </Stack>
      )}

      {data.length > 0 ? (
        <>
          <MultipleContainers
            items={intialItems0}
            handleUpdateItems={(fields) => {
              setStage0Data(fields);
            }}
          />
          {initialTreeItem0 && initialTreeItem0.length > 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} lg={3} mb={3}>
                <BlankCard>
                  <Stack p={4}>
                    <SortableTree
                      defaultItems={initialTreeItem0}
                      handleUpdate={(v: any) => {
                        setCategory0(v);
                      }}
                    />
                  </Stack>
                </BlankCard>
              </Grid>
            </Grid>
          )}
        </>
      ) : (
        <></>
      )}

      {data.length > 0 ? (
        <>
          <MultipleContainers2
            items={intialItems1}
            handleUpdateItems={(fields) => {
              setStage1Data(fields);
            }}
          />
          {initialTreeItem1 && initialTreeItem1.length > 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} lg={3} mb={3}>
                <BlankCard>
                  <Stack p={4}>
                    <SortableTree2
                      defaultItems={initialTreeItem1}
                      handleUpdate={(v: any) => {
                        setCategory1(v);
                      }}
                    />
                  </Stack>
                </BlankCard>
              </Grid>
            </Grid>
          )}
        </>
      ) : (
        <></>
      )}
      <Stack direction="row" spacing={2} mt={3}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="outlined" color="error">
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default Uploader;
