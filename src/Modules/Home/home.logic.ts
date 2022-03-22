import React, { useState, useContext, useEffect } from 'react';
import { displayEquipmentLoanModel } from '../../models/displayEquipmentLoanModel';

interface Column {
  id:
    | 'IdLoan'
    | 'InstitutionalCode'
    | 'FirstName'
    | 'FatherLastname'
    | 'MotherLastname'
    | 'LendDateTime';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  formatDate?: (value: Date) => string;
}

const columns: readonly Column[] = [
  {
    id: 'IdLoan',
    label: 'Id',
    minWidth: 50,
    format: (value: number) => value.toFixed(0),
  },
  { id: 'InstitutionalCode', label: 'Código institucional', minWidth: 60 },
  { id: 'FirstName', label: 'Nombre', minWidth: 100 },
  { id: 'FatherLastname', label: 'Ap. Paterno', minWidth: 100 },
  { id: 'MotherLastname', label: 'Ap. Materno', minWidth: 120 },
  {
    id: 'LendDateTime',
    label: 'Fecha de prestamo',
    minWidth: 100,
    formatDate: (value: Date) => value.toString(),
  },
];

const EquipmentLoans = () => {
  const [rows, setRows] = useState<Array<displayEquipmentLoanModel>>([]);
  const [rowsSearch, setRowsSearch] = useState<
    Array<displayEquipmentLoanModel>
  >([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [IsLoading, setIsLoading] = useState(true);
  const [searched, setSearched] = useState<string>('');

  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);

    if (searchedVal.length > 0) {
      const value = rows.filter((row) => {
        return row.InstitutionalCode.toLowerCase().includes(
          searchedVal.toLowerCase()
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

  const getAllEquipmentLoans = () => {
    window.Main.getAllEquipmentLoans()
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
    getAllEquipmentLoans();
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

  const handleUpdateEquipment = (data: any) => {
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
    handleUpdateEquipment,
    getAllEquipmentLoans,
  };
};

export default EquipmentLoans;
