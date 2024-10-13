'use client';
import { useDeferredValue, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { loginType } from '@/app/(DashboardLayout)/types/auth/auth';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import { useDispatch } from '@/store/hooks';
import { login as _login, expired as _expired } from '@/actions/auth';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const expired = searchParams.get('expired');
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('welcome@cyberriskinternational.com');
  const [password, setPassword] = useState<string>('abcdABCD1234!@#$');
  const [showPassword, setShowPassword] = useState(false);
  const _email = useDeferredValue(email);
  const _password = useDeferredValue(email);

  useEffect(() => {
    if (expired === 'true') {
      _expired(dispatch);
    }
  }, [expired]);
  useEffect(() => {}, [_email, _password]);

  const handleLogin = async () => {
    const data = { email, password };
    _login(data, dispatch).then((res: any) => {
      if (res === true) {
        router.push('/dashboard');
      }
    });
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />
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
            or sign in with
          </Typography>
        </Divider>
      </Box>

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="username">Email</CustomFormLabel>
          <CustomTextField
            value={email}
            onChange={(e: any) => setEmail(e.target.value || '')}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            value={password}
            onChange={(e: any) => setPassword(e.target.value || '')}
            type="password"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/auth/auth1/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={() => handleLogin()}
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
