import React, { useState, useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
type NewUserInputs = {
  InstitutionalCode: string;
  FirstName: string;
  FatherLastname: string;
  MotherLastname: string;
  InstitutionalEmail: string;
  IdUserRole: string;
};

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUserInputs>();

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

  const handleDeleteUser = (data: any) => {
    console.log(data);
  };

  const handleUpdateUser = (data: any) => {
    console.log(data);
  };

  const onSubmit: SubmitHandler<NewUserInputs> = async (data) => {
    console.log(
      '🚀 ~ file: Users.logic.ts ~ line 118 ~ constonSubmit:SubmitHandler<NewUserInputs>= ~ data',
      data
    );
  };
  const handleNewUser = (data: any) => {
    console.log(
      '🚀 ~ file: Users.logic.ts ~ line 104 ~ handleNewUser ~ data',
      data
    );
  };

  return {
    page,
    rowsPerPage,
    columns,
    rows,
    register,
    searched,
    handleSubmit,
    onSubmit,
    handleChangePage,
    handleChangeRowsPerPage,
    requestSearch,
    cancelSearch,
    handleDeleteUser,
    handleUpdateUser,
    handleNewUser,
  };
};

export default Users;
