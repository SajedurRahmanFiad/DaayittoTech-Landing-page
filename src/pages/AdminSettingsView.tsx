import React, { useState } from 'react';
import { Save, Settings, Info, Check, X, Plus, Trash2 } from 'lucide-react';
import { AdminSettings, ComponentConfig } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface AdminSettingsViewProps {
  settings: AdminSettings;
  onUpdate: (settings: AdminSettings) => void;
}

export default function AdminSettingsView({ settings, onUpdate }: AdminSettingsViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState<Partial<ComponentConfig>>({
    type: 'variable',
    canEditWatts: true,
    canEditQuantity: true,
    defaultWatts: 0,
    price: 0
  });

  const handleConfigChange = (id: string, field: keyof ComponentConfig, value: any) => {
    const newConfigs = settings.componentConfigs.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    );
    onUpdate({ ...settings, componentConfigs: newConfigs });
  };

  const removeIngredient = (id: string) => {
    if (confirm('Are you sure you want to remove this ingredient?')) {
      onUpdate({
        ...settings,
        componentConfigs: settings.componentConfigs.filter(c => c.id !== id)
      });
    }
  };

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.nameBn) {
      const config: ComponentConfig = {
        id: Date.now().toString(),
        name: newIngredient.name,
        nameBn: newIngredient.nameBn,
        type: newIngredient.type as 'variable' | 'fixed',
        defaultWatts: newIngredient.type === 'variable' ? newIngredient.defaultWatts : undefined,
        price: newIngredient.type === 'fixed' ? newIngredient.price : undefined,
        canEditWatts: newIngredient.type === 'variable' ? !!newIngredient.canEditWatts : false,
        canEditQuantity: !!newIngredient.canEditQuantity
      };
      onUpdate({
        ...settings,
        componentConfigs: [...settings.componentConfigs, config]
      });
      setIsModalOpen(false);
      setNewIngredient({
        type: 'variable',
        canEditWatts: true,
        canEditQuantity: true,
        defaultWatts: 0,
        price: 0
      });
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">সিস্টেম সেটিংস</h1>
          <p className="text-gray-500">ক্যালকুলেশন এবং কাস্টমাইজেশন অপশনগুলো এখান থেকে নিয়ন্ত্রণ করুন</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" /> নতুন উপাদান যোগ করুন
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pricing Rules */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-fit">
          <div className="bg-gray-50 border-b border-gray-200 p-6 flex items-center gap-3">
            <Settings className="text-orange-600 w-5 h-5" />
            <h2 className="font-bold">মূল্য নির্ধারণের নিয়ম</h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">প্রতি ওয়াট খরচ (টাকা)</label>
              <input 
                type="number"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                value={settings.costPerWatt}
                onChange={e => onUpdate({ ...settings, costPerWatt: Number(e.target.value) })}
              />
              <p className="text-[10px] text-gray-400 flex items-center gap-1">
                <Info className="w-3 h-3" /> কাস্টম প্যাকেজে প্রতি ওয়াটের জন্য এই মূল্য ধরা হবে।
              </p>
            </div>
          </div>
        </div>

        {/* Component Rules */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-6 flex items-center gap-3">
            <Settings className="text-orange-600 w-5 h-5" />
            <h2 className="font-bold">উপাদান তালিকা ও নিয়ম</h2>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">উপাদান</th>
                  <th className="px-4 py-3">ধরণ</th>
                  <th className="px-4 py-3">ডিফল্ট মান</th>
                  <th className="px-4 py-3 text-center">এডিট অপশন</th>
                  <th className="px-4 py-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {settings.componentConfigs.map((config) => (
                  <tr key={config.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-bold">{config.nameBn}</div>
                      <div className="text-[10px] text-gray-400 uppercase">{config.name}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${config.type === 'variable' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {config.type === 'variable' ? 'ওয়াট ভিত্তিক' : 'ফিক্সড প্রাইস'}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs">
                      {config.type === 'variable' ? `${config.defaultWatts}W` : `৳${config.price}`}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[9px] text-gray-400 uppercase">ওয়াট</span>
                          <button 
                            disabled={config.type === 'fixed'}
                            onClick={() => handleConfigChange(config.id, 'canEditWatts', !config.canEditWatts)}
                            className={`p-1.5 rounded-md transition-colors ${config.type === 'fixed' ? 'opacity-20 cursor-not-allowed' : config.canEditWatts ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                          >
                            {config.canEditWatts ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          </button>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[9px] text-gray-400 uppercase">সংখ্যা</span>
                          <button 
                            onClick={() => handleConfigChange(config.id, 'canEditQuantity', !config.canEditQuantity)}
                            className={`p-1.5 rounded-md transition-colors ${config.canEditQuantity ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                          >
                            {config.canEditQuantity ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button 
                        onClick={() => removeIngredient(config.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Ingredient Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold">নতুন উপাদান যোগ করুন</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">নাম (বাংলা)</label>
                    <input 
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="যেমন: ফ্যান"
                      value={newIngredient.nameBn || ''}
                      onChange={e => setNewIngredient({ ...newIngredient, nameBn: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">নাম (English)</label>
                    <input 
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="e.g. Fan"
                      value={newIngredient.name || ''}
                      onChange={e => setNewIngredient({ ...newIngredient, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">উপাদানের ধরণ</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setNewIngredient({ ...newIngredient, type: 'variable' })}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${newIngredient.type === 'variable' ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      ওয়াট ভিত্তিক
                    </button>
                    <button 
                      onClick={() => setNewIngredient({ ...newIngredient, type: 'fixed' })}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${newIngredient.type === 'fixed' ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      ফিক্সড প্রাইস
                    </button>
                  </div>
                </div>

                {newIngredient.type === 'variable' ? (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">ডিফল্ট ওয়াট</label>
                    <input 
                      type="number"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                      value={newIngredient.defaultWatts || ''}
                      onChange={e => setNewIngredient({ ...newIngredient, defaultWatts: Number(e.target.value) })}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">ফিক্সড মূল্য (টাকা)</label>
                    <input 
                      type="number"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                      value={newIngredient.price || ''}
                      onChange={e => setNewIngredient({ ...newIngredient, price: Number(e.target.value) })}
                    />
                  </div>
                )}

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-orange-600"
                      checked={newIngredient.canEditQuantity}
                      onChange={e => setNewIngredient({ ...newIngredient, canEditQuantity: e.target.checked })}
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">সংখ্যা পরিবর্তনযোগ্য</span>
                  </label>
                  {newIngredient.type === 'variable' && (
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 accent-orange-600"
                        checked={newIngredient.canEditWatts}
                        onChange={e => setNewIngredient({ ...newIngredient, canEditWatts: e.target.checked })}
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">ওয়াট পরিবর্তনযোগ্য</span>
                    </label>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  বাতিল
                </button>
                <button 
                  onClick={addIngredient}
                  disabled={!newIngredient.name || !newIngredient.nameBn}
                  className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors disabled:opacity-50 shadow-lg"
                >
                  যোগ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
