import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';
import { SolarPackage } from '../types';
import { cn } from '../lib/utils';

interface AdminPackagesViewProps {
  packages: SolarPackage[];
  onUpdate: (packages: SolarPackage[]) => void;
}

export default function AdminPackagesView({ packages, onUpdate }: AdminPackagesViewProps) {
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      onUpdate(packages.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">প্যাকেজ ম্যানেজমেন্ট</h1>
          <p className="text-gray-500">আপনার গ্রাহকদের জন্য সোলার প্যাকেজগুলো পরিচালনা করুন</p>
        </div>
        <button 
          onClick={() => navigate('/admin/add')}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" /> নতুন প্যাকেজ যোগ করুন
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_120px] bg-gray-50 border-b border-gray-200 text-[11px] uppercase tracking-wider p-4 font-bold text-gray-500">
          <div>প্যাকেজের বিবরণ</div>
          <div>ক্যাটাগরি</div>
          <div>মূল্য</div>
          <div>স্ট্যাটাস</div>
          <div className="text-right">অ্যাকশন</div>
        </div>

        <div className="divide-y divide-gray-100">
          {packages.map((pkg) => (
            <div key={pkg.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_120px] p-4 md:items-center hover:bg-gray-50 transition-colors group gap-4 md:gap-0">
              <div>
                <div className="font-bold text-gray-900">{pkg.nameBn}</div>
                <div className="text-sm text-gray-500">{pkg.name}</div>
              </div>
              <div className="flex items-center">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  pkg.category === 'home' ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                )}>
                  {pkg.category === 'home' ? 'বাসা' : 'রিকশা'}
                </span>
              </div>
              <div className="font-bold text-gray-900">৳{pkg.price.toLocaleString()}</div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> অ্যাক্টিভ
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
              <p>কোনো প্যাকেজ পাওয়া যায়নি। প্রথমটি যোগ করুন!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
