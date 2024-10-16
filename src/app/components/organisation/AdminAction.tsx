import React from 'react';
import Box from '@mui/material/Box';
import { Switch, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';

const AdminAction = () => {
  return (
    <Box p={3}>
      <Typography variant="h5">Admin Actions</Typography>

      <Grid container mt={3}>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Is active ?{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Switch defaultChecked color="secondary" />
          <CustomTextField placeholder="Lisence key" fullWidth />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminAction;
