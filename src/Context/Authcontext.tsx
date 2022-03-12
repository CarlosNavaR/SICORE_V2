import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthModel } from '../models/authModel';

type AuthContextType = {
  auth: AuthModel | null;
  isLogin: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [auth, setAuth] = useState<AuthModel | null>(null);

  useEffect(() => {}, [isLogin]);

  const login = async (data: any) => {
    try {
      const response = await window.Main.validateLogin(data).finally(() => {
        setIsLogin(false);
      });

      if (response) setIsLogin(true);

      // Stringify auth
      const authData: AuthModel = {
        Id: response[0].Id,
        FirstName: response[0].FirstName,
        FatherLastName: response[0].FatherLastname,
        InstitucionalCode: response[0].InstitutionalCode,
        IdRole: response[0].IdSystemUserRole,
      };
      // Store auth
      const authStr = JSON.stringify(authData);
      await localStorage.setItem('auth', authStr);

      const origin = location.state?.from?.pathname || '/home';
      navigate(origin);
    } catch (error: any) {
      return error;
    }
  };

  const logout = async () => {
    setIsLogin(false);
    setAuth(null);
    await localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        isLogin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
