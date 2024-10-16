'use client';

import { GoogleMapsEmbed } from '@next/third-parties/google';
import PageContainer from '@/components/container/PageContainer';
import BlankCard from '@/components/shared/BlankCard';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { Button, Grid, Stack } from '@mui/material';
import OrganisationDetail from '@/app/components/organisation/OrganisationDetail';
import NoteDetail from '@/app/components/organisation/NoteDetail';
import OwnerDetail from '@/app/components/organisation/OwnerDetail';
import AdminAction from '@/app/components/organisation/AdminAction';

const BCrumb = [
  {
    to: '/list',
    title: 'Organisation',
  },
  {
    title: 'Detail',
  },
];

export default function AssessmentCreatePage() {
  return (
    <PageContainer title="Organisation List Page" description="This is an organisation list page">
      <Breadcrumb title="Create Organisation" items={BCrumb} />

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
          <Stack mt={3} spacing={3}>
            <BlankCard>
              <NoteDetail />
            </BlankCard>
          </Stack>
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
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
        <Button variant="outlined" color="error">
          Cancel
        </Button>
      </Stack>
    </PageContainer>
  );
}
