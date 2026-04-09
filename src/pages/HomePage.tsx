import { motion } from 'motion/react';
import { Sun, Battery, Zap, Home, Bike, ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SolarPackage } from '../types';

interface HomePageProps {
  packages: SolarPackage[];
}

export default function HomePage({ packages }: HomePageProps) {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-orange-600">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=2000" 
            alt="Solar Panels" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-600/90 to-orange-800/95"></div>
        
        {/* Animated Sun Background Element */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-[120px] animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-orange-50 text-sm font-bold mb-6">
                <Zap className="w-4 h-4 text-yellow-300" /> লোডশেডিংমুক্ত জীবনের নিশ্চয়তা
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
                লোডশেডিংকে বলুন <span className="text-yellow-300">বিদায়</span>, সোলার আনুন <span className="text-yellow-300">সবাই</span>
              </h1>
              <p className="text-xl md:text-2xl text-orange-50 mb-10 leading-relaxed max-w-xl">
                বিদ্যুৎ থাকুক বা না থাকুক, আপনার ফ্যান আর লাইট চলবে সবসময়। দায়িত্ব.কম দিচ্ছে সবচেয়ে সাশ্রয়ী সোলার প্যাকেজ।
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="bg-white/20 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5 text-yellow-300" /></div>
                  <span className="font-medium">২৪ ঘণ্টা বিদ্যুৎ</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="bg-white/20 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5 text-yellow-300" /></div>
                  <span className="font-medium">০% বিদ্যুৎ বিল</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="bg-white/20 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5 text-yellow-300" /></div>
                  <span className="font-medium">সহজ কিস্তি সুবিধা</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="bg-white/20 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5 text-yellow-300" /></div>
                  <span className="font-medium">১০ বছরের ওয়ারেন্টি</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/customize" className="bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-xl shadow-xl hover:bg-orange-50 transition-all flex items-center justify-center gap-3 group">
                  প্যাকেজ তৈরি করুন <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+8801234567890" className="bg-orange-500/30 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-orange-500/50 transition-all flex items-center justify-center gap-3">
                  <PhoneCall className="w-6 h-6" /> কথা বলুন
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Solar Home" 
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 p-6 rounded-2xl shadow-xl z-20 rotate-[-3deg]">
                <p className="text-4xl font-black text-orange-900">৳৯,৯৯৯</p>
                <p className="text-sm font-bold text-orange-900/70 uppercase tracking-wider">থেকে শুরু</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features - Simplified for village users */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm text-center">
            <div className="bg-orange-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">কম খরচ</h3>
            <p className="text-gray-600">বিদ্যুৎ বিল বাঁচান এবং সাশ্রয়ী দামে সোলার কিনুন।</p>
          </div>
          <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm text-center">
            <div className="bg-green-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
              <Battery className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">ভালো ব্যাটারি</h3>
            <p className="text-gray-600">দীর্ঘদিন চলে এমন শক্তিশালী ব্যাটারি আমরা দেই।</p>
          </div>
          <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm text-center">
            <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
              <Sun className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">সহজ কিস্তি</h3>
            <p className="text-gray-600">অল্প অল্প করে টাকা পরিশোধের সুবিধা আছে।</p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">জনপ্রিয় প্যাকেজ</h2>
            <p className="text-gray-600">সরাসরি অর্ডার করতে নিচের যেকোনো একটি বেছে নিন।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div 
                key={pkg.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-orange-50 p-3 rounded-lg">
                      {pkg.category === 'home' ? <Home className="w-6 h-6 text-orange-600" /> : <Bike className="w-6 h-6 text-orange-600" />}
                    </div>
                    <span className="text-2xl font-bold text-orange-600">৳{pkg.price.toLocaleString()}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{pkg.nameBn}</h3>
                  <p className="text-gray-600 mb-8 text-sm leading-relaxed">{pkg.descriptionBn}</p>
                  
                  <div className="space-y-3">
                    {pkg.componentsBn.map((comp, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {comp}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 pt-0">
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-bold transition-colors text-lg">
                    অর্ডার করুন
                  </button>
                </div>
              </div>
            ))}

            {/* Custom CTA Card */}
            <div className="bg-yellow-400 p-8 rounded-xl flex flex-col justify-center items-center text-center shadow-sm">
              <Sun className="w-16 h-16 text-yellow-900 mb-6" />
              <h3 className="text-2xl font-bold text-yellow-900 mb-4">নিজের মতো বানান</h3>
              <p className="text-yellow-900/80 mb-8">আপনার কয়টি ফ্যান বা লাইট লাগবে তা আমাদের জানান।</p>
              <Link to="/customize" className="w-full bg-yellow-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-black transition-colors text-lg">
                শুরু করুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-green-50 border border-green-100 p-8 md:p-12 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">বুঝতে সমস্যা হচ্ছে?</h2>
            <p className="text-green-800">আমাদের কল করুন অথবা হোয়াটসঅ্যাপে মেসেজ দিন। আমরা আপনাকে সাহায্য করব।</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a href="tel:+8801234567890" className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-center hover:bg-green-700 transition-colors">
              কল করুন
            </a>
            <a href="https://wa.me/8801234567890" className="bg-white text-green-600 border border-green-200 px-8 py-4 rounded-lg font-bold text-center hover:bg-green-50 transition-colors">
              হোয়াটসঅ্যাপ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
