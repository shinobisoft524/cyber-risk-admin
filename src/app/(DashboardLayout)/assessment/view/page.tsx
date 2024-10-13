'use client';

import { GoogleMapsEmbed } from '@next/third-parties/google';
import PageContainer from '@/components/container/PageContainer';
import BlankCard from '@/components/shared/BlankCard';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { Button, Grid, Stack } from '@mui/material';
import OrganisationDetail from '@/components/assessment/OrganisationDetail';
import ScopeDetail from '@/app/components/assessment/ScopeDetail';
import TeamDetail from '@/app/components/assessment/TeamDetail';
import AssessmentView from './main';

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
        <Grid item lg={12}>
          <Stack spacing={3}>
            <AssessmentView />
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
