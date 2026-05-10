'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Settings,
  Package,
  Activity,
  User,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  activeRoute: string;
}

const navGroups = [
  {
    label: 'Monitor',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/', badge: null },
    ],
  },
  {
    label: 'Manage',
    items: [
      { icon: Package, label: 'Inventory', href: '/inventory', badge: null },
      { icon: Activity, label: 'Analytics', href: '/analytics', badge: null },
      { icon: Bell, label: 'Alerts', href: '/alerts', badge: '5' },
    ],
  },
  {
    label: 'Account',
    items: [
      { icon: User, label: 'Profile', href: '/profile', badge: null },
      { icon: Settings, label: 'Settings', href: '/settings', badge: null },
    ],
  },
];

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
  activeRoute,
}: SidebarProps) {
  const sidebarWidth = collapsed ? 'w-16' : 'w-60';

  const sidebarContent = (
    <div
      className={`flex flex-col h-full bg-card border-r border-border transition-all duration-300 ease-in-out ${sidebarWidth} overflow-hidden`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-3 border-b border-border flex-shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-2 min-w-0">
            <AppLogo size={32} />
            <span className="font-semibold text-base text-gradient-cyan truncate">SmartPaws</span>
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <AppLogo size={32} />
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {navGroups.map((group) => (
          <div key={`group-${group.label}`} className="mb-4">
            {!collapsed && (
              <p className="text-xs font-500 uppercase tracking-widest text-muted-foreground px-3 mb-1">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const isActive = activeRoute === item.href;
              return (
                <Link
                  key={`nav-${item.href}`}
                  href={item.href}
                  onClick={onMobileClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 sidebar-item-hover relative group
                    ${isActive ? 'sidebar-item-active' : 'text-muted-foreground'}`}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium truncate flex-1">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="text-xs font-semibold bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
                  )}
                  {/* Tooltip for collapsed */}
                  {collapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-secondary text-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 border border-border">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border p-2 flex-shrink-0">
        <Link
          href="/sign-up-login-screen"
          className="flex items-center gap-3 px-3 py-2 rounded-lg sidebar-item-hover text-muted-foreground group relative"
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
          {collapsed && (
            <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-secondary text-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 border border-border">
              Sign Out
            </span>
          )}
        </Link>

        {/* Collapse toggle — desktop only */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center w-full mt-1 py-2 rounded-lg sidebar-item-hover text-muted-foreground"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block flex-shrink-0 transition-all duration-300 ease-in-out" style={{ width: collapsed ? 64 : 240 }}>
        {sidebarContent}
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ease-in-out w-60
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {sidebarContent}
      </div>
    </>
  );
}