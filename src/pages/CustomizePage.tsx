import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, Fan, Lightbulb, Smartphone, Tv, Plus, Minus, ArrowRight, CheckCircle2, PhoneCall, MessageCircle, Trash2 } from 'lucide-react';
import { ComponentItem, AdminSettings, Order } from '../types';
import OrderModal, { OrderFormData } from '../components/OrderModal';

interface CustomizePageProps {
  settings: AdminSettings;
  onOrder: (order: Order) => void;
}

export default function CustomizePage({ settings, onOrder }: CustomizePageProps) {
  const [items, setItems] = useState<ComponentItem[]>([]);
  const [customName, setCustomName] = useState('');
  const [customWatts, setCustomWatts] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setItems(settings.componentConfigs.map(config => ({
      id: config.id,
      name: config.name,
      nameBn: config.nameBn,
      watts: config.defaultWatts || 0,
      count: 0,
      type: config.type,
      price: config.price
    })));
  }, [settings]);

  const updateCount = (id: string, delta: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
    ));
  };

  const updateWatts = (id: string, watts: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, watts: Math.max(0, watts) } : item
    ));
  };

  const addCustomItem = () => {
    if (customName && customWatts > 0) {
      const newItem: ComponentItem = {
        id: Date.now().toString(),
        name: customName,
        nameBn: customName,
        watts: customWatts,
        count: 1,
        isCustom: true,
        type: 'variable'
      };
      setItems([...items, newItem]);
      setCustomName('');
      setCustomWatts(0);
    }
  };

  const removeCustomItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalWatts = items.reduce((acc, item) => acc + (item.type === 'variable' ? (item.watts * item.count) : 0), 0);
  
  const variableCost = totalWatts * settings.costPerWatt;
  const fixedCost = items.reduce((acc, item) => acc + (item.type === 'fixed' ? ((item.price || 0) * item.count) : 0), 0);
  const estimatedPrice = variableCost + fixedCost;

  const handleOrderSubmit = (formData: OrderFormData) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      additionalInfo: formData.additionalInfo,
      customItems: items.filter(i => i.count > 0),
      totalPrice: estimatedPrice,
      status: 'draft',
      createdAt: new Date().toISOString()
    };

    onOrder(newOrder);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <OrderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOrderSubmit}
        price={estimatedPrice}
      />

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">নিজের সোলার প্যাকেজ তৈরি করুন</h1>
        <p className="text-gray-600">আপনার কী কী প্রয়োজন তা নিচে যোগ করুন।</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 border border-gray-200 rounded-xl space-y-6 shadow-sm">
            {items.map((item) => {
              const config = settings.componentConfigs.find(c => c.id === item.id);
              return (
                <div key={item.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-50 p-3 rounded-lg">
                        {item.id === 'fan' ? <Fan className="w-6 h-6 text-orange-600" /> :
                         item.id === 'light' ? <Lightbulb className="w-6 h-6 text-orange-600" /> :
                         item.id === 'tv' ? <Tv className="w-6 h-6 text-orange-600" /> :
                         <Sun className="w-6 h-6 text-orange-600" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{item.nameBn}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {item.type === 'fixed' ? (
                            <span className="text-sm font-bold text-orange-600">৳{item.price?.toLocaleString()}</span>
                          ) : (
                            <>
                              {(!config || config.canEditWatts) ? (
                                <input 
                                  type="number" 
                                  value={item.watts}
                                  onChange={(e) => updateWatts(item.id, Number(e.target.value))}
                                  className="w-16 border border-gray-200 rounded px-1 text-sm font-mono"
                                />
                              ) : (
                                <span className="text-sm font-mono font-bold">{item.watts}</span>
                              )}
                              <span className="text-xs text-gray-500">ওয়াট</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="flex items-center gap-4">
                        {(!config || config.canEditQuantity) ? (
                          <>
                            <button onClick={() => updateCount(item.id, -1)} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
                            <span className="w-6 text-center font-bold text-xl">{item.count}</span>
                            <button onClick={() => updateCount(item.id, 1)} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
                          </>
                        ) : (
                          <span className="font-bold text-xl">{item.count}টি</span>
                        )}
                      </div>
                      {item.isCustom && (
                        <button onClick={() => removeCustomItem(item.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add Custom Item */}
            <div className="pt-6 border-t border-gray-100">
              <h4 className="font-bold mb-4 text-sm text-gray-500 uppercase tracking-wider">অন্য কিছু যোগ করুন</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  placeholder="জিনিসের নাম (যেমন: ফ্রিজ)"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="flex-grow border border-gray-200 rounded-lg px-4 py-2 text-sm"
                />
                <input 
                  type="number"
                  placeholder="ওয়াট"
                  value={customWatts || ''}
                  onChange={(e) => setCustomWatts(Number(e.target.value))}
                  className="sm:w-24 border border-gray-200 rounded-lg px-4 py-2 text-sm"
                />
                <button 
                  onClick={addCustomItem}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> যোগ করুন
                </button>
              </div>
            </div>
          </div>

          {/* Help/Support */}
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 text-center sm:text-left">
            <h3 className="font-bold text-orange-900 mb-2">সাহায্য প্রয়োজন?</h3>
            <p className="text-sm text-orange-800 mb-4">আপনি যদি বুঝতে না পারেন আপনার কী লাগবে, তবে আমাদের সাথে সরাসরি কথা বলুন।</p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+8801234567890" className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                <PhoneCall className="w-4 h-4" /> কল করুন
              </a>
              <a href="https://wa.me/8801234567890" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                <MessageCircle className="w-4 h-4" /> হোয়াটসঅ্যাপ
              </a>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-gray-900 text-white p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Sun className="text-yellow-400" /> আপনার প্যাকেজ
            </h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-gray-400">মোট বিদ্যুৎ প্রয়োজন</span>
                <span className="font-bold text-xl">{totalWatts} ওয়াট</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">আনুমানিক খরচ</span>
                <span className="text-3xl font-bold text-orange-500">৳{estimatedPrice.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              disabled={totalWatts === 0}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              অর্ডার কনফার্ম করুন <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
