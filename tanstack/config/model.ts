export interface PcBuild {
  id?: string;
  category: "AMD PC BUILD" | "INTEL PC BUILD";
  image: string;
  title: string;
  os: string;
  cpu: string;
  gpu: string;
  motherboard: string;
  ram: string;
  storage: string;
  discount: number;
  originalPrice: number;
}

export interface ComponentGroup {
  image: string;
  options: {
    name: string;
    price: number;
  }[];
}

export interface CustomPcBuild {
  id?: string;
  cpu: ComponentGroup;
  motherboard: ComponentGroup;
  memory: ComponentGroup;
  videoCard: ComponentGroup;
  powerSupply: ComponentGroup;
  storage: ComponentGroup;
  cpuCooler: ComponentGroup;
  case: ComponentGroup;
}
