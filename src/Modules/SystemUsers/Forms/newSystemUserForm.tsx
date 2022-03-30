import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SystemUserModel } from '../../../models/SystemUserModel';
import { AuthContext } from '../../../Context/authcontext';

type NewUserInputs = {
  InstitutionalCode: string;
  FirstName: string;
  FatherLastname: string;
  MotherLastname: string;
  Password: string;
  IdSystemUserRole: string;
};

type Props = {
  handleClose: () => void;
  getAllSystemUser: () => void;
  selectedUser: SystemUserModel | null;
};

const NewSystemUserForm = ({
  handleClose,
  getAllSystemUser,
  selectedUser,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUserInputs>();

  const { auth } = useContext(AuthContext);

  const onSubmit: SubmitHandler<NewUserInputs> = async (data) => {
    if (!selectedUser) {
      await window.Main.newSystemUser(data, auth?.Id).then((response) => {
        if (response === 1) {
          toast.warning('Usuario ya registrado');
        } else if (response === 2) {
          toast.success('Usuario registrado con éxito');
          getAllSystemUser();
          handleClose();
        } else {
          toast.error('Error al registrar usuario');
        }
      });
    } else {
      const IdSelectedUser = selectedUser?.Id;

      await window.Main.updateSystemUser(data, IdSelectedUser, auth?.Id).then(
        (response) => {
          if (response === 2) {
            toast.success('Usuario actualizado con éxito');
            getAllSystemUser();
            handleClose();
          } else {
            toast.error('Error al actualizar usuario');
          }
        }
      );
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
                defaultValue={selectedUser?.InstitutionalCode}
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
                defaultValue={selectedUser?.FirstName}
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
                defaultValue={selectedUser?.FatherLastname}
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
                defaultValue={selectedUser?.MotherLastname}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="form-outline ">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                id="Password"
                className="form-control form-control"
                {...register('Password', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="form-outline ">
              <label className="form-label">Tipo de usuario</label>
              <select
                {...register('IdSystemUserRole', {
                  required: true,
                })}
                className="form-select"
                aria-label="Default select example"
                defaultValue={
                  selectedUser
                    ? selectedUser?.RoleType === 'Administrador'
                      ? 1
                      : 2
                    : 'DEFAULT'
                }
              >
                <option value="DEFAULT" disabled>
                  Selecciona un rol
                </option>
                <option value="1">Administrador</option>
                <option value="2">Operador</option>
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

export default NewSystemUserForm;
