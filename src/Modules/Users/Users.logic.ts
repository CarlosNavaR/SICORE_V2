import React, { useState, useContext, useEffect } from 'react';
import { userModel } from '../../models/userModel';
interface Column {
  id:
    | 'Id'
    | 'InstitutionalCode'
    | 'FirstName'
    | 'FatherLastname'
    | 'MotherLastname'
    | 'InstitutionalEmail'
    | 'EnrollmentDate'
    | 'RoleType';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'Id',
    label: 'Id',
    minWidth: 50,
    format: (value: number) => value.toFixed(0),
  },
  { id: 'InstitutionalCode', label: 'Código institucional', minWidth: 100 },
  { id: 'FirstName', label: 'Nombre', minWidth: 80 },
  { id: 'FatherLastname', label: 'Apellido paterno', minWidth: 100 },
  { id: 'MotherLastname', label: 'Apellido materno', minWidth: 100 },
  { id: 'InstitutionalEmail', label: 'Correo institucional', minWidth: 120 },
  { id: 'RoleType', label: 'Tipo de usuario', minWidth: 80 },
];

const Users = () => {
  const [rows, setRows] = useState<Array<userModel>>([]);
  const [rowsSearch, setRowsSearch] = useState<Array<userModel>>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [IsLoading, setIsLoading] = useState(true);
  const [searched, setSearched] = useState<string>('');

  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);

    if (searchedVal.length > 0) {
      const value = rows.filter((row) => {
        const actualRow =
          row.FirstName + ' ' + row.FatherLastname + ' ' + row.MotherLastname;
        return (
          actualRow.toLowerCase().includes(searchedVal.toLowerCase()) ||
          row.FatherLastname.toLowerCase().includes(
            searchedVal.toLowerCase()
          ) ||
          row.MotherLastname.toLowerCase().includes(
            searchedVal.toLowerCase()
          ) ||
          row.InstitutionalCode.toLowerCase().includes(
            searchedVal.toLowerCase()
          )
        );
      });
      setRows(value);
    } else {
      setRows(rowsSearch);
    }
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  const getAllUser = () => {
    window.Main.getAllUsers()
      .then((result) => {
        setRows(result);
        setRowsSearch(result);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // its used for load data in first instance
  useEffect(() => {
    getAllUser();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    columns,
    rows,
    searched,
    handleChangePage,
    handleChangeRowsPerPage,
    requestSearch,
    cancelSearch,
    getAllUser,
  };
};

export default Users;
