'use client';

import PageContainer from '@/app/components/container/PageContainer';
import BlankCard from '@/app/components/shared/BlankCard';
import StageList from './StageList';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { useSearchParams } from 'next/navigation';
import Uploader from './Uploader';
import { useEffect, useState } from 'react';

import {
  BatchGetItemCommand,
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { createTemplatDataAction, getTemplatDataAction } from '@/actions/template.action';
import { useDispatch } from '@/store/hooks';
import { Button, Grid, Stack } from '@mui/material';
import useIsReady from '@/app/components/Ready';
import { SortableTree } from './tree/tree';

const dynamoDBClient = new DynamoDBClient({
  region: 'eu-west-1', // e.g., 'us-west-2'
  credentials: {
    accessKeyId: 'AKIAQB5R2HOQCBXBE7KC',
    secretAccessKey: '2myzQM37J9HDDYGAhD9OtCDQcsptfDV8EX8dz/29',
  },
});

export default function Page() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId');
  const id = searchParams.get('id');
  const dispatch = useDispatch();

  const isReady = useIsReady();

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdate = (values: any) => {
    setRows(values);
    setIsUpdated(true);
  };

  useEffect(() => {
    if (isReady) {
      setTimeout(() => {
        getTemplateData();
      }, 2000);
    }
  }, [isReady]);

  const getTemplateData = async () => {
    if (!templateId || !id) return;
    setIsLoading(true);
    setIsUpdated(false);
    getTemplatDataAction(
      {
        // type: 'new', // type: id ? 'update' : 'new',
        user: null as any,
        info: {
          value: {
            cyberkey: `cyber-template-id-${templateId}-stage-id-${id}-version-id-1`,
          },
        },
      },
      dispatch
    ).then((res: any[]) => {
      if (!id) {
        // router.push(`/templates/detail?id=${res.id}`);
      } else {
        const data = res.map((d: any) => {
          return d.data;
        });
        setRows(data as any);
        // getTemplate();
      }
      setIsLoading(false);
    });
  };

  // const getTemplateData = async () => {
  //   // const params = {
  //   //   TableName: 'cyber-templates',
  //   //   Key: {
  //   //     cyberId: { S: `cyber-template-id-${templateId}-stage-id-${id}-version-id-1` },
  //   //   },
  //   // };

  //   // const input = {
  //   //   RequestItems: {
  //   //     'cyber-templates2': {
  //   //       Keys: [
  //   //         {
  //   //           "cyberkey": {
  //   //             S: `cyber-template-id-${templateId}-stage-id-${id}-version-id-1`,
  //   //           },
  //   //         },
  //   //       ],
  //   //       ProjectionExpression: 'cyberkey',
  //   //     },
  //   //   },
  //   // };

  //   try {
  //     const command = new ScanCommand({
  //       TableName: 'cyber-templates',
  //       ReturnConsumedCapacity: 'TOTAL',
  //     });
  //     const response = await dynamoDBClient.send(command);
  //     console.log('Item fetched successfully:', response);
  //   } catch (error) {
  //     console.error('Error fetching item:', error);
  //   }
  // };

  // const addDataToDynamoDB = async () => {
  //   rows.forEach(async (item: any) => {
  //     // const value = {
  //     //   cyberId: { S: item.cyberId },
  //     //   templateInfo: {
  //     //     M: {
  //     //       templateId: { N: item.templateInfo.templateId.toString() },
  //     //       stageId: { S: item.templateInfo.stageId },
  //     //     },
  //     //   },
  //     //   nId: { N: item.nId.toString() },
  //     //   question: { S: item.question },
  //     //   answers: {
  //     //     L: item.answers.map((answer: any) => ({
  //     //       M: {
  //     //         id: { N: answer.id.toString() },
  //     //         value: { S: answer.value },
  //     //       },
  //     //     })),
  //     //   },
  //     //   date1: { S: item.date1 },
  //     //   date2: { S: item.date2 },
  //     // };

  //     const params = {
  //       TableName: 'cyber-templates2',
  //       Item: item,
  //     };

  //     try {
  //       const command = new PutCommand(params);
  //       await dynamoDBClient.send(command);
  //       console.log('Data added successfully');
  //     } catch (error) {
  //       console.error('Error adding data: ', error);
  //     }
  //   });
  // };

  const handleSave = () => {
    setIsUpdated(false);
    createTemplatDataAction(
      {
        // type: 'new', // type: id ? 'update' : 'new',
        user: null as any,
        info: {
          value: rows,
        },
      },
      dispatch
    ).then((res: any) => {
      getTemplateData();
    });
  };

  if (isLoading) return <></>;
  return (
    <PageContainer title="Template Stage Page" description="This is a template stage page">
      <Breadcrumb
        title={`Template ${templateId}`}
        items={[
          {
            to: '/',
            title: 'Template',
          },
          {
            title: `Stage - ${id}`,
          },
        ]}
      />
      {templateId && id && rows.length > 0 ? (
        <>
          <BlankCard>
            <StageList list={rows} />
          </BlankCard>
        </>
      ) : (
        <></>
      )}

      {templateId && id && rows.length === 0 ? (
        <>
          <Stack mt={3} spacing={3}>
            <BlankCard>
              <Uploader
                stageId={Number(id) || 1}
                templateId={Number(templateId)}
                handleUpdate={(values) => {
                  handleUpdate(values);
                }}
              />
            </BlankCard>
          </Stack>
        </>
      ) : (
        <></>
      )}
      {templateId && id && rows.length !== 0 && isUpdated ? (
        <>
          <Stack direction="row" spacing={2} mt={3}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Changes
            </Button>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </Stack>
        </>
      ) : (
        <></>
      )}
      <SortableTree />
    </PageContainer>
  );
}
