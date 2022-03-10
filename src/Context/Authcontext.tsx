import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { SystemUserModel } from '../models/SystemUserModel';
import { AuthModel } from '../models/authModel';
import { getUserById } from '../Services/sqlDataService';

type AuthContextType = {
  auth: AuthModel | null;
  userInfo: SystemUserModel | null;
  isGettingAuth: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthModel | null>(null);
  const [userInfo, setUserInfo] = useState<SystemUserModel | null>(null);
  const [isGettingAuth, setIsGettingAuth] = useState<boolean>(true);

  useEffect(() => {
    const auth: any = localStorage.getItem('auth');

    if (auth !== null) {
      logout();
    }
    setIsGettingAuth(false);
  }, []);

  useEffect(() => {
    if (auth) {
      getUserById(auth.InstitucionalCode).then(
        ({
          Id,
          FirstName,
          FatherLastName,
          MotherLastName,
          InstitucionalCode,
          IdRole,
          RoleDescription,
        }) => {
          const data = {
            Id,
            FirstName,
            FatherLastName,
            MotherLastName,
            InstitucionalCode,
            IdRole,
            RoleDescription,
          };

          setUserInfo(data);
        }
      );
    }
  }, [auth]);

  const login = async (data: any) => {
    try {
      const response: any = await window.Main.validateLogin(data);

      // Stringify auth
      const authStr = JSON.stringify(auth);

      // Store auth
      localStorage.setItem('auth', authStr);
    } catch (error: any) {}
  };

  /* Logout user and set authentication state */
  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider
      value={{
        isGettingAuth,
        auth,
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
