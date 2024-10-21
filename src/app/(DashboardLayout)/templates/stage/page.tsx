'use client';

import PageContainer from '@/app/components/container/PageContainer';
import BlankCard from '@/app/components/shared/BlankCard';
import StageList from './StageList';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Template',
  },
  {
    title: 'Stage',
  },
];

export default function Page() {
  return (
    <PageContainer title="Template Stage Page" description="This is a template stage page">
      <Breadcrumb title="Template Stage" items={BCrumb} />
      <BlankCard>
        <StageList />
      </BlankCard>
    </PageContainer>
  );
}
