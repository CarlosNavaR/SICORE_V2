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
  totalUsers: number,
  InactiveUsers: number,
  ActiveUsers: number,
  StudentUsers: number,
  TeacherUsers: number
) {
  return {
    Id,
    totalUsers,
    ActiveUsers,
    InactiveUsers,
    StudentUsers,
    TeacherUsers,
  };
}

const ChartUser = () => {
  const [data, setData] = useState([] as any);
  const [rows, setRows] = useState([] as any);

  const handleData = async () => {
    const result = await window.Main.getQtyStudents();
    console.log(
      '🚀 ~ file: ChartUsers.tsx ~ line 28 ~ handleData ~ result',
      result
    );
    const chartRow = [result[0].StudentUsers, result[0].TeacherUsers];
    setRows([
      createData(
        1,
        result[0].totalUsers,
        result[0].InactiveUsers,
        result[0].ActiveUsers,
        result[0].StudentUsers,
        result[0].TeacherUsers
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
          Gráfica de estudiantes y docentes activos
        </p>
        <div>
          <Chart data={data} labels={['Estudiantes', 'Docentes']} />
        </div>
      </Grid>
      <Grid item xs={7} className="p-3">
        <TableContainer className="mt-3">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: '#f3f6f9' }}>
              <TableRow>
                <TableCell>Total de usuarios</TableCell>
                <TableCell>Usuarios eliminados</TableCell>
                <TableCell>Usuarios activos</TableCell>
                <TableCell>Estudiantes</TableCell>
                <TableCell>Docentes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <TableRow key={row.Id}>
                  <TableCell component="th" scope="row">
                    {row.totalUsers}
                  </TableCell>
                  <TableCell>{row.InactiveUsers}</TableCell>
                  <TableCell>{row.ActiveUsers}</TableCell>
                  <TableCell>{row.StudentUsers}</TableCell>
                  <TableCell>{row.TeacherUsers}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <button
          className="btn btn-outline-dark mt-3 me-3"
          onClick={() => {
            window.Main.generateStudentsReport();
          }}
        >
          Reporte de estudiantes
        </button>

        <button className="btn btn-outline-dark mt-3 me-3" onClick={() => {}}>
          Reporte de docentes
        </button>

        <button className="btn btn-outline-dark mt-3 " onClick={() => {}}>
          Historial de usuario
        </button>
      </Grid>
    </Grid>
  );
};

export default ChartUser;
