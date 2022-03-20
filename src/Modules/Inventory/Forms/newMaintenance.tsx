import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EquipmentTypeModel } from '../../../models/equipmentTypeModel';
import { EquipmentQualityStatusModel } from '../../../models/equipmentQualityStatus';

type NewMaintenanceEquipmentInputs = {
  Code: string;
  SerialNumber: string;
  Description: string;
  Location: string;
  IdEquipmentType: number;
  IdEquipmentQualityStatus: number;
  Frecuencia: number;
  UltimoMant: Date;
  IsUnique: number;
};

type Props = {
  handleClose: () => void;
  getAllMaintenanceEquipment: () => void;
};

const NewSystemUserForm = ({
  handleClose,
  getAllMaintenanceEquipment,
}: Props) => {
  const [equipmentType, setEquipmentType] = useState<EquipmentTypeModel[]>([]);
  const [equipmentQualityStatus, setEquipmentQualityStatus] = useState<
    EquipmentQualityStatusModel[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewMaintenanceEquipmentInputs>();

  useEffect(() => {
    window.Main.getAllEquipmentTypes().then((data) => {
      setEquipmentType(data);
    });

    window.Main.getAllEquipmentQualityStatus().then((data) => {
      setEquipmentQualityStatus(data);
    });
  }, []);

  const onSubmit: SubmitHandler<NewMaintenanceEquipmentInputs> = async (
    data
  ) => {
    const saveDataForm = data;
    await window.Main.registerNewEquipment(true, saveDataForm).then(
      (response) => {
        if (response === 1) {
          toast.warning('Equipo ya registrado');
        } else if (response === 2) {
          toast.success('Equipo registrado con éxito');
          handleClose();
          getAllMaintenanceEquipment();
        } else {
          toast.error('Error al registrar Equipo');
        }
      }
    );
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
              <label className="form-label">Tipo de equipo</label>
              <select
                {...register('IdEquipmentType', {
                  required: true,
                })}
                className="form-select"
                aria-label="Default select example"
                defaultValue={'DEFAULT'}
              >
                <option value="DEFAULT" disabled>
                  Selecciona un tipo
                </option>
                {equipmentType.map(({ Id, Name }) => (
                  <option key={Id} value={Id}>
                    {Name}
                  </option>
                ))}
                ;
              </select>
            </div>
          </Grid>

          <Grid item xs={5}>
            <div className="form-outline ">
              <label className="form-label">Código interno</label>
              <input
                type="text"
                id="Code"
                className="form-control form-control"
                {...register('Code', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={7}>
            <div className="form-outline">
              <label className="form-label">Numero de serie</label>
              <input
                type="text"
                id="SerialNumber"
                className="form-control form-control"
                {...register('SerialNumber', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="form-outline ">
              <label className="form-label">Ubicación</label>
              <input
                type="text"
                id="Location"
                className="form-control form-control"
                {...register('Location', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="form-outline ">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                id="Description"
                className="form-control form-control"
                {...register('Description', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-outline ">
              <label className="form-label">Estado de equipo</label>
              <select
                {...register('IdEquipmentQualityStatus', {
                  required: true,
                })}
                className="form-select"
                aria-label="Default select example"
                defaultValue={'DEFAULT'}
              >
                <option value="DEFAULT" disabled>
                  Selecciona un estado
                </option>
                {equipmentQualityStatus.map((response: any) => (
                  <option key={response.Id} value={response.Id}>
                    {response.Name}
                  </option>
                ))}
                ;
              </select>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-outline ">
              <label className="form-label">Comportamiento de equipo</label>
              <select
                {...register('IsUnique', {
                  required: true,
                })}
                className="form-select"
                aria-label="Default select example"
                defaultValue={'DEFAULT'}
              >
                <option value="DEFAULT" disabled>
                  Selecciona un tipo
                </option>
                <option value="0">Multiples productos</option>
                <option value="1">Único equipo</option>
              </select>
            </div>
          </Grid>

          <Grid item xs={5}>
            <div className="form-outline ">
              <label className="form-label">Frecuencia</label>
              <input
                type="number"
                min="0"
                step="1"
                id="Frecuencia"
                className="form-control form-control"
                {...register('Frecuencia', {
                  required: true,
                })}
              />
            </div>
          </Grid>

          <Grid item xs={7}>
            <div className="form-outline">
              <label className="form-label">Ultimo mantenimiento</label>
              <input
                type="date"
                id="UltimoMant"
                className="form-control form-control"
                {...register('UltimoMant', {
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

export default NewSystemUserForm;
