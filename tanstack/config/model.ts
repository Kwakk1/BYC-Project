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
