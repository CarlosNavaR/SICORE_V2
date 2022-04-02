import React, { useEffect, useState } from 'react';
import Chart from '../../../Components/Chart/Chart';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  Id: number,
  totalEquipments: number,
  InactiveEquipments: number,
  ActiveEquipments: number,
  InMaintenance: number
) {
  return {
    Id,
    totalEquipments,
    InactiveEquipments,
    ActiveEquipments,
    InMaintenance,
  };
}

const ChartMaintenanceEquipment = () => {
  const [data, setData] = useState([] as any);
  const [rows, setRows] = useState([] as any);

  const handleData = async () => {
    const result = await window.Main.getQtyMaintenanceEquipment();
    console.log(
      '🚀 ~ file: ChartUsers.tsx ~ line 28 ~ handleData ~ result',
      result
    );
    const chartRow = [result[0].ActiveEquipments, result[0].InMaintenance];
    setRows([
      createData(
        1,
        result[0].totalEquipments,
        result[0].InactiveEquipments,
        result[0].ActiveEquipments,
        result[0].InMaintenance
      ),
    ]);

    setData(chartRow);
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={5} style={{ textAlign: 'center' }}>
        <p className="text-muted h5">
          Gráfica de equipos que requieren mantenimiento
        </p>
        <div>
          <Chart
            data={data}
            labels={['Equipo activo', 'Equipo en mantenimiento']}
          />
        </div>
      </Grid>
      <Grid item xs={7} className="p-3">
        <TableContainer className="mt-3">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: '#f3f6f9' }}>
              <TableRow>
                <TableCell>Total de equipos</TableCell>
                <TableCell>Equipos eliminados</TableCell>
                <TableCell>Equipos activos</TableCell>
                <TableCell>Equipos en mantenimiento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <TableRow key={row.Id}>
                  <TableCell component="th" scope="row">
                    {row.totalEquipments}
                  </TableCell>
                  <TableCell>{row.InactiveEquipments}</TableCell>
                  <TableCell>{row.ActiveEquipments}</TableCell>
                  <TableCell>{row.InMaintenance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <button className="btn btn-outline-dark mt-3 me-3" onClick={() => {}}>
          Reporte de inventario
        </button>

        <button className="btn btn-outline-dark mt-3 me-3" onClick={() => {}}>
          Reporte de equipos en mantenimiento
        </button>

        <button className="btn btn-outline-dark mt-3  me-3" onClick={() => {}}>
          Reporte de uso
        </button>

        <button className="btn btn-outline-dark mt-3 " onClick={() => {}}>
          Reporte de mantenimiento
        </button>
      </Grid>
    </Grid>
  );
};

export default ChartMaintenanceEquipment;
