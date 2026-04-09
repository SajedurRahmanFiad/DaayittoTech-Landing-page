import React, { useState } from 'react';
import { ShoppingBag, Eye, Trash2, CheckCircle2, Clock, Package } from 'lucide-react';
import { Order } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface AdminOrdersViewProps {
  orders: Order[];
  onUpdate: (orders: Order[]) => void;
}

export default function AdminOrdersView({ orders, onUpdate }: AdminOrdersViewProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const updateStatus = (id: string, status: Order['status']) => {
    onUpdate(orders.map(o => o.id === id ? { ...o, status } : o));
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  const deleteOrder = (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      onUpdate(orders.filter(o => o.id !== id));
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">অর্ডার ম্যানেজমেন্ট</h1>
        <p className="text-gray-500">আপনার গ্রাহকদের অর্ডারগুলো এখান থেকে পরিচালনা করুন</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="hidden md:grid grid-cols-[1.5fr_1.5fr_1fr_1fr_120px] bg-gray-50 border-b border-gray-200 text-[11px] uppercase tracking-wider p-4 font-bold text-gray-500">
          <div>গ্রাহকের নাম</div>
          <div>প্যাকেজ</div>
          <div>মূল্য</div>
          <div>স্ট্যাটাস</div>
          <div className="text-right">অ্যাকশন</div>
        </div>

        <div className="divide-y divide-gray-100">
          {orders.map((order) => (
            <div key={order.id} className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr_1fr_120px] p-4 md:items-center hover:bg-gray-50 transition-colors group gap-4 md:gap-0">
              <div>
                <div className="font-bold text-gray-900">{order.customerName}</div>
                <div className="text-sm text-gray-500">{order.phone}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">{order.packageName || 'কাস্টম প্যাকেজ'}</div>
                <div className="text-[10px] text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="font-bold text-gray-900">৳{order.totalPrice.toLocaleString()}</div>
              <div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit",
                  order.status === 'draft' ? "bg-gray-100 text-gray-600" :
                  order.status === 'processing' ? "bg-blue-100 text-blue-700" :
                  "bg-green-100 text-green-700"
                )}>
                  {order.status === 'draft' && <Clock className="w-3 h-3" />}
                  {order.status === 'processing' && <Package className="w-3 h-3" />}
                  {order.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                  {order.status === 'draft' ? 'ড্রাফট' : order.status === 'processing' ? 'প্রসেসিং' : 'সম্পন্ন'}
                </span>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setSelectedOrder(order)}
                  className="p-2 hover:bg-orange-50 text-orange-600 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteOrder(order.id)}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="p-20 text-center text-gray-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>এখনো কোনো অর্ডার আসেনি।</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold">অর্ডার ডিটেইলস</h2>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <Clock className="w-5 h-5 text-gray-500 rotate-45" />
                </button>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">গ্রাহকের তথ্য</h3>
                    <div className="space-y-1">
                      <p className="font-bold text-lg">{selectedOrder.customerName}</p>
                      <p className="text-gray-600">{selectedOrder.phone}</p>
                      <p className="text-gray-600 text-sm">{selectedOrder.address}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">অর্ডার স্ট্যাটাস</h3>
                    <div className="flex flex-wrap gap-2">
                      {(['draft', 'processing', 'completed'] as Order['status'][]).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(selectedOrder.id, s)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                            selectedOrder.status === s 
                              ? "bg-orange-600 text-white shadow-md" 
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          )}
                        >
                          {s === 'draft' ? 'ড্রাফট' : s === 'processing' ? 'প্রসেসিং' : 'সম্পন্ন'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">প্যাকেজ ডিটেইলস</h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-lg">{selectedOrder.packageName || 'কাস্টম প্যাকেজ'}</span>
                      <span className="font-bold text-orange-600 text-xl">৳{selectedOrder.totalPrice.toLocaleString()}</span>
                    </div>
                    {selectedOrder.customItems && (
                      <div className="space-y-2 pt-4 border-t border-gray-200">
                        {selectedOrder.customItems.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.nameBn} ({item.count}টি)</span>
                            <span className="font-medium">{item.watts}W</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {selectedOrder.additionalInfo && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">অতিরিক্ত তথ্য</h3>
                    <p className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-900 italic">
                      "{selectedOrder.additionalInfo}"
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors"
                >
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
