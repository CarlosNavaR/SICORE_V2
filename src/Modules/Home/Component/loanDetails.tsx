import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import Grid from '@mui/material/Grid';
import Logic from './loanDetails.logic';
import { useForm, SubmitHandler } from 'react-hook-form';
import { displayEquipmentLoanModel } from '../../../models/displayEquipmentLoanModel';
dayjs.extend(relativeTime).locale('es');

type Props = {
  handleClose: () => void;
  selectedLoan: displayEquipmentLoanModel | null;
};

const LoanDetails = ({ handleClose, selectedLoan }: Props) => {
  {
    console.log(
      '🚀 ~ file: loanDetails.tsx ~ line 22 ~ LoanDetails ~ selectedLoan',
      selectedLoan
    );
  }
  const { columns, rows, setRows } = Logic();

  const getDetails = () => {
    window.Main.getLoanDetails(selectedLoan?.IdUser, selectedLoan?.IdLoan).then(
      (res) => {
        setRows(res);
      }
    );
  };

  // its used for load data in first instance
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <div>
        <Paper style={{ padding: 10 }} variant="outlined">
          <div style={{ justifyContent: 'space-between', display: 'flex' }}>
            <p className="fs-6" style={{ margin: 0 }}>
              {selectedLoan
                ? selectedLoan.FirstName +
                  ' ' +
                  selectedLoan.FatherLastname +
                  ' ' +
                  selectedLoan.MotherLastname +
                  ' ' +
                  selectedLoan.InstitutionalCode
                : 'user not found'}
            </p>

            <p className="fs-6 text-muted" style={{ margin: 0 }}>
              {selectedLoan
                ? dayjs(new Date(selectedLoan.LendDateTime))
                    .fromNow()
                    .toString()
                : 'user not found'}
            </p>
          </div>
        </Paper>
        <Grid
          container
          component="form"
          columnSpacing={2}
          rowSpacing={2}
          justifyContent="center"
        >
          <Grid item xs={12}>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell component="th" scope="row">
                      Opciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.Id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell>
                          <IconButton aria-label="delete" onClick={() => {}}>
                            <i
                              className="fa-solid fa-trash"
                              style={{ color: 'red', fontSize: 14 }}
                            ></i>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant="contained" type="submit">
              Liberar préstamo
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default LoanDetails;
