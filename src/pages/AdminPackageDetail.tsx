import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Package } from 'lucide-react';
import { SolarPackage } from '../types';

interface AdminPackageDetailProps {
  packages?: SolarPackage[];
  onSave: (pkg: SolarPackage) => void;
}

export default function AdminPackageDetail({ packages, onSave }: AdminPackageDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState<SolarPackage>({
    id: Date.now().toString(),
    name: '',
    nameBn: '',
    description: '',
    descriptionBn: '',
    price: 0,
    components: [],
    componentsBn: [],
    category: 'home'
  });

  useEffect(() => {
    if (id && packages) {
      const existing = packages.find(p => p.id === id);
      if (existing) setPkg(existing);
    }
  }, [id, packages]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(pkg);
    navigate('/admin');
  };

  const addComponent = () => {
    setPkg({
      ...pkg,
      components: [...pkg.components, ''],
      componentsBn: [...pkg.componentsBn, '']
    });
  };

  const updateComponent = (index: number, val: string, isBn: boolean) => {
    const key = isBn ? 'componentsBn' : 'components';
    const newList = [...pkg[key]];
    newList[index] = val;
    setPkg({ ...pkg, [key]: newList });
  };

  const removeComponent = (index: number) => {
    setPkg({
      ...pkg,
      components: pkg.components.filter((_, i) => i !== index),
      componentsBn: pkg.componentsBn.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Packages
        </button>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-6">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <Package className="text-orange-600" />
              {id ? 'Edit Package' : 'Add New Package'}
            </h1>
          </div>

          <form onSubmit={handleSave} className="p-8 space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">প্যাকেজের নাম (বাংলা)</label>
                <input 
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                  value={pkg.nameBn}
                  onChange={e => setPkg({ ...pkg, nameBn: e.target.value, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">ক্যাটাগরি</label>
                <select 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                  value={pkg.category}
                  onChange={e => setPkg({ ...pkg, category: e.target.value as any })}
                >
                  <option value="home">Home</option>
                  <option value="rickshaw">Rickshaw</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">মূল্য (টাকা)</label>
                <input 
                  type="number"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                  value={pkg.price}
                  onChange={e => setPkg({ ...pkg, price: Number(e.target.value) })}
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">বিস্তারিত বিবরণ (বাংলা)</label>
              <textarea 
                required
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                value={pkg.descriptionBn}
                onChange={e => setPkg({ ...pkg, descriptionBn: e.target.value, description: e.target.value })}
              />
            </div>

            {/* Components */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">প্যাকেজের উপাদানসমূহ (বাংলা)</label>
                <button 
                  type="button"
                  onClick={addComponent}
                  className="text-orange-600 text-sm font-bold flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-4 h-4" /> উপাদান যোগ করুন
                </button>
              </div>
              
              <div className="space-y-3">
                {pkg.componentsBn.map((_, index) => (
                  <div key={index} className="flex gap-3 items-start bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex-grow">
                      <input 
                        placeholder="যেমন: ১০০ ওয়াট প্যানেল"
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                        value={pkg.componentsBn[index]}
                        onChange={e => updateComponent(index, e.target.value, true)}
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeComponent(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
              <button 
                type="button"
                onClick={() => navigate('/admin')}
                className="px-6 py-3 rounded-lg font-bold text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-orange-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-lg flex items-center gap-2"
              >
                <Save className="w-5 h-5" /> Save Package
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
