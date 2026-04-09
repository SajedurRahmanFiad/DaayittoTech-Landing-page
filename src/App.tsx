import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sun, Battery, Zap, Settings, Building2, Home, Bike, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SolarPackage, Order, AdminSettings, ComponentConfig } from './types';

// Pages
import HomePage from './pages/HomePage';
import CustomizePage from './pages/CustomizePage';
import AdminPage from './pages/AdminPage';
import AdminPackageDetail from './pages/AdminPackageDetail';
import AdminLoginPage from './pages/AdminLoginPage';

const DEFAULT_PACKAGES: SolarPackage[] = [
  {
    id: '1',
    name: 'Basic Home Package',
    nameBn: 'বেসিক হোম প্যাকেজ',
    description: 'Perfect for small homes with 2 fans and 3 lights.',
    descriptionBn: '২টি ফ্যান এবং ৩টি লাইট চালানোর জন্য ছোট পরিবারের জন্য উপযুক্ত।',
    price: 15000,
    components: ['100W Panel', '50Ah Battery', 'Inverter'],
    componentsBn: ['১০০ ওয়াট প্যানেল', '৫০ অ্যাম্পিয়ার ব্যাটারি', 'ইনভার্টার'],
    category: 'home'
  },
  {
    id: '2',
    name: 'Rickshaw Power Pack',
    nameBn: 'রিকশা পাওয়ার প্যাক',
    description: 'Heavy duty battery and panel for electric rickshaws.',
    descriptionBn: 'ইলেকট্রিক রিকশার জন্য শক্তিশালী ব্যাটারি এবং প্যানেল।',
    price: 25000,
    components: ['250W Panel', '100Ah Battery', 'Charge Controller'],
    componentsBn: ['২৫০ ওয়াট প্যানেল', '১০০ অ্যাম্পিয়ার ব্যাটারি', 'চার্জ কন্ট্রোলার'],
    category: 'rickshaw'
  }
];

const DEFAULT_SETTINGS: AdminSettings = {
  costPerWatt: 100,
  componentConfigs: [
    { id: 'light', name: 'Light', nameBn: 'লাইট', type: 'variable', defaultWatts: 15, canEditWatts: true, canEditQuantity: true },
    { id: 'fan', name: 'Fan', nameBn: 'ফ্যান', type: 'variable', defaultWatts: 60, canEditWatts: true, canEditQuantity: true },
    { id: 'tv', name: 'TV', nameBn: 'টিভি', type: 'variable', defaultWatts: 80, canEditWatts: true, canEditQuantity: true },
    { id: 'fridge', name: 'Fridge', nameBn: 'ফ্রিজ', type: 'variable', defaultWatts: 200, canEditWatts: true, canEditQuantity: true },
    { id: 'inverter', name: 'Inverter', nameBn: 'ইনভার্টার', type: 'fixed', price: 5000, canEditWatts: false, canEditQuantity: true },
    { id: 'battery', name: 'Battery', nameBn: 'ব্যাটারি', type: 'fixed', price: 8000, canEditWatts: false, canEditQuantity: true },
  ]
};

export default function App() {
  const [packages, setPackages] = useState<SolarPackage[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Load Packages
    const savedPackages = localStorage.getItem('solar_packages');
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    } else {
      setPackages(DEFAULT_PACKAGES);
      localStorage.setItem('solar_packages', JSON.stringify(DEFAULT_PACKAGES));
    }

    // Load Orders
    const savedOrders = localStorage.getItem('solar_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    // Load Settings
    const savedSettings = localStorage.getItem('solar_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Load Auth
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const updatePackages = (newPackages: SolarPackage[]) => {
    setPackages(newPackages);
    localStorage.setItem('solar_packages', JSON.stringify(newPackages));
  };

  const updateOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('solar_orders', JSON.stringify(newOrders));
  };

  const updateSettings = (newSettings: AdminSettings) => {
    setSettings(newSettings);
    localStorage.setItem('solar_settings', JSON.stringify(newSettings));
  };

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  const addOrder = (order: Order) => {
    const newOrders = [order, ...orders];
    updateOrders(newOrders);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#FDFCF8] text-[#2D3436] font-sans">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E4E3E0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-orange-500 p-1.5 rounded-md group-hover:rotate-6 transition-transform">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-orange-600">দায়িত্ব.কম</span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-sm font-medium hover:text-orange-600 transition-colors">হোম</Link>
                <Link to="/customize" className="text-sm font-medium hover:text-orange-600 transition-colors">প্যাকেজ তৈরি করুন</Link>
                <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                  <Settings className="w-5 h-5 text-gray-500" />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
              >
                <div className="px-4 py-4 flex flex-col gap-4">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">হোম</Link>
                  <Link to="/customize" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">প্যাকেজ তৈরি করুন</Link>
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium flex items-center gap-2">
                    <Settings className="w-5 h-5" /> অ্যাডমিন প্যানেল
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage packages={packages} onOrder={addOrder} />} />
            <Route path="/customize" element={<CustomizePage settings={settings} onOrder={addOrder} />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/login" 
              element={isAdminAuthenticated ? <Navigate to="/admin" /> : <AdminLoginPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/admin/*" 
              element={
                isAdminAuthenticated ? (
                  <AdminPage 
                    packages={packages} 
                    onUpdatePackages={updatePackages}
                    orders={orders}
                    onUpdateOrders={updateOrders}
                    settings={settings}
                    onUpdateSettings={updateSettings}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/admin/login" />
                )
              } 
            />
            <Route path="/admin/add" element={isAdminAuthenticated ? <AdminPackageDetail onSave={(pkg) => updatePackages([...packages, pkg])} /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/edit/:id" element={isAdminAuthenticated ? <AdminPackageDetail packages={packages} onSave={(pkg) => updatePackages(packages.map(p => p.id === pkg.id ? pkg : p))} /> : <Navigate to="/admin/login" />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-[#141414] text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Sun className="w-6 h-6 text-orange-500" />
                  <span className="text-xl font-bold tracking-tight">দায়িত্ব.কম</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  আমরা গ্রাম এবং শহরের প্রতিটি ঘরে সাশ্রয়ী মূল্যে সৌর বিদ্যুৎ পৌঁছে দিতে কাজ করছি। আমাদের লক্ষ্য একটি সবুজ এবং উজ্জ্বল বাংলাদেশ।
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6">লিঙ্কসমূহ</h3>
                <ul className="space-y-4 text-gray-400 text-sm">
                  <li><Link to="/" className="hover:text-orange-500">হোম</Link></li>
                  <li><Link to="/customize" className="hover:text-orange-500">প্যাকেজ তৈরি করুন</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6">যোগাযোগ</h3>
                <p className="text-gray-400 text-sm">
                  ঢাকা, বাংলাদেশ<br />
                  ফোন: +৮৮০ ১২৩৪ ৫৬৭৮৯০<br />
                  ইমেইল: info@solarshakti.com
                </p>
              </div>
            </div>
            <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-xs">
              © ২০২৬ দায়িত্ব.কম। সর্বস্বত্ব সংরক্ষিত।
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
