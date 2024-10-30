'use client';

import PageContainer from '@/components/container/PageContainer';
import BlankCard from '@/components/shared/BlankCard';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { Button, Grid, Stack } from '@mui/material';
import OrganisationDetail from '@/app/components/organisation/OrganisationDetail';
import OwnerDetail from '@/app/components/organisation/OwnerDetail';
import AdminAction from '@/app/components/organisation/AdminAction';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useDispatch } from '@/store/hooks';
import { initOrganisation } from '@/store/organisation';
import {
  createOrganisationAction,
  createOrganisationAssessmentAction,
  createOrganisationLogoAction,
  getOrganisatioAssessmentDetailAction,
  getOrganisationDetailAction,
  getOrganisationLogoUrlAction,
} from '@/actions/orgnisation.action';
import { useRouter, useSearchParams } from 'next/navigation';
import TemplateAssignList from './component';
import useIsReady from '@/app/components/Ready';

const BCrumb = [
  {
    to: '/list',
    title: 'Organisation',
  },
  {
    title: 'Detail',
  },
];

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const dispatch = useDispatch();
  const router = useRouter();
  const currentOrganisation = useSelector(
    (state: AppState) => state.organisation.currentOrganisation
  );

  const isReady = useIsReady();

  const [assessments, setAssessments] = useState<{
    left: any[];
    right: any[];
  }>({
    left: [],
    right: [],
  });

  const [updatedAssessments, setUpdatedAssessments] = useState<{
    left: any[];
    right: any[];
  }>({
    left: [],
    right: [],
  });

  useEffect(() => {
    if (isReady) {
      getOrganisation(id);
    }
    return () => {
      dispatch(initOrganisation());
    };
  }, [isReady, id]);

  const getOrganisation = (id: string | null) => {
    if (id) {
      getOrganisationDetailAction(
        {
          info: {
            id: Number(id),
          },
        },
        dispatch
      );
      getOrganisatioAssessmentDetail(Number(id));
    } else {
      dispatch(initOrganisation());
    }
  };

  const getOrganisatioAssessmentDetail = (id: number) => {
    getOrganisatioAssessmentDetailAction({ info: { id } }, dispatch).then((res: any) => {
      makeList(res);
    });
  };

  const handleUpdate = (value: { left: any[]; right: any[] }) => {
    setUpdatedAssessments(value);
  };

  const makeList = (data: { current: any[]; all: any[] }) => {
    const all = data.all.map((a, index) => {
      return {
        id: index,
        _type: 'left',
        data: a,
      };
    });

    const current = data.current.map((a, index) => {
      return {
        id: index + data.all.length,
        _type: 'right',
        data: a,
      };
    });
    setAssessments({
      right: current,
      left: all,
    });
  };

  const handleSave = async () => {
    if (currentOrganisation) {
      createOrganisationAction(
        {
          reqType: id ? 'update' : 'create',
          info: currentOrganisation,
        },
        dispatch
      ).then(async (res: { id: string }) => {
        const orgId = res.id;
        if (!!res) {
          if (currentOrganisation?.logo && currentOrganisation?.isLogoUpdated && orgId) {
            const logoUrl = currentOrganisation.logo;
            const blobResponse = await fetch(logoUrl);
            const blob = await blobResponse.blob();
            const logoImg = new File([blob], 'image.jpeg', {
              type: blob.type,
            });

            getOrganisationLogoUrlAction(
              {
                reqType: orgId ? 'update' : 'create',
                info: {
                  id: Number(orgId),
                },
              },
              dispatch
            ).then(async (res: { presignedUrl: string } | false) => {
              if (res === false) {
              } else if (res) {
                console.log(res.presignedUrl);

                const result = await fetch(res.presignedUrl, {
                  method: 'PUT',
                  body: logoImg,
                });
                // console.log('result', result);
                // if (result && result.status === 200) {
                // }
                if (id) {
                  getOrganisation(orgId);
                } else {
                  window.location.href = `/organisations/detail?id=${orgId}`;
                }
              }
            });
          } else {
            if (id) {
              getOrganisation(orgId);
            } else {
              window.location.href = `/organisations/detail?id=${orgId}`;
            }
          }
        }
      });
    }

    // if (currentOrganisation?.logo && currentOrganisation?.isLogoUpdated && id) {
    //   const logoUrl = currentOrganisation.logo;
    //   const blobResponse = await fetch(logoUrl);
    //   const blob = await blobResponse.blob();
    //   const logoImg = new File([blob], 'image.jpeg', {
    //     type: blob.type,
    //   });

    //   getOrganisationLogoUrlAction(
    //     {
    //       reqType: id ? 'update' : 'create',
    //       info: {
    //         id: Number(id),
    //       },
    //     },
    //     dispatch
    //   ).then(async (res: { presignedUrl: string } | false) => {
    //     if (res === false) {
    //     } else if (res) {
    //       console.log(res.presignedUrl);

    //       const result = await fetch(res.presignedUrl, {
    //         method: 'PUT',
    //         body: logoImg,
    //       });
    //       console.log('result', result);
    //       if (result && result.status === 200) {
    //       }
    //     }
    //   });

    //   if (currentOrganisation) {
    //     createOrganisationAction(
    //       {
    //         reqType: id ? 'update' : 'create',
    //         info: currentOrganisation,
    //       },
    //       dispatch
    //     ).then((res: { id: string }) => {
    //       if (!!res) {
    //         if (id) {
    //           router.refresh();
    //         } else {
    //           router.push(`/organisations/detail?id=${res.id}`);
    //         }
    //       }
    //     });
    //   }
    // }
  };

  const handleAssessmentSave = () => {
    const nTh = assessments.left.length;
    const templateIds = updatedAssessments.right.map((n: number) => {
      if (nTh >= n + 1) {
        return {
          id: null,
          templateId: assessments.left[n].data.id,
        };
      } else {
        return {
          id: assessments.right[n - assessments.left.length].data.id,
          templateId: assessments.right[n - assessments.left.length].data.Template.id,
        };
      }
    });

    console.log(templateIds);
    if (currentOrganisation) {
      createOrganisationAssessmentAction(
        {
          reqType: id ? 'update' : 'create',
          info: {
            organisationId: Number(id),
            value: templateIds,
          },
        },
        dispatch
      ).then((res: any) => {
        if (!!res) {
          if (id) {
            router.refresh();
          } else {
            router.push(`/organisations/detail?id=${res.id}`);
          }
        } else {
        }
      });
    }
  };

  return (
    <PageContainer
      title="Organisation Detail Page"
      description="This is an organisation detail page"
    >
      <Breadcrumb title={`${id ? 'Edit' : 'Create'} Organisation`} items={BCrumb} />

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
          {/* <Stack mt={3} spacing={3}>
            <BlankCard>
              <NoteDetail />
            </BlankCard>
          </Stack> */}
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
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="outlined" color="error">
          Cancel
        </Button>
      </Stack>

      {id ? (
        <>
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Stack mt={3} spacing={3}>
                <BlankCard>
                  <TemplateAssignList handleUpdate={handleUpdate} list={assessments} />
                </BlankCard>
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} mt={3}>
            <Button variant="contained" color="primary" onClick={handleAssessmentSave}>
              Save Changes
            </Button>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </Stack>
        </>
      ) : (
        <></>
      )}
    </PageContainer>
  );
}
