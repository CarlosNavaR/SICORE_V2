import React, { ReactNode, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
