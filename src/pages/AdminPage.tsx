import { useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, LogOut, ExternalLink, ShoppingBag } from 'lucide-react';
import { SolarPackage, Order, AdminSettings } from '../types';
import { cn } from '../lib/utils';

// Sub-views
import AdminPackagesView from './AdminPackagesView';
import AdminOrdersView from './AdminOrdersView';
import AdminSettingsView from './AdminSettingsView';

interface AdminPageProps {
  packages: SolarPackage[];
  onUpdatePackages: (packages: SolarPackage[]) => void;
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
  settings: AdminSettings;
  onUpdateSettings: (settings: AdminSettings) => void;
  onLogout: () => void;
}

export default function AdminPage({ 
  packages, 
  onUpdatePackages, 
  orders, 
  onUpdateOrders, 
  settings, 
  onUpdateSettings,
  onLogout 
}: AdminPageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="flex min-h-screen bg-[#F4F4F0]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] text-white p-6 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-12">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-tight">অ্যাডমিন প্যানেল</span>
        </div>
        
        <nav className="space-y-2 flex-grow">
          <Link 
            to="/admin" 
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              currentPath === '/admin' ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"
            )}
          >
            <Package className="w-4 h-4" /> প্যাকেজসমূহ
          </Link>
          <Link 
            to="/admin/orders" 
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              currentPath === '/admin/orders' ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"
            )}
          >
            <ShoppingBag className="w-4 h-4" /> অর্ডারসমূহ
          </Link>
          <Link 
            to="/admin/settings" 
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              currentPath === '/admin/settings' ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"
            )}
          >
            <Settings className="w-4 h-4" /> সেটিংস
          </Link>
        </nav>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-medium text-gray-400 mt-auto"
        >
          <LogOut className="w-4 h-4" /> লগআউট
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route index element={<AdminPackagesView packages={packages} onUpdate={onUpdatePackages} />} />
            <Route path="orders" element={<AdminOrdersView orders={orders} onUpdate={onUpdateOrders} />} />
            <Route path="settings" element={<AdminSettingsView settings={settings} onUpdate={onUpdateSettings} />} />
          </Routes>

          {/* Quick Stats - Only show on main dashboard or as a footer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 pt-10 border-t border-gray-200">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">মোট প্যাকেজ</div>
              <div className="text-3xl font-bold">{packages.length}</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">মোট অর্ডার</div>
              <div className="text-3xl font-bold text-orange-600">{orders.length}</div>
            </div>
            <div className="bg-orange-600 p-6 rounded-xl text-white shadow-lg flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-orange-200 uppercase tracking-wider mb-1">সাইট দেখুন</div>
                <div className="text-xl font-bold">হোম পেজ</div>
              </div>
              <Link to="/" className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                <ExternalLink className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
