'use client';

import * as React from 'react';
import { Typography, Box, MenuItem, Button, Divider, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';
import CustomSelect from '@/components/forms/theme-elements/CustomSelect';

const TablePagination = () => {
  return (
    <>
      <Divider />
      <Stack
        gap={1}
        p={3}
        alignItems="center"
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Button variant="contained" color="primary">
            Force Rerender
          </Button>
          <Typography variant="body1">
            17
            {/* {table.getPrePaginationRowModel().rows.length}  */}
            Rows
          </Typography>
        </Box>
        <Box
          sx={{
            display: {
              xs: 'block',
              sm: 'flex',
            },
          }}
          alignItems="center"
          gap={1}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="body1">Page</Typography>
            <Typography variant="body1" fontWeight={600}>
              1 of 3
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            | Go to page:
            <CustomTextField type="number" min="1" max={3} defaultValue={1} />
          </Stack>
          <CustomSelect value={16}>
            {[10, 15, 20, 25].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                {pageSize}
              </MenuItem>
            ))}
          </CustomSelect>

          <IconButton size="small">
            <IconChevronsLeft />
          </IconButton>
          <IconButton size="small">
            <IconChevronLeft />
          </IconButton>
          <IconButton size="small">
            <IconChevronRight />
          </IconButton>
          <IconButton size="small">
            <IconChevronsRight />
          </IconButton>
        </Box>
      </Stack>
    </>
  );
};

export default TablePagination;
