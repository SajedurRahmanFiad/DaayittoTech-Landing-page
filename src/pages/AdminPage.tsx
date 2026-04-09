import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, LayoutDashboard, Package, Settings, LogOut, ExternalLink } from 'lucide-react';
import { SolarPackage } from '../types';
import { cn } from '../lib/utils';

interface AdminPageProps {
  packages: SolarPackage[];
  onUpdate: (packages: SolarPackage[]) => void;
}

export default function AdminPage({ packages, onUpdate }: AdminPageProps) {
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      onUpdate(packages.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F4F0]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] text-white p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-tight">Admin Console</span>
        </div>
        
        <nav className="space-y-2 flex-grow">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg text-sm font-medium">
            <Package className="w-4 h-4" /> Packages
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-medium text-gray-400">
            <Settings className="w-4 h-4" /> Settings
          </button>
        </nav>

        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-medium text-gray-400 mt-auto">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold">Package Management</h1>
              <p className="text-gray-500">Manage solar offerings for your customers</p>
            </div>
            <button 
              onClick={() => navigate('/admin/add')}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" /> Add New Package
            </button>
          </div>

          {/* Data List */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_120px] bg-gray-50 border-b border-gray-200 text-[11px] uppercase tracking-wider p-4 font-bold text-gray-500">
              <div>Package Details</div>
              <div>Category</div>
              <div>Price</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="divide-y divide-gray-100">
              {packages.map((pkg) => (
                <div key={pkg.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_120px] p-4 md:items-center hover:bg-gray-50 transition-colors group gap-4 md:gap-0">
                  <div>
                    <div className="font-bold text-gray-900">{pkg.name}</div>
                    <div className="text-sm text-gray-500">{pkg.nameBn}</div>
                  </div>
                  <div className="flex items-center">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      pkg.category === 'home' ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {pkg.category}
                    </span>
                  </div>
                  <div className="font-bold text-gray-900">৳{pkg.price.toLocaleString()}</div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> ACTIVE
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => navigate(`/admin/edit/${pkg.id}`)}
                      className="p-2 hover:bg-orange-50 text-orange-600 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(pkg.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {packages.length === 0 && (
                <div className="p-20 text-center text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No packages found. Add your first one!</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Packages</div>
              <div className="text-3xl font-bold">{packages.length}</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Live on Site</div>
              <div className="text-3xl font-bold text-green-600">{packages.length}</div>
            </div>
            <div className="bg-orange-600 p-6 rounded-xl text-white shadow-lg flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-orange-200 uppercase tracking-wider mb-1">View Site</div>
                <div className="text-xl font-bold">Go to Landing Page</div>
              </div>
              <a href="/" className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
