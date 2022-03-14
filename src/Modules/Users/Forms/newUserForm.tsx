import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import userLogic from '../Users.logic';

const NewUserForm = () => {
  const { register, handleSubmit, onSubmit } = userLogic();

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
          <Grid item xs={4}>
            <div className="form-outline ">
              <label className="form-label">Número de control</label>
              <input
                type="text"
                id="institutionalCode"
                className="form-control form-control"
                {...register('InstitutionalCode', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={8}>
            <div className="form-outline">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                id="FirstName"
                className="form-control form-control"
                {...register('FirstName', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-outline ">
              <label className="form-label">Apellido paterno</label>
              <input
                type="text"
                id="FatherLastname"
                className="form-control form-control"
                {...register('FatherLastname', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-outline ">
              <label className="form-label">Apellido materno</label>
              <input
                type="text"
                id="MotherLastname"
                className="form-control form-control"
                {...register('MotherLastname', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="form-outline ">
              <label className="form-label">Correo institucional</label>
              <input
                type="email"
                id="InstitutionalEmail"
                className="form-control form-control"
                {...register('InstitutionalEmail', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="form-outline ">
              <label className="form-label">Tipo de usuario</label>
              <select
                {...register('IdUserRole', {
                  required: true,
                })}
                className="form-select"
                aria-label="Default select example"
                defaultValue={'DEFAULT'}
              >
                <option value="DEFAULT" disabled>
                  Selecciona un rol
                </option>
                <option value="1">Profesor</option>
                <option value="2">Alumno</option>
              </select>
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

export default NewUserForm;
