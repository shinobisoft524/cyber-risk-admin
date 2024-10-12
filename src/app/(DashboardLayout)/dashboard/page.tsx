'use client';

import { GoogleMapsEmbed } from '@next/third-parties/google';

import Typography from '@mui/material/Typography';
import PageContainer from '@/app/components/container/PageContainer';
import DashboardCard from '@/app/components/shared/DashboardCard';

export default function SamplePage() {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Sample Page">
        <Typography>This is a sample2 page</Typography>
      </DashboardCard>
      <GoogleMapsEmbed
        apiKey="AIzaSyDY5m0u13UJOnla4cjyj084PhaPw5GVpIE"
        height={200}
        width="100%"
        mode="place"
        q="Brooklyn+Bridge,New+York,NY"
      />
    </PageContainer>
  );
}
