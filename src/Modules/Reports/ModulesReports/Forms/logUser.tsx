import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';

type NewEquipmentTypeInputs = {
  InstitutionalCode: string;
  StartDate: any;
  EndDate: any;
};

type Props = {
  handleClose: () => void;
};

const LogUser = ({ handleClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEquipmentTypeInputs>();

  const onSubmit: SubmitHandler<NewEquipmentTypeInputs> = async (data) => {
    const result = await window.Main.generateLogUser(
      data.InstitutionalCode,
      data.StartDate,
      data.EndDate
    );
    if (result === 1) {
      toast.success('Reporte generado con éxito');
      handleClose();
    } else {
      toast.error('Ocurrió un error al generar el reporte');
    }
  };

  return (
    <>
      <div>
        <Grid
          container
          component="form"
          columnSpacing={2}
          rowSpacing={2}
          justifyContent="center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={12}>
            <div className="form-outline ">
              <label className="form-label">Código institucional</label>
              <input
                type="text"
                id="InstitutionalCode"
                className="form-control form-control"
                {...register('InstitutionalCode', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-outline">
              <label className="form-label">Desde</label>
              <input
                type="Date"
                id="StartDate"
                className="form-control form-control"
                {...register('StartDate', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-outline">
              <label className="form-label">Hasta</label>
              <input
                type="date"
                id="EndDate"
                className="form-control form-control"
                {...register('EndDate', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant="contained" type="submit">
              Generar
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default LogUser;
