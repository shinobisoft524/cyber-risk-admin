'use client';
import { Box, Container, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Image
          src={'/images/backgrounds/errorimg.svg'}
          alt="404"
          width={500}
          height={500}
          style={{ width: '100%', maxWidth: '500px', maxHeight: '500px' }}
        />
        <Typography align="center" variant="h1" mb={4}>
          Opps!!!
        </Typography>
        <Typography align="center" variant="h4" mb={4}>
          This page you are looking for could not be found.
        </Typography>
        <Typography align="center" variant="h4" mb={4}>
          (Redirecting you in 3 seconds...)
        </Typography>
        <Button color="primary" variant="contained" component={Link} href="/" disableElevation>
          Go Back to Home
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;
