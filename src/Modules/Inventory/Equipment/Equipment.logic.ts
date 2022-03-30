import React, { useState, useContext, useEffect } from 'react';
import { displayEquipmentModel } from '../../../models/displayEquipmentModel';

interface Column {
  id:
    | 'Id'
    | 'EquipmentTypeName'
    | 'Code'
    | 'SerialNumber'
    | 'Description'
    | 'Location'
    | 'EquipmentQualityStatusName';
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
  { id: 'Location', label: 'Ubicación', minWidth: 80 },
  { id: 'Code', label: 'Código', minWidth: 100 },
  { id: 'EquipmentTypeName', label: 'Equipo', minWidth: 100 },
  { id: 'SerialNumber', label: 'Numero de serie', minWidth: 100 },
  { id: 'Description', label: 'Descripción', minWidth: 120 },
  { id: 'EquipmentQualityStatusName', label: 'Estado', minWidth: 80 },
];

const Equipment = () => {
  const [rows, setRows] = useState<Array<displayEquipmentModel>>([]);
  const [rowsSearch, setRowsSearch] = useState<Array<displayEquipmentModel>>(
    []
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [IsLoading, setIsLoading] = useState(true);
  const [searched, setSearched] = useState<string>('');

  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);

    if (searchedVal.length > 0) {
      const value = rows.filter((row) => {
        const actualRow = row.Code + ' ' + row.EquipmentTypeName;
        return (
          actualRow.toLowerCase().includes(searchedVal.toLowerCase()) ||
          row.Code.toLowerCase().includes(searchedVal.toLowerCase()) ||
          row.EquipmentTypeName.toLowerCase().includes(
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

  const getAllEquipment = () => {
    window.Main.getAllEquipment()
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
    getAllEquipment();
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
    getAllEquipment,
  };
};

export default Equipment;
