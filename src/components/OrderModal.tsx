import React, { useState } from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OrderFormData) => void;
  packageName?: string;
  price: number;
}

export interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  additionalInfo: string;
}

export default function OrderModal({ isOpen, onClose, onSubmit, packageName, price }: OrderModalProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    address: '',
    additionalInfo: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="relative p-6 border-b border-gray-100">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">অর্ডার কনফার্ম করুন</h2>
          <p className="text-gray-500 text-sm mt-1">আপনার তথ্য দিন, আমরা আপনার সাথে যোগাযোগ করব।</p>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-4"
              >
                <div className="bg-orange-50 p-4 rounded-xl mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-orange-800 font-medium">{packageName || 'কাস্টম প্যাকেজ'}</span>
                    <span className="text-orange-900 font-bold text-lg">৳{price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">আপনার নাম *</label>
                  <input 
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="যেমন: মোঃ রহিম"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">ফোন নম্বর *</label>
                  <input 
                    required
                    type="tel"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="যেমন: ০১৭xxxxxxxx"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">ঠিকানা *</label>
                  <textarea 
                    required
                    rows={2}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">অতিরিক্ত তথ্য (ঐচ্ছিক)</label>
                  <textarea 
                    rows={2}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="অন্য কিছু জানাতে চাইলে এখানে লিখুন"
                    value={formData.additionalInfo}
                    onChange={e => setFormData({ ...formData, additionalInfo: e.target.value })}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors shadow-lg flex items-center justify-center gap-2 mt-6"
                >
                  <Send className="w-5 h-5" /> অর্ডার সম্পন্ন করুন
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">অর্ডার সফল হয়েছে!</h3>
                <p className="text-gray-600 mb-8">
                  ধন্যবাদ {formData.name}। আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করব।
                </p>
                <button 
                  onClick={onClose}
                  className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors"
                >
                  বন্ধ করুন
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
