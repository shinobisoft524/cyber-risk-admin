'use client';

import PageContainer from '@/components/container/PageContainer';
import BlankCard from '@/components/shared/BlankCard';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { Button, Grid, Stack } from '@mui/material';
import AdminAction from '@/app/components/organisation/AdminAction';
import { useEffect, useState } from 'react';
import { useDispatch } from '@/store/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import TemplateDetail from './templateDetail';
import { createTemplatAction, getTemplateDetailAction } from '@/actions/template.action';
import Link from 'next/link';

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

  const [name, setName] = useState<string>('');

  const [stages, setStages] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      getTemplate();
    } else {
    }
  }, [id]);

  const getTemplate = () => {
    getTemplateDetailAction(
      {
        user: null as any,
        info: {
          organisationId: null,
          value: { id: id },
        } as any,
      },
      dispatch
    ).then((res: any) => {
      // setRows(res);
      setName(res.name);
      if (res.TemplateStage && res.TemplateStage.length) {
        setStages(res.TemplateStage.length);
      }
    });
  };

  const handleUpdate = (value: string) => {
    setName(value);
  };

  const handleSave = () => {
    if (name) {
      createTemplatAction(
        {
          type: id ? 'update' : 'new',
          user: null as any,
          info: {
            value: {
              id: id as any,
              name: name,
            },
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
      <Breadcrumb title="Create Template" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item lg={6}>
          <Stack spacing={3}>
            <BlankCard>
              <TemplateDetail template={{ name: name }} handleUpdate={handleUpdate} />
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

      {stages && (
        <Grid container mt={6} spacing={3}>
          <Grid item lg={6}>
            <Stack spacing={3}>
              <BlankCard>
                <Link href={`/templates/stage?id=1&templateId=${id}`}>Stage 1</Link>
              </BlankCard>
              <BlankCard>
                <Link href={`/templates/stage?id=1&templateId=${id}`}>Stage 2</Link>
              </BlankCard>
            </Stack>
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
}
