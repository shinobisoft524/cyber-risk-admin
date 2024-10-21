'use client';

import PageContainer from '@/components/container/PageContainer';
import BlankCard from '@/components/shared/BlankCard';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { Button, Grid, Stack } from '@mui/material';
import OrganisationDetail from '@/app/components/organisation/OrganisationDetail';
import NoteDetail from '@/app/components/organisation/NoteDetail';
import OwnerDetail from '@/app/components/organisation/OwnerDetail';
import AdminAction from '@/app/components/organisation/AdminAction';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch } from '@/store/hooks';
import { initOrganisation, setCurrentOrganisation } from '@/store/organisation/OrganisationSlice';
import {
  createOrganisationAction,
  getOrganisationDetailAction,
} from '@/actions/orgnisation.action';
import { useRouter, useSearchParams } from 'next/navigation';
import readXlsxFile from 'read-excel-file';
import CollapsibleTable from './TableExpanding';

const BCrumb = [
  {
    to: '/list',
    title: 'Organisation',
  },
  {
    title: 'Detail',
  },
];

export default function OrganisationDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const dispatch = useDispatch();
  const router = useRouter();
  const list = useSelector((state: AppState) => state.organisation.list);
  const currentOrganisation = useSelector(
    (state: AppState) => state.organisation.currentOrganisation
  );

  useEffect(() => {
    !id && dispatch(initOrganisation());
    return () => {
      !id && dispatch(initOrganisation());
    };
  }, []);

  useEffect(() => {
    id && getOrganisation(Number(id));
    return () => {
      id && dispatch(initOrganisation());
    };
  }, [id]);

  const getOrganisation = (id: number) => {
    getOrganisationDetailAction({ id }, dispatch);
  };

  const handleSave = () => {
    if (currentOrganisation) {
      createOrganisationAction(currentOrganisation, dispatch).then((res: any) => {
        if (res === true) {
          router.push('/organisation/list');
        }
      });
    }
  };

  const handleFile: any = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];

    // Parse the uploaded Excel file
    readXlsxFile(file).then((rows) => {
      console.log(rows);
    });
  };

  return (
    <PageContainer
      title="Organisation Detail Page"
      description="This is an organisation detail page"
    >
      <Breadcrumb title="Create Organisation" items={BCrumb} />

      <Grid container spacing={3}>
        {/* <input type="file" onChange={handleFile} /> */}

        <BlankCard>
          <CollapsibleTable />
        </BlankCard>
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
