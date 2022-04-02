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
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import LoanReport from './Forms/loansReport';

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
  totalLoans: number,
  InactiveLoan: number,
  ActiveLoan: number
) {
  return {
    Id,
    totalLoans,
    InactiveLoan,
    ActiveLoan,
  };
}

const ChartLoans = () => {
  const [data, setData] = useState([] as any);
  const [rows, setRows] = useState([] as any);
  const [reportType, setReportType] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setReportType(0);
    setOpen(false);
  };

  const handleData = async () => {
    const result = await window.Main.getQtyLoans();

    const chartRow = [result[0].InactiveLoans, result[0].ActiveLoans];
    setRows([
      createData(
        1,
        result[0].totalLoans,
        result[0].ActiveLoans,
        result[0].InactiveLoans
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
          Gráfica de prestamos activos e inactivos
        </p>
        <div>
          <Chart
            data={data}
            labels={['Prestamos activos', 'Prestamos liberados']}
          />
        </div>
      </Grid>
      <Grid item xs={7} className="p-3">
        <TableContainer className="mt-3">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: '#f3f6f9' }}>
              <TableRow>
                <TableCell>Total de prestamos</TableCell>
                <TableCell>Prestamos activos</TableCell>
                <TableCell>Prestamos regresados</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <TableRow key={row.Id}>
                  <TableCell component="th" scope="row">
                    {row.totalLoans}
                  </TableCell>
                  <TableCell>{row.InactiveLoan}</TableCell>
                  <TableCell>{row.ActiveLoan}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div>
          <button
            className="btn btn-outline-dark mt-3 me-3"
            onClick={() => {
              setReportType(1);
              handleOpen();
            }}
          >
            Reporte de suministros prestados
          </button>
          <button
            className="btn btn-outline-dark mt-3 me-3"
            onClick={() => {
              setReportType(2);
              handleOpen();
            }}
          >
            Reporte de equipos prestados
          </button>
        </div>
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
          <LoanReport handleClose={handleClose} reportType={reportType} />
        </Box>
      </Modal>
    </Grid>
  );
};

export default ChartLoans;
