import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import QuillEdit from '@/components/forms/form-quill/QuillEdit';
import Thumbnail from '@/components/common/Thumbnail';

const NoteDetail = () => {
  return (
    <Box p={3}>
      <Typography variant="h5">Administrator Notes</Typography>

      <Grid container mt={3}>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Description
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <QuillEdit />
          {/* <Typography variant="body2">
            Set a description to the product for better visibility.
          </Typography> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteDetail;
