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
  ActiveEquipments: number
) {
  return {
    Id,
    totalEquipments,
    ActiveEquipments,
    InactiveEquipments,
  };
}

const ChartEquipment = () => {
  const [data, setData] = useState([] as any);
  const [rows, setRows] = useState([] as any);

  const handleData = async () => {
    const result = await window.Main.getQtyEquipments();
    console.log(
      '🚀 ~ file: ChartUsers.tsx ~ line 28 ~ handleData ~ result',
      result
    );
    const chartRow = [result[0].ActiveEquipments, result[0].InactiveEquipments];
    setRows([
      createData(
        1,
        result[0].totalEquipments,
        result[0].InactiveEquipments,
        result[0].ActiveEquipments
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
        <p className="text-muted h5">Gráfica de equipos activos e inactivos</p>
        <div>
          <Chart
            data={data}
            labels={['Equipos activos', 'Equipos eliminados']}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <button className="btn btn-outline-dark mt-3 me-3" onClick={() => {}}>
          Reporte de inventario
        </button>

        <button className="btn btn-outline-dark mt-3 me-3" onClick={() => {}}>
          Reporte de uso
        </button>
      </Grid>
    </Grid>
  );
};

export default ChartEquipment;
