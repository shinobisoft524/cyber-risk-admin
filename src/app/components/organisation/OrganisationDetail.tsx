import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import Thumbnail from '@/components/common/Thumbnail';
import { useDispatch, useSelector } from '@/store/hooks';
import { AppState } from '@/store/store';
import { updateCurrentOrganisation } from '@/store/organisation/OrganisationSlice';

const OrganisationDetail = () => {
  const dispatch = useDispatch();

  const currentOrganisation = useSelector(
    (state: AppState) => state.organisation.currentOrganisation
  );

  const name = useSelector((state: AppState) => state.organisation.currentOrganisation?.name);

  return (
    <Box p={3}>
      <Typography variant="h5">Organisation Detail</Typography>

      <Grid container mt={3}>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Organisation Name{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            placeholder="Organisation Name"
            fullWidth
            defaultValue={name}
            onChange={(e) => {
              const value: string = e.target.value;
              dispatch(
                updateCurrentOrganisation({
                  field: 'name',
                  value: value,
                })
              );
            }}
          />
        </Grid>

        <Grid item mt={2} xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Organisation Logo{' '}
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <Thumbnail />
        </Grid>

        <Grid item mt={2} xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Address{' '}
            {/* <Typography color="error.main" component="span">
              *
            </Typography> */}
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            placeholder="Organisation address"
            fullWidth
            onChange={(e) => {
              const value: string = e.target.value;
              // dispatch(
              //   updateCurrentOrganisation({
              //     field: 'name',
              //     value: value,
              //   })
              // );
            }}
          />
        </Grid>

        <Grid item mt={2} xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Latitude{' '}
            {/* <Typography color="error.main" component="span">
              *
            </Typography> */}
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField placeholder="Organisation Name" fullWidth />
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Longitude{' '}
            {/* <Typography color="error.main" component="span">
              *
            </Typography> */}
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField placeholder="Organisation Name" fullWidth />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrganisationDetail;
