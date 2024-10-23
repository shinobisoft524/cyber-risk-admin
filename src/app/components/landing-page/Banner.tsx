'use client';
import React from 'react';
import {
  Box,
  Stack,
  Typography,
  AvatarGroup,
  Avatar,
  Container,
  Grid,
  Button,
  Link,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Frameworks = [
  {
    name: 'React',
    icon: '/images/frontend-pages/icons/icon-react.svg',
  },
  {
    name: 'Material Ui',
    icon: '/images/frontend-pages/icons/icon-mui.svg',
  },
  {
    name: 'Next.js',
    icon: '/images/frontend-pages/icons/icon-next.svg',
  },
  {
    name: 'Typescript',
    icon: '/images/frontend-pages/icons/icon-ts.svg',
  },
  {
    name: 'Redux',
    icon: '/images/frontend-pages/icons/icon-redux.svg',
  },
  {
    name: 'Tabler Icon',
    icon: '/images/frontend-pages/icons/icon-tabler.svg',
  },
];

const bannerTitleSX = {
  fontSize: {
    xs: '40px',
    sm: '80px',
  },
};

const bannerSubTitleSX = {
  fontSize: {
    xs: '20px',
    sm: '32px',
  },
};

const Banner = () => {
  //   sidebar
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box bgcolor="primary.light" pt={7}>
      <Container
        sx={{
          maxWidth: '1400px !important',
          position: 'relative',
        }}
      >
        <Box
          bgcolor="primary.light"
          borderRadius="24px"
          sx={{
            background:
              'linear-gradient(to bottom, rgba(96, 160, 254, 0.15) 0%, rgba(191, 219, 255, 0.15) 18%, rgba(13, 110, 253, 0.15) 64%)',
            padding: '64px 50px 50px 93px',
          }}
        >
          <Grid container spacing={3} justifyContent="center">
            <Grid item p={0} xs={8} lg={8} textAlign={'start'}>
              <Typography variant="h1" fontWeight={700} lineHeight={2.5}>
                <Typography variant="h1" component="span" color={'#0D6EFD'} sx={bannerTitleSX}>
                  Welcome{' '}
                </Typography>
                <Typography
                  variant="h1"
                  sx={bannerTitleSX}
                  color={'#2A3547'}
                  fontWeight={700}
                  component="span"
                >
                  Cyber
                </Typography>
                <br />
                <Typography
                  variant="h1"
                  sx={bannerTitleSX}
                  color={'#2A3547'}
                  fontWeight={700}
                  component="span"
                >
                  Admint{' '}
                </Typography>
                <Typography variant="h1" component="span" color={'#0D6EFD'} sx={bannerTitleSX}>
                  Panel
                </Typography>
              </Typography>
            </Grid>
            <Grid item p={0} xs={4} lg={4} textAlign="center"></Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
