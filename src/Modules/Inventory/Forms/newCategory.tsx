import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';

type NewEquipmentTypeInputs = {
  Name: string;
};

type Props = {
  handleClose: () => void;
};

const NewEquipmentTypeForm = ({ handleClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEquipmentTypeInputs>();

  const onSubmit: SubmitHandler<NewEquipmentTypeInputs> = async (data) => {
    await window.Main.newEquipmentType(data.Name).then((response) => {
      if (response === 1) {
        toast.warning('Categoría ya registrado');
      } else if (response === 2) {
        toast.success('Categoría registrado con éxito');
        handleClose();
      } else {
        toast.error('Error al registrar categoria');
      }
    });
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
              <label className="form-label">Categoría</label>
              <input
                type="text"
                id="Name"
                className="form-control form-control"
                {...register('Name', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant="contained" type="submit">
              Registrar
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default NewEquipmentTypeForm;
