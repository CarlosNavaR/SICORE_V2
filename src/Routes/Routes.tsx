import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '_/Modules/Home/home';

export default function Router() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
