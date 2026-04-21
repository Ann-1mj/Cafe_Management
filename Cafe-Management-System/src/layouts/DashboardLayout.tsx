/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { motion } from 'motion/react';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen app-shell-bg">
      <Sidebar />
      <Navbar />

      <main className="min-h-screen pl-[270px] pt-[92px] transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto max-w-[1560px] px-8 py-8 lg:px-10"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};