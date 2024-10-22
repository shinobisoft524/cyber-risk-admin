'use client';

import PageContainer from '@/app/components/container/PageContainer';
import BlankCard from '@/app/components/shared/BlankCard';
import StageList from './StageList';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { useSearchParams } from 'next/navigation';
import Uploader from './Uploader';
import { useState } from 'react';

// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// import { PutItemCommand } from '@aws-sdk/lib-dynamodb';

// const dynamoDBClient = new DynamoDBClient({
//   region: 'eu-west-1', // e.g., 'us-west-2'
//   credentials: {
//     accessKeyId: 'YOUR_ACCESS_KEY_ID',
//     secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
//   },
// });

export default function Page() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId');
  const id = searchParams.get('id');

  const [rows, setRows] = useState([]);
  const handleUpdate = (values: any) => {
    setRows(values);
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
    </PageContainer>
  );
}
