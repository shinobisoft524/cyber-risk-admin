'use client';

import PageContainer from '@/components/container/PageContainer';
import BlankCard from '@/components/shared/BlankCard';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { Button, Grid, Stack } from '@mui/material';
import OrganisationDetail from '@/app/components/organisation/OrganisationDetail';
import OwnerDetail from '@/app/components/organisation/OwnerDetail';
import AdminAction from '@/app/components/organisation/AdminAction';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch } from '@/store/hooks';
import { initOrganisation } from '@/store/organisation/OrganisationSlice';
import {
  createOrganisationAction,
  getOrganisationDetailAction,
} from '@/actions/orgnisation.action';
import { useRouter, useSearchParams } from 'next/navigation';

const BCrumb = [
  {
    to: '/list',
    title: 'Organisation',
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
  const currentOrganisation = useSelector(
    (state: AppState) => state.organisation.currentOrganisation
  );

  useEffect(() => {
    !id && dispatch(initOrganisation());
    id && getOrganisation(Number(id));
    return () => {
      !id && dispatch(initOrganisation());
    };
  }, [id]);

  const getOrganisation = (id: number) => {
    getOrganisationDetailAction({ id }, dispatch);
  };

  const handleSave = () => {
    if (currentOrganisation) {
      createOrganisationAction(
        {
          reqType: id ? 'update' : 'create',
          info: currentOrganisation,
        },
        dispatch
      ).then((res: { id: string }) => {
        if (!!res) {
          if (id) {
            router.refresh();
          } else {
            router.push(`/organisations/detail?id=${res.id}`);
          }
        }
      });
    }
  };

  return (
    <PageContainer
      title="Organisation Detail Page"
      description="This is an organisation detail page"
    >
      <Breadcrumb title={`${id ? 'Edit' : 'Create'} Organisation`} items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item lg={6}>
          <Stack spacing={3}>
            <BlankCard>
              <OrganisationDetail />
            </BlankCard>
          </Stack>
        </Grid>
        <Grid item lg={6}>
          <Stack spacing={3}>
            <BlankCard>
              <OwnerDetail />
            </BlankCard>
          </Stack>
          {/* <Stack mt={3} spacing={3}>
            <BlankCard>
              <NoteDetail />
            </BlankCard>
          </Stack> */}
        </Grid>
        <Grid item lg={12}>
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
