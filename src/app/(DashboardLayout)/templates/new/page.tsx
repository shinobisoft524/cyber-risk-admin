'use client';

import PageContainer from '@/components/container/PageContainer';
import BlankCard from '@/components/shared/BlankCard';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { Button, Grid, Stack } from '@mui/material';
import NoteDetail from '@/app/components/organisation/NoteDetail';
import OwnerDetail from '@/app/components/organisation/OwnerDetail';
import AdminAction from '@/app/components/organisation/AdminAction';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useDispatch } from '@/store/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import TemplateDetail from './templateDetail';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import QuillEdit from '@/app/components/forms/form-quill/QuillEdit';
import { createTemplatAction } from '@/actions/template.action';

const BCrumb = [
  {
    to: '/list',
    title: 'Template',
  },
  {
    title: 'Detail',
  },
];

export default function TemplateDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState<string>('');

  const handleUpdate = (value: string) => {
    setName(value);
  };

  const handleSave = () => {
    if (name) {
      createTemplatAction(
        {
          type: 'new',
          user: null as any,
          info: {
            value: {
              name: name,
            },
          },
        },
        dispatch
      ).then((res: any) => {
        if (res === true) {
          // router.push('/organisation/list');
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
    </PageContainer>
  );
}
