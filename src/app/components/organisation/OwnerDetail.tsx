import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import TransferList from '@/components/common/TransferList';
import { useDispatch, useSelector } from '@/store/hooks';
import { AppState } from '@/store/store';
import { updateCurrentOrganisation, updateCurrentOrganisationOwner } from '@/store/organisation';

const OwnerDetail = () => {
  const dispatch = useDispatch();
  const name = useSelector(
    (state: AppState) => state.organisation.currentOrganisation?.Owner?.name
  );
  const eamil = useSelector(
    (state: AppState) => state.organisation.currentOrganisation?.Owner?.email
  );

  return (
    <Box p={3}>
      <Typography variant="h5">Owner Details</Typography>

      <Grid container mt={3}>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Owner Name{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            placeholder="Product Name"
            fullWidth
            defaultValue={name}
            onChange={(e) => {
              const value: string = e.target.value;
              dispatch(
                updateCurrentOrganisationOwner({
                  field: 'name',
                  value: value,
                })
              );
            }}
          />
        </Grid>

        <Grid item mt={2} xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Owner Title{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField placeholder="Product Name" fullWidth />
        </Grid>

        <Grid item mt={2} xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Owner email{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            placeholder="Product Name"
            fullWidth
            defaultValue={eamil}
            onChange={(e) => {
              const value: string = e.target.value;
              dispatch(
                updateCurrentOrganisationOwner({
                  field: 'email',
                  value: value,
                })
              );
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OwnerDetail;
