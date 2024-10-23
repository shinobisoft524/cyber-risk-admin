'use client';

import { GoogleMapsEmbed } from '@next/third-parties/google';
import PageContainer from '@/app/components/container/PageContainer';
import BlankCard from '@/app/components/shared/BlankCard';
import OrganisationList from './OrganisationList';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/dashboard',
    title: 'Organisations',
  },
  {
    title: 'List',
  },
];

export default function Page() {
  return (
    <PageContainer title="Organisations List Page" description="This is an organisations list page">
      <Breadcrumb title="Organisations List" items={BCrumb} />
      <GoogleMapsEmbed
        apiKey="AIzaSyDY5m0u13UJOnla4cjyj084PhaPw5GVpIE"
        height={200}
        width="100%"
        mode="place"
        q="Brooklyn+Bridge,New+York,NY"
      />
      <BlankCard>
        <OrganisationList />
      </BlankCard>
    </PageContainer>
  );
}
