import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import { useForm, SubmitHandler } from 'react-hook-form';
import Logic from './newLoan.logic';
import { displayEquipmentLoanModel } from '../../../models/displayEquipmentLoanModel';

type NewEquipmentLoanInputs = {
  InstitutionalCode: string;
};

type Props = {
  handleClose: () => void;
  getAllEquipmentLoans: () => void;
};

const NewLoanForm = ({ handleClose, getAllEquipmentLoans }: Props) => {
  const { columns, rows, setRows } = Logic();
  const [selectedLoan, setSelectedLoan] =
    useState<displayEquipmentLoanModel | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEquipmentLoanInputs>();

  const onSubmit: SubmitHandler<NewEquipmentLoanInputs> = async (data) => {
    if (rows.length > 0) {
      await window.Main.newLoanEquipment(data.InstitutionalCode, rows).then(
        (response) => {
          if (response === 1) {
            toast.warning('Usuario no registrado');
          } else if (response === 2) {
            toast.success('Préstamo registrado con éxito');
            getAllEquipmentLoans();
            handleClose();
          } else {
            toast.error('Error al registrar préstamo');
          }
        }
      );
    } else {
      toast.error('No se puede registrar un préstamo sin equipos');
    }
  };

  const addNewEquipment = async (data: any) => {
    if (!data) {
      toast.warning('Necesitas proporcionar un código');
    } else {
      const isEquipmentLoan = await window.Main.getLoanEquipmentByCode(data);

      if (isEquipmentLoan.length > 0) {
        toast.warning(
          'Este equipo ha sido prestado, libera la orden antes de volver a solicitarlo'
        );
      } else {
        const result = await window.Main.getEquipmentByCode(data);
        if (result.length > 0) {
          if (rows.length > 0) {
            setRows(result.concat(...rows));
          } else {
            setRows(result);
          }
        } else {
          toast.error('Este equipo no existe');
        }
      }
    }
  };

  const handleRemove = (data: any) => {
    setRows(rows.filter((row) => row.Id !== data.Id));
  };

  return (
    <>
      <div>
        <Grid
          container
          component="form"
          columnSpacing={2}
          rowSpacing={2}
          justifyContent="center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={12} container>
            <Grid item xs={5}>
              <div className="form-outline ">
                <label className="form-label">Código institucional</label>
                <input
                  type="text"
                  id="InstitutionalCode"
                  className="form-control form-control"
                  {...register('InstitutionalCode', {
                    required: true,
                  })}
                />
              </div>
            </Grid>
            <Grid
              container
              item
              xs={7}
              columnSpacing={2}
              rowSpacing={2}
              justifyContent="center"
            >
              <Grid item xs={9}>
                <div className="form-outline ">
                  <label className="form-label">Código de equipo</label>
                  <input
                    type="text"
                    id="Code"
                    className="form-control form-control"
                  />
                </div>
              </Grid>

              <Grid
                item
                xs={2}
                style={{ alignSelf: 'flex-end', marginBottom: 3 }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    const data = (
                      document.getElementById('Code') as HTMLInputElement
                    ).value;
                    addNewEquipment(data);
                    (
                      document.getElementById('Code') as HTMLInputElement
                    ).value = '';
                  }}
                >
                  Añadir
                </Button>
              </Grid>
            </Grid>
          </Grid>

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
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              handleRemove(row);
                            }}
                          >
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
              Registrar
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default NewLoanForm;
