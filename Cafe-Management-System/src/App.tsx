/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { BranchManagementPage } from './pages/BranchManagementPage';
import { CustomerManagementPage } from './pages/CustomerManagementPage';
import { EmployeeManagementPage } from './pages/EmployeeManagementPage';
import { MenuManagementPage } from './pages/MenuManagementPage';
import { OrderManagementPage } from './pages/OrderManagementPage';
import { PaymentManagementPage } from './pages/PaymentManagementPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { DashboardLayout } from './layouts/DashboardLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes (Dashboard Layout) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/branches" element={<BranchManagementPage />} />
          <Route path="/customers" element={<CustomerManagementPage />} />
          <Route path="/employees" element={<EmployeeManagementPage />} />
          <Route path="/menu" element={<MenuManagementPage />} />
          <Route path="/orders" element={<OrderManagementPage />} />
          <Route path="/payments" element={<PaymentManagementPage />} />
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
