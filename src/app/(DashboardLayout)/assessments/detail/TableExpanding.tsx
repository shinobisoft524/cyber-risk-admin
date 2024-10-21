import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import readXlsxFile from 'read-excel-file';
import { useState } from 'react';
import { idID } from '@mui/material/locale';

function createData(name: string) {
  return {
    name,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

export interface IQuestion {
  question: string;
  answers: {
    id: number;
    value: string;
  }[];
}

function Row(props: { row: IQuestion }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.question}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Answers
              </Typography>
              <div>
                {row.answers.map((answer, index) => (
                  <div key={index.toString()}>{answer.value}</div>
                ))}
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const rows = [
  createData('Frozen yoghurt'),
  createData('Frozen yoghurt'),
  createData('Frozen yoghurt'),
  createData('Frozen yoghurt'),
  createData('Frozen yoghurt'),
  createData('Frozen yoghurt'),
  createData('Frozen yoghurt'),
];

export default function CollapsibleTable() {
  const [rows, setRows] = useState<IQuestion[]>([]);
  const handleFile: any = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];

    // Parse the uploaded Excel file
    readXlsxFile(file).then((rows) => {
      console.log(rows);
      const temp: IQuestion[] = [];
      rows.forEach((row, index) => {
        if (index !== 0) {
          const length = row.length;
          const question = row[0].toString();
          const answers = [];
          for (let i = 1; i < length - 1; i++) {
            if (!!row[i]) answers.push({ id: answers.length, value: row[i].toString() });
          }

          temp.push({
            question,
            answers,
          });
        }
      });

      console.log('-------------', temp);
      setRows(temp);
    });
  };
  return (
    <Box>
      <input type="file" onChange={handleFile} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Questions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Row key={index.toString()} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
