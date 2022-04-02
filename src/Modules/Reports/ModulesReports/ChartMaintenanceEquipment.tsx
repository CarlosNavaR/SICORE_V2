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
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import NextMaintenanceReport from './Forms/nextMaintenanceReport';

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

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

  const handleInventoryReport = async () => {
    const result = await window.Main.generateInventoryMaintenanceEquipment();
    if (result === 1) {
      toast.success('Reporte generado con éxito');
    } else {
      toast.error('Ocurrió un error al generar el reporte');
    }
  };

  const handleInventoryInMaintenanceReport = async () => {
    const result = await window.Main.generateInventoryInMaintenanceEquipment();
    if (result === 1) {
      toast.success('Reporte generado con éxito');
    } else {
      toast.error('Ocurrió un error al generar el reporte');
    }
  };

  const handleUseMaintenanceReport = async () => {
    const result = await window.Main.generateUseMaintenanceEquipment();
    if (result === 1) {
      toast.success('Reporte generado con éxito');
    } else {
      toast.error('Ocurrió un error al generar el reporte');
    }
  };

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

        <button
          className="btn btn-outline-dark mt-3 me-3"
          onClick={() => {
            handleInventoryReport();
          }}
        >
          Reporte de inventario
        </button>

        <button
          className="btn btn-outline-dark mt-3 me-3"
          onClick={() => {
            handleInventoryInMaintenanceReport();
          }}
        >
          Reporte de equipos en mantenimiento
        </button>

        <button
          className="btn btn-outline-dark mt-3  me-3"
          onClick={() => {
            handleUseMaintenanceReport();
          }}
        >
          Reporte de uso
        </button>

        <button
          className="btn btn-outline-dark mt-3 "
          onClick={() => {
            handleOpen();
          }}
        >
          Reporte de mantenimiento
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
              Generar reporte de mantenimiento
            </p>
            <IconButton onClick={handleClose}>
              <i
                className="fa-solid fa-xmark"
                style={{ color: 'var(--red)' }}
              ></i>
            </IconButton>
          </Grid>
          <NextMaintenanceReport handleClose={handleClose} />
        </Box>
      </Modal>
    </Grid>
  );
};

export default ChartMaintenanceEquipment;
