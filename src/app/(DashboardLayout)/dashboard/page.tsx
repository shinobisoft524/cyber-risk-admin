'use client';

import { GoogleMapsEmbed } from '@next/third-parties/google';

import Typography from '@mui/material/Typography';
import PageContainer from '@/app/components/container/PageContainer';
import DashboardCard from '@/app/components/shared/DashboardCard';

export default function Page() {
  return (
    <PageContainer title="Cyberprism Dashboard" description="this is cyberprism admin page">
      <DashboardCard title="Admin Page">
        <Typography>this is cyberprism admin page</Typography>
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
