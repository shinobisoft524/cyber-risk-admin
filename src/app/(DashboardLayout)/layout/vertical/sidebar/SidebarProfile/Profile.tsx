import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from '@/store/hooks';
import { IconPower } from '@tabler/icons-react';
import { AppState } from '@/store/store';
import { logout as _logout } from '@/actions/auth';
import { useDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';

export const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user);
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  const handleLogOut = async () => {
    _logout({ email: user.email }, dispatch, router);
  };

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src={'/images/profile/user-1.jpg'}
            sx={{ height: 40, width: 40 }}
          />

          <Box>
            <Typography variant="h6">Mathew</Typography>
            <Typography variant="caption">Designer</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton color="primary" aria-label="logout" size="small" onClick={handleLogOut}>
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
