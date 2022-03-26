import React, { useState, useContext, useEffect } from 'react';
import { displayEquipmentModel } from '../../../models/displayEquipmentModel';

interface Column {
  id:
    | 'Id'
    | 'EquipmentTypeName'
    | 'Code'
    | 'Description'
    | 'Location'
    | 'EquipmentQualityStatusName';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'Location', label: 'Ubicación', minWidth: 80 },
  { id: 'Code', label: 'Código', minWidth: 80 },
  { id: 'EquipmentTypeName', label: 'Equipo', minWidth: 100 },
  { id: 'Description', label: 'Descripción', minWidth: 120 },
  { id: 'EquipmentQualityStatusName', label: 'Estado', minWidth: 100 },
];

const EquipmentLoan = () => {
  const [rows, setRows] = useState<Array<displayEquipmentModel>>([]);
  const [IsLoading, setIsLoading] = useState(true);

  return {
    columns,
    rows,
    setRows,
    setIsLoading,
  };
};

export default EquipmentLoan;
