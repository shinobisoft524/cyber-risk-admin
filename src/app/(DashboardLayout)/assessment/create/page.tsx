'use client';

import { GoogleMapsEmbed } from '@next/third-parties/google';
import PageContainer from '@/components/container/PageContainer';
import BlankCard from '@/components/shared/BlankCard';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { Button, Grid, Stack } from '@mui/material';
import OrganisationDetail from '@/components/assessment/OrganisationDetail';
import ScopeDetail from '@/app/components/assessment/ScopeDetail';
import TeamDetail from '@/app/components/assessment/TeamDetail';

const BCrumb = [
  {
    to: '/list',
    title: 'Assessment',
  },
  {
    title: 'Create',
  },
];

export default function AssessmentCreatePage() {
  return (
    <PageContainer title="Assessment List Page" description="This is an assessment list page">
      <Breadcrumb title="Create Assessment" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item lg={6}>
          <Stack spacing={3}>
            <BlankCard>
              <OrganisationDetail />
            </BlankCard>
          </Stack>
          <Stack mt={3} spacing={3}>
            <BlankCard>
              <ScopeDetail />
            </BlankCard>
          </Stack>
        </Grid>

        <Grid item lg={6}>
          <Stack spacing={3}>
            <BlankCard>
              <TeamDetail />
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
