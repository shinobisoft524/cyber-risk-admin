'use client';

import { GoogleMapsEmbed } from '@next/third-parties/google';
import PageContainer from '@/app/components/container/PageContainer';
import BlankCard from '@/app/components/shared/BlankCard';
import AssessmentList from './AssessmentList';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Assessment',
  },
  {
    title: 'List',
  },
];

export default function AssessmentListPage() {
  return (
    <PageContainer title="Assessment List Page" description="This is an assessment list page">
      <Breadcrumb title="Assessment List" items={BCrumb} />
      <GoogleMapsEmbed
        apiKey="AIzaSyDY5m0u13UJOnla4cjyj084PhaPw5GVpIE"
        height={200}
        width="100%"
        mode="place"
        q="Brooklyn+Bridge,New+York,NY"
      />
      <BlankCard>
        <AssessmentList />
      </BlankCard>
    </PageContainer>
  );
}
