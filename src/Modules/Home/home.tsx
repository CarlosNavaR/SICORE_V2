import React from 'react';
import { Link } from 'react-router-dom';

import Styles from './home.module.css';
const Home = () => {
  return (
    <div className={Styles.grid}>
      <Link to="/Users">About</Link>
    </div>
  );
};

export default Home;
