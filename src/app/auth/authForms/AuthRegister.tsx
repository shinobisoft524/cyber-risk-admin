'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import { registerType } from '@/app/(DashboardLayout)/types/auth/auth';
import AuthSocialButtons from './AuthSocialButtons';
import { useState } from 'react';
import { register as _register } from '@/actions/auth';
const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const [name, setName] = useState<string>('cyberriskinternational');
  const [email, setEmail] = useState<string>('welcome@cyberriskinternational.com');
  const [password, setPassword] = useState<string>('abcdABCD1234!@#$');

  const handleRegister = async () => {
    const data = { name, email, password };
    _register(data);
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <AuthSocialButtons title="Sign up with" />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <Box>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="username">Name</CustomFormLabel>
          <CustomTextField
            value={name}
            onChange={(e: any) => setName(e.target.value || '')}
            variant="outlined"
            fullWidth
          />
          <CustomFormLabel htmlFor="useremail">Email</CustomFormLabel>
          <CustomTextField
            value={email}
            onChange={(e: any) => setEmail(e.target.value || '')}
            variant="outlined"
            fullWidth
          />
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            value={password}
            onChange={(e: any) => setPassword(e.target.value || '')}
            type="password"
            variant="outlined"
            fullWidth
          />
        </Stack>
        <Button color="primary" variant="contained" size="large" fullWidth onClick={handleRegister}>
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
