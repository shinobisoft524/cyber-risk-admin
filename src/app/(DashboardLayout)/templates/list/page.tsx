'use client';

import { GoogleMapsEmbed } from '@next/third-parties/google';
import PageContainer from '@/app/components/container/PageContainer';
import BlankCard from '@/app/components/shared/BlankCard';
import TemplateList from './TemplateList';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Teamplates',
  },
  {
    title: 'List',
  },
];

export default function Page() {
  return (
    <PageContainer title="Teamplates List Page" description="This is a teamplate list page">
      <Breadcrumb title="Teamplates List" items={BCrumb} />
      <BlankCard>
        <TemplateList />
      </BlankCard>
    </PageContainer>
  );
}
