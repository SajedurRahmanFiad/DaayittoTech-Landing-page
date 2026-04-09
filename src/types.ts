export interface SolarPackage {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  price: number;
  components: string[];
  componentsBn: string[];
  category: 'home' | 'rickshaw';
}

export interface ComponentItem {
  id: string;
  name: string;
  nameBn: string;
  watts: number;
  count: number;
  isCustom?: boolean;
  type?: 'variable' | 'fixed';
  price?: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  additionalInfo: string;
  packageId?: string;
  packageName?: string;
  customItems?: ComponentItem[];
  totalPrice: number;
  status: 'draft' | 'processing' | 'completed';
  createdAt: string;
}

export interface ComponentConfig {
  id: string;
  name: string;
  nameBn: string;
  type: 'variable' | 'fixed';
  defaultWatts?: number;
  price?: number;
  canEditWatts: boolean;
  canEditQuantity: boolean;
}

export interface AdminSettings {
  costPerWatt: number;
  componentConfigs: ComponentConfig[];
}
