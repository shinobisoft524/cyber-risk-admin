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

  const isAddStage = !id;
  const isReady = useIsReady();

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);

  const [data, setData] = useState<string[][]>([]);
  const [keyData, setKeyData] = useState<string[][]>([]);

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
    if (isAddStage) {
      setIsLoading(false);
      return;
    }
    if (!templateId) return;
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

  const handleSave = (values: any) => {
    setIsUpdated(false);
    createTemplatDataAction(
      {
        // type: 'new', // type: id ? 'update' : 'new',
        user: null as any,
        info: {
          templateId: Number(templateId),
          value: values,
        },
      },
      dispatch
    ).then((res: any) => {
      window.location.href = '/templates/list';
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

      {templateId && !id && rows.length === 0 ? (
        <Uploader
          stageId={Number(id) || 1}
          templateId={Number(templateId)}
          handleSave={(values) => {
            handleSave(values);
          }}
        />
      ) : (
        <></>
      )}
    </PageContainer>
  );
}
