import React, { ReactNode, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';
import styles from './layout.module.css';
import Sidebar from '../Sidebar/Sidebar';
type Props = {
  children: ReactNode;
};

const Layout = () => {
  const { isLogin } = useContext(AuthContext);

  return (
    <div className={isLogin ? styles.gridLayout : styles.noGridLayout}>
      {isLogin && <Sidebar />}

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
