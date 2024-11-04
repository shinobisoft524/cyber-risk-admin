import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import QuillEdit from '@/app/components/forms/form-quill/QuillEdit';

const TemplateDetail = (props: {
  template: {
    name: string;
    description: string;
  };
  handleUpdate: (key: 'name' | 'description', valude: string) => void;
}) => {
  const { template, handleUpdate } = props;

  return (
    <Box p={3}>
      <Typography variant="h5">Template Detail</Typography>

      <Grid container mt={3}>
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Template Name{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            placeholder="Template Name"
            fullWidth
            defaultValue={template.name}
            onChange={(e) => {
              const value: string = e.target.value || '';
              handleUpdate('name', value);
            }}
          />
        </Grid>

        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            &nbsp;Description
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <QuillEdit
            value={template.description || ''}
            handleUpdate={(value: string) => handleUpdate('description', value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TemplateDetail;
