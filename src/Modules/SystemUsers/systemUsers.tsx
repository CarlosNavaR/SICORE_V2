import React, { useEffect, useState } from 'react';
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
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import Logic from './SystemUsers.logic';
import Styles from './systemUser.module.css';
import NewSystemUserForm from './Forms/newSystemUserForm';
import { SystemUserModel } from '../../models/SystemUserModel';

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

const SystemUsers = () => {
  const {
    requestSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    handleUpdateUser,
    getAllSystemUser,
    page,
    rowsPerPage,
    columns,
    rows,
    searched,
  } = Logic();
  const [selectedUser, setSelectedUser] = useState<SystemUserModel | null>(
    null
  );
  const [deleteUser, setDeleteUser] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteUser = async (data: any) => {
    const result = await window.Main.deactivateSystemUser(data);
    if (result === 1) {
      toast.warning('Este usuario ya fue eliminado');
    } else if (result === 2) {
      toast.success('Usuario eliminado con éxito');
      getAllSystemUser();
      handleClose();
    } else {
      toast.error('Error al eliminar usuario');
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
        <p className="fs-4 fw-bold mb-0 ">Usuarios de sistema</p>

        <Button
          startIcon={
            <i
              className="fa-solid fa-user-plus"
              style={{ color: 'var(--blue)', fontSize: 14 }}
            ></i>
          }
          onClick={handleOpen}
        >
          Nuevo usuario
        </Button>
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
        <TableContainer sx={{ maxHeight: 550 }}>
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
                            setDeleteUser(true);
                            setSelectedUser(row);
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
                            handleUpdateUser(row);
                          }}
                        >
                          <i
                            className="fa-solid fa-pencil"
                            style={{ color: 'var(--blue)', fontSize: 14 }}
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
          {deleteUser ? (
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
                    setDeleteUser(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    handleDeleteUser(selectedUser);
                    setDeleteUser(false);
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
                  Registrar usuario
                </p>
                <IconButton onClick={handleClose}>
                  <i
                    className="fa-solid fa-xmark"
                    style={{ color: 'var(--red)' }}
                  ></i>
                </IconButton>
              </Grid>
              <NewSystemUserForm
                handleClose={handleClose}
                getAllSystemUser={getAllSystemUser}
              />
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default SystemUsers;
