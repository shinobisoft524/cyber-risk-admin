'use client';

import PageContainer from '@/components/container/PageContainer';
import BlankCard from '@/components/shared/BlankCard';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { Button, Grid, Stack } from '@mui/material';
import AdminAction from '@/app/components/organisation/AdminAction';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from '@/store/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import TemplateDetail from './templateDetail';
import { createTemplatAction, getTemplateDetailAction } from '@/actions/template.action';
import Link from 'next/link';
import useIsReady from '@/app/components/Ready';

const BCrumb = [
  {
    to: '/list',
    title: 'Template',
  },
  {
    title: 'Detail',
  },
];

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const dispatch = useDispatch();
  const router = useRouter();

  const isReady = useIsReady();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [stages, setStages] = useState<string[]>([]);

  useEffect(() => {
    if (isReady) {
      if (id) {
        getTemplate();
      } else {
        setIsLoading(false);
      }
    }
  }, [isReady, id]);

  const getTemplate = () => {
    setIsLoading(true);
    getTemplateDetailAction(
      {
        info: {
          id: Number(id),
        },
      },
      dispatch
    ).then((res: any) => {
      // setRows(res);
      setName(res.name);
      setDescription(res.description);
      if (res.TemplateStage && res.TemplateStage.length) {
        setStages(res.TemplateStage);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 50);
    });
  };

  const hasStage = useMemo(() => {
    return stages.length > 0;
  }, [stages]);

  const handleUpdate = (key: 'name' | 'description', value: string) => {
    if (key === 'name') {
      setName(value);
    } else if (key === 'description') {
      setDescription(value);
    }
  };

  const handleSave = () => {
    if (name) {
      createTemplatAction(
        {
          reqType: id ? 'update' : 'create',
          info: {
            id: id as any,
            name: name,
            description: description,
          },
        },
        dispatch
      ).then((res: any) => {
        if (!id) {
          router.push(`/templates/detail?id=${res.id}`);
        } else {
          getTemplate();
        }
      });
    }
  };

  return (
    <PageContainer title="Template Detail Page" description="This is an organisation detail page">
      <Breadcrumb title={`${id ? 'Update' : 'Create'} Template`} items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item lg={6}>
          <Stack spacing={3}>
            <BlankCard>
              {!isLoading ? (
                <TemplateDetail
                  template={{ name: name, description: description }}
                  handleUpdate={handleUpdate}
                />
              ) : (
                <></>
              )}
            </BlankCard>
          </Stack>
        </Grid>
        <Grid item lg={6}>
          <Stack mt={3} spacing={3}>
            <BlankCard>
              <AdminAction />
            </BlankCard>
          </Stack>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} mt={3}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="outlined" color="error">
          Cancel
        </Button>
      </Stack>

      {hasStage ? (
        <Grid container mt={6} spacing={3}>
          <Grid item lg={6}>
            <Stack spacing={3}>
              <BlankCard>
                <Link href={`/templates/stage?id=1&templateId=${id}`}>Stage 1</Link>
              </BlankCard>
              <BlankCard>
                <Link href={`/templates/stage?id=2&templateId=${id}`}>Stage 2</Link>
              </BlankCard>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </PageContainer>
  );
}
