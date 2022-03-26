import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Styles from './equipment.module.css';
import Logic from './Equipment.logic';
import { displayEquipmentModel } from '../../../models/displayEquipmentModel';
import NewEquipmentForm from '../Forms/newEquipment';
import NewEquipmentTypeForm from '../Forms/newCategory';

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

const CustomTablePagination = styled(TablePaginationUnstyled)(
  ({ theme }) => `
  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding:0.5rem;

    
    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }
  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }
  & .MuiTablePaginationUnstyled-select {
    padding: 2px;
    border: 1px solid #E0E3E7;
    border-radius: 10px;
    background-color: transparent;
    width: 50px;

    &:hover {
      background-color: #F3F6F9;
    }
    &:focus {
      outline: 1px solid #A5D8FF;
    }
  }
  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }
  & .MuiTablePaginationUnstyled-actions {
    padding: 2px;
    border: 1px solid #E0E3E7;
    border-radius: 50px;
    text-align: center;
  }
  & .MuiTablePaginationUnstyled-actions > button {
    margin: 0 8px;
    border: transparent;
    border-radius: 2px;
    background-color: transparent;
    &:hover {
      background-color: #F3F6F9;
    }
    &:focus {
      outline: 1px solid #A5D8FF;
    }
  }
  `
);

const Equipment = () => {
  const {
    requestSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    handleUpdateEquipment,
    getAllEquipment,
    page,
    rowsPerPage,
    columns,
    rows,
    searched,
  } = Logic();

  const [selectedEquipment, setSelectedEquipment] =
    useState<displayEquipmentModel | null>(null);
  const [deleteEquipment, setDeleteEquipment] = useState(false);
  const [newCategory, setNewCategory] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDeleteEquipment(false);
    setSelectedEquipment(null);
    setNewCategory(false);
  };

  const handleDeleteEquipment = async (data: any) => {
    const result = await window.Main.deactivateEquipment(data.Id);

    if (result === 2) {
      toast.success('Equipo eliminado con éxito');
      getAllEquipment();
      handleClose();
    } else {
      toast.error('Error al eliminar Equipo');
    }
    setDeleteEquipment(false);
  };

  const handleQrGenerated = async (data: any) => {
    const result = await window.Main.generateQrCode(data);

    if (result === 1) {
      toast.warning('Petición cancelada');
    } else if (result === 2) {
      toast.success('QR generado con éxito');
    } else {
      toast.error('Error al generar código qr');
    }
  };

  return (
    <div>
      <Paper
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        className="align-middle"
      >
        <p className="fs-4 fw-bold mb-0 ">Inventario</p>

        <div>
          <Button
            style={{ marginRight: 5 }}
            startIcon={
              <i
                className="fa-solid fa-folder-plus"
                style={{ color: 'var(--blue)', fontSize: 14 }}
              ></i>
            }
            onClick={handleOpen}
          >
            Nuevo equipo
          </Button>

          <Button
            variant="outlined"
            startIcon={
              <i
                className="fa-solid fa-square-plus"
                style={{ color: 'var(--blue)', fontSize: 14 }}
              ></i>
            }
            onClick={() => {
              setNewCategory(true);
              handleOpen();
            }}
          >
            Registrar categoría
          </Button>
        </div>
      </Paper>

      <Paper
        style={{ padding: '1rem', marginTop: '1.5rem' }}
        className={Styles.root}
      >
        <TextField
          id="outlined-basic"
          onChange={(searchVal) => requestSearch(searchVal.target.value)}
          variant="outlined"
          fullWidth
          label="Buscar"
          style={{ marginBottom: 15 }}
        />
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Id}>
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
                            setDeleteEquipment(true);
                            setSelectedEquipment(row);
                            handleOpen();
                          }}
                        >
                          <i
                            className="fa-solid fa-trash"
                            style={{ color: 'red', fontSize: 14 }}
                          ></i>
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            setSelectedEquipment(row);
                            handleOpen();
                          }}
                        >
                          <i
                            className="fa-solid fa-pencil"
                            style={{ color: 'var(--blue)', fontSize: 14 }}
                          ></i>
                        </IconButton>
                        <IconButton
                          aria-label="qr"
                          onClick={() => {
                            handleQrGenerated(row);
                          }}
                        >
                          <i
                            className="fa-solid fa-qrcode"
                            style={{ color: 'black', fontSize: 14 }}
                          ></i>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomTablePagination
          rowsPerPageOptions={[10, 20, 30]}
          colSpan={3}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage={'Registros por página'}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          componentsProps={{
            select: {
              'aria-label': 'rows per page',
            },
            actions: {
              showFirstButton: true,
              showLastButton: true,
            } as any,
          }}
        />
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {deleteEquipment ? (
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
                  Estas seguro que deseas eliminar este registro? Este proceso
                  no puede ser revertido.
                </p>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    handleDeleteEquipment(selectedEquipment);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <p className="fs-4 fw-bold" style={{ color: 'var(--blue)' }}>
                  {newCategory
                    ? 'Registrar tipo de equipo'
                    : 'Registrar equipo'}
                </p>
                <IconButton onClick={handleClose}>
                  <i
                    className="fa-solid fa-xmark"
                    style={{ color: 'var(--red)' }}
                  ></i>
                </IconButton>
              </Grid>
              {newCategory ? (
                <NewEquipmentTypeForm handleClose={handleClose} />
              ) : (
                <NewEquipmentForm
                  handleClose={handleClose}
                  getAllEquipment={getAllEquipment}
                  selectedEquipment={selectedEquipment}
                />
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Equipment;
