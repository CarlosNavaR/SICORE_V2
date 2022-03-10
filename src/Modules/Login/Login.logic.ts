import { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthContext } from '../../Context/Authcontext';
type Inputs = {
  institutionalCode: string;
  password: string;
};
const { login } = useContext(AuthContext);
const Login = () => {
  const [isLoggin, setIsLoggin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await window.Main.validateLogin(data);
      if (result) setIsLoggin(true);
    } catch (err) {
      console.log(err);
    }
  };

  return { register, handleSubmit, onSubmit, isLoggin };
};

export default Login;
