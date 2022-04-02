import React, { useEffect, useState } from 'react';
import Chart from '../../../Components/Chart/Chart';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import LogUser from './Forms/logUser';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleData = async () => {
    const result = await window.Main.getQtyStudents();

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

  const handleTeachersReport = async () => {
    const result = await window.Main.generateTeachersReport();
    if (result === 1) {
      toast.success('Reporte generado con éxito');
    } else {
      toast.error('Ocurrió un error al generar el reporte');
    }
  };
  const handleStudentReport = async () => {
    const result = await window.Main.generateStudentsReport();
    if (result === 1) {
      toast.success('Reporte generado con éxito');
    } else {
      toast.error('Ocurrió un error al generar el reporte');
    }
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
            handleStudentReport();
          }}
        >
          Reporte de estudiantes
        </button>

        <button
          className="btn btn-outline-dark mt-3 me-3"
          onClick={() => {
            handleTeachersReport();
          }}
        >
          Reporte de docentes
        </button>

        <button
          className="btn btn-outline-dark mt-3 "
          onClick={() => {
            handleOpen();
          }}
        >
          Historial de usuario
        </button>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p className="fs-4 fw-bold" style={{ color: 'var(--blue)' }}>
              Generar historial
            </p>
            <IconButton onClick={handleClose}>
              <i
                className="fa-solid fa-xmark"
                style={{ color: 'var(--red)' }}
              ></i>
            </IconButton>
          </Grid>
          <LogUser handleClose={handleClose} />
        </Box>
      </Modal>
    </Grid>
  );
};

export default ChartUser;
