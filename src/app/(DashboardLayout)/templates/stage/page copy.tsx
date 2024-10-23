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

  const [rows, setRows] = useState([]);
  const handleUpdate = (values: any) => {
    setRows(values);
  };

  useEffect(() => {
    setTimeout(() => {
      getTemplateData();
    }, 2000);
  }, []);

  const getTemplateData = async () => {
    // const params = {
    //   TableName: 'cyber-templates',
    //   Key: {
    //     cyberId: { S: `cyber-template-id-${templateId}-stage-id-${id}-version-id-1` },
    //   },
    // };

    // const input = {
    //   RequestItems: {
    //     'cyber-templates2': {
    //       Keys: [
    //         {
    //           "cyberkey": {
    //             S: `cyber-template-id-${templateId}-stage-id-${id}-version-id-1`,
    //           },
    //         },
    //       ],
    //       ProjectionExpression: 'cyberkey',
    //     },
    //   },
    // };

    try {
      const command = new ScanCommand({
        TableName: 'cyber-templates',
        ReturnConsumedCapacity: 'TOTAL',
      });
      const response = await dynamoDBClient.send(command);
      console.log('Item fetched successfully:', response);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const addDataToDynamoDB = async () => {
    rows.forEach(async (item: any) => {
      // const value = {
      //   cyberId: { S: item.cyberId },
      //   templateInfo: {
      //     M: {
      //       templateId: { N: item.templateInfo.templateId.toString() },
      //       stageId: { S: item.templateInfo.stageId },
      //     },
      //   },
      //   nId: { N: item.nId.toString() },
      //   question: { S: item.question },
      //   answers: {
      //     L: item.answers.map((answer: any) => ({
      //       M: {
      //         id: { N: answer.id.toString() },
      //         value: { S: answer.value },
      //       },
      //     })),
      //   },
      //   date1: { S: item.date1 },
      //   date2: { S: item.date2 },
      // };

      const params = {
        TableName: 'cyber-templates2',
        Item: item,
      };

      try {
        const command = new PutCommand(params);
        await dynamoDBClient.send(command);
        console.log('Data added successfully');
      } catch (error) {
        console.error('Error adding data: ', error);
      }
    });
  };

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
      <BlankCard>
        <StageList list={rows} />
      </BlankCard>
      <BlankCard>
        <Uploader
          stageId={Number(id) || 1}
          templateId={Number(templateId)}
          handleUpdate={handleUpdate}
        />
      </BlankCard>
      <button onClick={addDataToDynamoDB}>save try</button>
    </PageContainer>
  );
}
