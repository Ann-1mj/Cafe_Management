/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="fixed left-[270px] right-0 top-0 z-40 h-[92px] border-b border-line/80 bg-cream/90 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-8 lg:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            Daily Operations
          </p>
          <h1 className="mt-1 text-[24px] font-semibold tracking-tight text-ink">
            Cafe Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden w-[360px] md:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/70"
            />
            <input
              type="text"
              placeholder="Search orders, customers, menu..."
              className="app-input pl-11 pr-4"
            />
          </div>

          <button className="app-icon-btn relative">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-gold" />
          </button>

          <button className="flex items-center gap-3 rounded-2xl border border-line bg-card px-3 py-2.5 transition-all duration-200 hover:bg-card-strong">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-sm font-semibold text-white">
              K
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-ink">RACHEL GREEN</p>
              <p className="text-xs text-muted">Super Admin</p>
            </div>
            <ChevronDown size={16} className="text-muted" />
          </button>
        </div>
      </div>
    </header>
  );
};