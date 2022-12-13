import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider} from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { themeSettings } from 'theme';

import Layout from "./screens/layout/index";
import Dashboard from "./screens/dashboard/index";
import Products from "./screens/products/index";
import Customers from "./screens/customers/index";
import Transactions from "./screens/transactions/index";
import Geography from "./screens/geography/index";
import Overview from "./screens/overview/index";
import Daily from "./screens/daily/index";
import Monthly from "./screens/monthly/index";
import Breakdown from "./screens/breakdown/index";
import Admin from "./screens/admin/index";
import Performance from "./screens/performance/index";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Routes element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Routes>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
