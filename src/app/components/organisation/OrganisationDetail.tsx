import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Stack, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import Thumbnail from './Thumbnail';
import { useDispatch, useSelector } from '@/store/hooks';
import { AppState } from '@/store/store';
import { updateCurrentOrganisation } from '@/store/organisation';
import { ImageUpload } from '@/ccomponents/ImageUpload';
import useIsReady from '../Ready';

const OrganisationDetail = () => {
  const dispatch = useDispatch();

  const currentOrganisation = useSelector(
    (state: AppState) => state.organisation.currentOrganisation
  );

  const name = useSelector((state: AppState) => state.organisation.currentOrganisation?.name);

  const isReady = useIsReady();

  const [avatarUrl, setAvatarUrl] = useState('/images/avatars/empty.png');
  const [isStartCrop, setIsStartCrop] = useState(false);

  useEffect(() => {
    if (isReady) {
      setAvatarUrl(currentOrganisation?.logo || '/images/avatars/empty.png');
    }
  }, [currentOrganisation, isReady]);

  const handleUpdateAvatarUrl = (url: string) => {
    setAvatarUrl(url);
    setIsStartCrop(true);
  };

  const handleCropedUrl = (url: string) => {
    setAvatarUrl(url);
    setTimeout(() => {
      setIsStartCrop(false);
    }, 10);
    dispatch(
      updateCurrentOrganisation({
        field: 'logo',
        value: url,
      })
    );
    dispatch(
      updateCurrentOrganisation({
        field: 'isLogoUpdated' as any,
        value: true,
      })
    );
  };

  const CropPanel: React.FC<{ handleSave: () => void; handleCancel: () => void }> = (props) => {
    return (
      <Stack direction="row" spacing={2} mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.handleSave();
          }}
        >
          Crop
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            props.handleCancel();
            setIsStartCrop(false);
          }}
        >
          Cancel
        </Button>
      </Stack>
    );
  };

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

        {!isStartCrop && (
          <Grid item xs={12} display="flex" alignItems="center">
            <Thumbnail
              avatarUrl={avatarUrl}
              handleUpdateAvatarUrl={(url: string) => handleUpdateAvatarUrl(url)}
            />
          </Grid>
        )}
        {isStartCrop && (
          <Grid item mt={2} xs={12} display="flex" alignItems="center">
            <ImageUpload
              handleOk={handleCropedUrl}
              imageUrl={avatarUrl}
              containerStyle={{
                width: '100%',
              }}
              controlStyle={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                padding: '8px 0px',
              }}
              cropContainerStyle={{
                position: 'relative',
                height: 300,
              }}
              cropperStyle={{
                containerStyle: {
                  // width: 300,
                  height: 300,
                },
                mediaStyle: {
                  // width: 300,
                  height: 300,
                },
                cropAreaStyle: {
                  width: 150,
                  height: 150,
                },
              }}
              ControlPanel={CropPanel}
            />
          </Grid>
        )}
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
            disabled
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
          <CustomTextField disabled placeholder="Organisation Name" fullWidth />
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
          <CustomTextField disabled placeholder="Organisation Name" fullWidth />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrganisationDetail;
