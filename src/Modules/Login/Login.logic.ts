import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/authcontext';
import { toast } from 'react-toastify';

type Inputs = {
  institutionalCode: string;
  password: string;
};

const Login = () => {
  const { login, isLogin } = useContext(AuthContext);
  const [isLogging, setIsLogging] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await login(data).then((response) => {
        if (response === undefined) {
          setIsLogging(isLogin);
        } else {
          toast.error('Usuario o contraseña incorrectas');
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return { register, handleSubmit, onSubmit, isLogging };
};

export default Login;
