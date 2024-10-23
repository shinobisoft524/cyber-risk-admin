'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  CardHeader,
  Stack,
  Paper,
  Box,
  Typography,
} from '@mui/material';

import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';

import CustomCheckbox from '@/components/forms/theme-elements/CustomCheckbox';

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

const TemplateAssignList = (props: {
  list: {
    left: any[];
    right: any[];
  };
  handleUpdate?: (value: { left: any[]; right: any[] }) => void;
}) => {
  const { list, handleUpdate } = props;

  const [checked, setChecked] = useState<readonly number[]>([]);
  const [left, setLeft] = useState<number[]>([]);
  const [right, setRight] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    makeList();
  }, [list]);

  useEffect(() => {
    handleUpdate &&
      handleUpdate({
        left,
        right,
      });
  }, [left, right]);

  const makeList = () => {
    setIsLoading(true);
    setLeft(list.left.map((l) => Number(l.id)));
    setRight(list.right.map((r) => Number(r.id)));
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  };

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) => intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const theme = useTheme();
  const borderColor = theme.palette.grey[100];

  const getTitle = (id: number) => {
    if (list.left.length >= id + 1) {
      return list.left[id].data.name;
    } else {
      return list.right[id - list.left.length].data.Template.name;
    }
  };

  const customList = (title: React.ReactNode, items: readonly number[]) => (
    <Paper variant="outlined" sx={{ border: `1px solid ${borderColor}` }}>
      <CardHeader
        sx={{ px: 2 }}
        avatar={
          <CustomCheckbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <CustomCheckbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={getTitle(value)} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  if (isLoading) return <></>;
  return (
    <Box p={3}>
      <Typography variant="h5">Assigned Template</Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList('Choices', left)}</Grid>
        <Grid item>
          <Stack spacing={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              <IconChevronRight width={20} height={20} />
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              <IconChevronLeft width={20} height={20} />
            </Button>
          </Stack>
        </Grid>
        <Grid item>{customList('Chosen', right)}</Grid>
      </Grid>
    </Box>
  );
};
export default TemplateAssignList;
