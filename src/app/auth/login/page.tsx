import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageContainer from '@/app/components/container/PageContainer';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import AuthLogin from '@/app/auth/authForms/AuthLogin';
import Image from 'next/image';

export default function Login() {
  return (
    <PageContainer title="Login Page" description="this is Sample page">
      <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            },
          }}
        >
          <Box
            position="relative"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              background: '#006cf5',
            }}
          >
            <Box px={3}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              sx={{
                flex: 1,
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <Box
                alignItems="center"
                justifyContent="center"
                width={580}
                height={326.25}
                sx={{
                  display: {
                    xs: 'none',
                    lg: 'flex',
                  },
                  padding: 0,
                  '& > iframe': {
                    width: '100%',
                    height: '100%',
                    border: 0,
                  },
                }}
              >
                <iframe
                  src="https://player.vimeo.com/video/912936909?h=200ebc5101&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="CyberPrism Testimonial"
                  name="fitvid0"
                ></iframe>
                {/* <Image
                src={'/images/backgrounds/login-bg.svg'}
                alt="bg"
                width={500}
                height={500}
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  maxHeight: '500px',
                }}
              /> */}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            <AuthLogin
              title="Welcome to Cyberprism"
              subtext={
                <Typography variant="subtitle1" color="textSecondary" mb={1}>
                  Your Admin Dashboard
                </Typography>
              }
              subtitle={
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography color="textSecondary" variant="h6" fontWeight="500">
                    New to Cyberprism?
                  </Typography>
                  <Typography
                    component={Link}
                    href="/auth/register"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Create an account
                  </Typography>
                </Stack>
              }
            />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
