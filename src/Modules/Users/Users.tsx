import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Logic from './Users.logic';
import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import TextField from '@mui/material/TextField';
import Styles from './user.module.css';

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

const Users = () => {
  const {
    requestSearch,
    cancelSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
    columns,
    rows,
    searched,
  } = Logic();

  return (
    <Paper style={{ padding: '1rem' }} className={Styles.root}>
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
  );
};

export default Users;
