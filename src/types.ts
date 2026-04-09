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
}

export interface CustomRequirement {
  items: ComponentItem[];
}
