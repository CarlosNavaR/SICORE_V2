import React, { useState, useContext, useEffect } from 'react';
import { SystemUserModel } from '../../models/SystemUserModel';

interface Column {
  id:
    | 'Id'
    | 'InstitutionalCode'
    | 'FirstName'
    | 'FatherLastname'
    | 'MotherLastname'
    | 'Password'
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
  { id: 'Password', label: 'Contraseña', minWidth: 120 },
  { id: 'RoleType', label: 'Tipo de usuario', minWidth: 80 },
];

const Users = () => {
  const [rows, setRows] = useState<Array<SystemUserModel>>([]);
  const [rowsSearch, setRowsSearch] = useState<Array<SystemUserModel>>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [IsLoading, setIsLoading] = useState(true);
  const [searched, setSearched] = useState<string>('');

  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);

    if (searchedVal.length > 0) {
      const value = rows.filter((row) => {
        return (
          row.FirstName.toLowerCase().includes(searchedVal.toLowerCase()) ||
          row.FatherLastname.toLowerCase().includes(
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

  const getAllSystemUser = async () => {
    await window.Main.getAllSystemUsers()
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
    getAllSystemUser();
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

  const handleUpdateUser = (data: any) => {
    console.log(data);
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
    handleUpdateUser,
    getAllSystemUser,
  };
};

export default Users;
