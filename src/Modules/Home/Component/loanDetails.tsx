import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import Grid from '@mui/material/Grid';
import Logic from './loanDetails.logic';
import { useForm, SubmitHandler } from 'react-hook-form';
import { displayEquipmentLoanModel } from '../../../models/displayEquipmentLoanModel';
import { displayEquipmentModel } from '../../../models/displayEquipmentModel';

dayjs.extend(relativeTime).locale('es');

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

type deactivateLoanInputs = {
  Description: string;
};

type Props = {
  handleClose: () => void;
  selectedLoan: displayEquipmentLoanModel | null;
  getAllEquipmentLoans: () => void;
};

const LoanDetails = ({
  handleClose,
  selectedLoan,
  getAllEquipmentLoans,
}: Props) => {
  const { columns, rows, setRows } = Logic();
  const [selectedEquipment, setSelectedEquipment] =
    useState<displayEquipmentModel | null>(null);
  const [returnEquipmentLoan, setReturnEquipmentLoan] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseNested = () => {
    setOpen(false);
    setReturnEquipmentLoan(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<deactivateLoanInputs>();

  const getDetails = () => {
    window.Main.getLoanDetails(selectedLoan?.IdUser, selectedLoan?.IdLoan).then(
      (res) => {
        setRows(res);
      }
    );
  };

  const onSubmit: SubmitHandler<deactivateLoanInputs> = async (data) => {
    const result = await window.Main.deactivateFullEquipmentLoan(
      selectedLoan?.IdLoan,
      data.Description
    );

    if (result === 1) {
      toast.success('Préstamo devuelto exitosamente');
      getAllEquipmentLoans();
      handleClose();
    } else {
      toast.error('Error al devolver el préstamo');
    }
    setReturnEquipmentLoan(false);
  };

  const handleDeactivateEquipmentLoan = async (data: any) => {
    const result = await window.Main.deactivateEquipmentLoan(
      selectedLoan?.IdLoan,
      data.Id
    );
    if (result === 1) {
      toast.success('Equipo regresado exitosamente');
      getDetails();
      handleCloseNested();
    } else {
      toast.error('Error al devolver el equipo');
    }
    setReturnEquipmentLoan(false);
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
          onSubmit={handleSubmit(onSubmit)}
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
                          <Tooltip title="Regresar este equipo" arrow>
                            <div>
                              <IconButton
                                aria-label="return"
                                onClick={() => {
                                  setReturnEquipmentLoan(true);
                                  setSelectedEquipment(row);
                                  handleOpen();
                                }}
                                disabled={rows.length > 1 ? false : true}
                              >
                                <i
                                  className="fa-solid fa-rotate-left"
                                  style={{ fontSize: 14 }}
                                ></i>
                              </IconButton>
                            </div>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <label className="form-label">Observaciones</label>
            <input
              type="text"
              id="Description"
              className="form-control form-control-lg"
              {...register('Description', {
                required: true,
              })}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant="contained" type="submit">
              Liberar préstamo
            </Button>
          </Grid>
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <div className="modal-header flex-column">
                <div className="icon-box">
                  <i
                    className="fa-solid fa-triangle-exclamation"
                    style={{ fontSize: 30, color: 'red' }}
                  ></i>
                </div>
              </div>
              <div className="modal-body">
                <p>
                  Estas seguro que deseas retornar este equipo unicamente? Este
                  proceso no puede ser revertido.
                </p>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    handleCloseNested();
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    handleDeactivateEquipmentLoan(selectedEquipment);
                  }}
                >
                  Devolver
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default LoanDetails;
