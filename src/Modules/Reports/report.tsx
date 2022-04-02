import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import ChartUser from './ModulesReports/ChartUsers';
import ChartLoans from './ModulesReports/ChartLoans';
import ChartEquipment from './ModulesReports/ChartEquipment';
import ChartMaintenanceEquipment from './ModulesReports/ChartMaintenanceEquipment';

const Report = () => {
  const [report, setReport] = useState('1');

  return (
    <div>
      <Paper
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        className="align-middle"
      >
        <p className="fs-4 fw-bold mb-0 ">Reportes</p>

        <select
          className=" mb-0"
          defaultValue={1}
          onChange={(option) => setReport(option.target.value)}
        >
          <option value="1">Reporte de prestamos</option>
          <option value="2">Reporte de equipos</option>
          <option value="3">Reporte de mantenimientos</option>
          <option value="4">Reporte de usuarios</option>
        </select>
      </Paper>

      <Paper style={{ padding: '1rem', marginTop: '1.5rem' }}>
        {report === '1' ? (
          <ChartLoans />
        ) : report === '2' ? (
          <ChartEquipment />
        ) : report === '3' ? (
          <ChartMaintenanceEquipment />
        ) : report === '4' ? (
          <ChartUser />
        ) : (
          ''
        )}
      </Paper>
    </div>
  );
};

export default Report;
