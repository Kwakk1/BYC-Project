import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import type { CustomPcBuild, PcBuild } from "./model";

export const AllPcBuild: PcBuild[] = [
    {
        category: "AMD PC BUILD",
        title: "AMD Ryzen Pro Gaming PC",
        image: "/images/PC.png",
        os: "Windows 11 Home",
        cpu: "AMD Ryzen™ 7 7800X3D CPU",
        gpu: "AMD Radeon RX 7800 XT - 16GB",
        motherboard: "ASUS PRIME B650M-A AX6 II",
        ram: "32GB DDR5-6000MHz RAM",
        storage: "2TB Crucial M.2 NVMe SSD",
        discount: 107500,
        originalPrice: 125000,
    },
    {
        category: "AMD PC BUILD",
        title: "AMD Ryzen Pro Gaming PC",
        image: "/images/PC2.png",
        os: "Windows 11 Pro",
        cpu: "Intel Core i9-13900K",
        gpu: "NVIDIA RTX 4070 Ti - 12GB",
        motherboard: "MSI Z790-P DDR5 Motherboard",
        ram: "64GB DDR5-5600MHz RAM",
        storage: "4TB Samsung NVMe SSD",
        discount: 155000,
        originalPrice: 178000,
    },
    {
        category: "AMD PC BUILD",
        title: "AMD Ryzen Pro Gaming PC",
        image: "/images/PC3.png",
        os: "Windows 11 Home",
        cpu: "AMD Ryzen™ 5 5600G",
        gpu: "Radeon Vega 7 Integrated Graphics",
        motherboard: "Gigabyte B550M DS3H",
        ram: "16GB DDR4-3200MHz RAM",
        storage: "1TB Crucial NVMe SSD",
        discount: 36000,
        originalPrice: 41700,
    },
    {
        category: "AMD PC BUILD",
        title: "AMD Ryzen Pro Gaming PC",
        image: "/images/PC4.png",
        os: "Windows 11 Pro",
        cpu: "AMD Ryzen™ 9 7900X",
        gpu: "NVIDIA RTX 4080 - 16GB",
        motherboard: "ASUS ROG Crosshair X670E",
        ram: "64GB DDR5-6000MHz RAM",
        storage: "2TB Gen 4 NVMe SSD + 4TB HDD",
        discount: 195000,
        originalPrice: 222700,
    },
    {
        category: "INTEL PC BUILD",
        title: "INTEL Ryzen Pro Gaming PC",
        image: "/images/PC5.png",
        os: "Windows 11 Home",
        cpu: "Intel Core i9-13900K",
        gpu: "Radeon RX 7800 XT - 16GB",
        motherboard: "ASUS PRIME B650M-A AX6 II",
        ram: "32GB DDR5-6000MHz RAM",
        storage: "2TB Crucial M.2 NVMe SSD",
        discount: 107500,
        originalPrice: 125000,
    },
    {
        category: "INTEL PC BUILD",
        title: "INTEL Ryzen Pro Gaming PC",
        image: "/images/PC6.png",
        os: "Windows 11 Pro",
        cpu: "Intel Core i9-13900K",
        gpu: "NVIDIA RTX 4070 Ti - 12GB",
        motherboard: "MSI Z790-P DDR5 Motherboard",
        ram: "64GB DDR5-5600MHz RAM",
        storage: "4TB Samsung NVMe SSD",
        discount: 155000,
        originalPrice: 178000,
    },
    {
        category: "INTEL PC BUILD",
        title: "INTEL Ryzen Pro Gaming PC",
        image: "/images/PC7.png",
        os: "Windows 11 Home",
        cpu: "INTEL i5 13500HX",
        gpu: "NVIDIA RTX 4050 6GB",
        motherboard: "Gigabyte B550M DS3H",
        ram: "16GB DDR4-3200MHz RAM",
        storage: "1TB Crucial NVMe SSD",
        discount: 36000,
        originalPrice: 41700,
    },
    {
        category: "INTEL PC BUILD",
        title: "INTEL Ryzen Pro Gaming PC",
        image: "/images/PC8.png",
        os: "Windows 11 Pro",
        cpu: "INTEL i9 14500HX",
        gpu: "NVIDIA RTX 4080 - 16GB",
        motherboard: "ASUS ROG Crosshair X670E",
        ram: "64GB DDR5-6000MHz RAM",
        storage: "2TB Gen 4 NVMe SSD + 4TB HDD",
        discount: 195000,
        originalPrice: 222700,
    },
];

export const CustomPcBuildData: CustomPcBuild[] = [
  {
    cpu: {
      image: "/images/cpu.png",
      options: [
        { name: "Intel Core i3-12100", price: 6500 },
        { name: "Intel Core i5-12400F", price: 9800 },
        { name: "Intel Core i7-13700KF", price: 22500 },
        { name: "AMD Ryzen 3 4100", price: 4200 },
        { name: "AMD Ryzen 5 5600", price: 7000 },
        { name: "AMD Ryzen 7 5700X", price: 11500 },
        { name: "Intel Core i9-14900K", price: 35000 },
        { name: "AMD Ryzen 9 7900X", price: 29000 },
        { name: "Intel Core i5-14600K", price: 17800 },
        { name: "AMD Ryzen 5 7600", price: 13000 },
      ],
    },
    motherboard: {
      image: "/images/motherboard.png",
      options: [
        { name: "ASUS PRIME B660M-A", price: 7000 },
        { name: "MSI PRO B760M-A DDR4", price: 7500 },
        { name: "ASRock B550M Steel Legend", price: 6300 },
        { name: "Gigabyte B450M DS3H", price: 3700 },
        { name: "ASUS TUF Gaming B650-Plus", price: 11200 },
        { name: "MSI B550 Tomahawk", price: 8000 },
        { name: "ASUS ROG Strix B760-F", price: 13000 },
        { name: "Gigabyte X670 AORUS Elite AX", price: 15000 },
        { name: "MSI PRO Z790-A", price: 12500 },
        { name: "ASRock A520M-HVS", price: 2900 },
      ],
    },
    memory: {
      image: "/images/ram.png",
      options: [
        { name: "Corsair Vengeance LPX 8GB DDR4 3200MHz", price: 1700 },
        { name: "G.Skill Ripjaws V 16GB (2x8GB) DDR4", price: 3200 },
        { name: "Kingston Fury Beast 16GB DDR5 5600MHz", price: 4200 },
        { name: "TeamGroup T-Force Delta RGB 32GB DDR4", price: 5800 },
        { name: "Corsair Dominator Platinum RGB 32GB DDR5", price: 9500 },
        { name: "Crucial 8GB DDR4 2666MHz", price: 1500 },
        { name: "XPG Spectrix D50 16GB DDR4", price: 3000 },
        { name: "Patriot Viper Steel 16GB DDR4", price: 2900 },
        { name: "Lexar ARES RGB DDR5 32GB", price: 6500 },
        { name: "ADATA XPG Lancer RGB DDR5 16GB", price: 3900 },
      ],
    },
    videoCard: {
      image: "/images/gpu.png",
      options: [
        { name: "ASUS Dual RTX 3050", price: 14500 },
        { name: "Gigabyte GTX 1660 Super OC", price: 13800 },
        { name: "MSI Radeon RX 6600", price: 12500 },
        { name: "ZOTAC RTX 3060 Twin Edge", price: 18000 },
        { name: "PowerColor RX 6700 XT", price: 21500 },
        { name: "Palit RTX 4060 Dual", price: 17000 },
        { name: "ASUS ROG Strix RTX 4070", price: 33000 },
        { name: "Sapphire Pulse RX 7600", price: 18200 },
        { name: "Inno3D RTX 3080 iChill X4", price: 41000 },
        { name: "MSI RTX 4090 Suprim X", price: 106000 },
      ],
    },
    powerSupply: {
      image: "/images/psu.png",
      options: [
        { name: "Corsair CV450 450W 80+ Bronze", price: 2300 },
        { name: "Cooler Master MWE V2 550W", price: 2900 },
        { name: "Seasonic S12III 500W", price: 2700 },
        { name: "SilverStone Strider Essential 600W", price: 3200 },
        { name: "Thermaltake Smart RGB 500W", price: 2600 },
        { name: "FSP HV PRO 550W 80+", price: 2400 },
        { name: "Corsair RM750e 80+ Gold", price: 5700 },
        { name: "EVGA 600 BR 80+ Bronze", price: 3000 },
        { name: "DeepCool PK550D 80+", price: 2200 },
        { name: "ASUS TUF Gaming 750W", price: 6500 },
      ],
    },
    storage: {
      image: "/images/storage.png",
      options: [
        { name: "Kingston NV2 500GB NVMe", price: 1800 },
        { name: "Samsung 980 1TB NVMe", price: 3600 },
        { name: "Crucial BX500 240GB SSD", price: 1200 },
        { name: "WD Blue 1TB HDD", price: 2000 },
        { name: "Seagate Barracuda 2TB HDD", price: 2600 },
        { name: "TeamGroup MP33 512GB NVMe", price: 1700 },
        { name: "Adata SU650 240GB SSD", price: 1000 },
        { name: "Lexar NM620 1TB NVMe", price: 3100 },
        { name: "WD Black SN850X 2TB NVMe", price: 9500 },
        { name: "Samsung 870 EVO 1TB SSD", price: 4500 },
      ],
    },
    cpuCooler: {
      image: "/images/cooler.png",
      options: [
        { name: "DeepCool GAMMAXX 400", price: 1200 },
        { name: "Cooler Master Hyper 212 Black", price: 2000 },
        { name: "ID-Cooling SE-224-XT", price: 1100 },
        { name: "Noctua NH-U12S Redux", price: 2800 },
        { name: "be quiet! Pure Rock 2", price: 2600 },
        { name: "Thermaltake UX100 ARGB", price: 900 },
        { name: "DeepCool AK400", price: 1700 },
        { name: "Arctic Freezer 34 eSports", price: 2200 },
        { name: "Corsair iCUE H100i RGB Liquid", price: 6500 },
        { name: "NZXT Kraken X63", price: 8200 },
      ],
    },
    case: {
      image: "/images/computercase.png",
      options: [
        { name: "Tecware Nexus M", price: 1500 },
        { name: "Cooler Master MasterBox Q300L", price: 2300 },
        { name: "NZXT H510", price: 4000 },
        { name: "Phanteks Eclipse P360A", price: 3700 },
        { name: "Lian Li Lancool 205", price: 3000 },
        { name: "Thermaltake Versa H18", price: 2000 },
        { name: "SilverStone FARA R1", price: 2500 },
        { name: "Fractal Design Focus G", price: 2800 },
        { name: "Montech X3 Mesh", price: 2200 },
        { name: "Corsair 4000D Airflow", price: 4500 },
      ],
    },
  },
];

// Function to seed the database
export async function seedDatabase() {
  const buildsRef = collection(db, "pcBuilds");
  const customRef = collection(db, "customPcBuild");

  // Seed pre-built PC builds
  for (const build of AllPcBuild) {
    const docRef = await addDoc(buildsRef, build);
    console.log(`✅ Uploaded build: ${build.title} (ID: ${docRef.id})`);
  }

  // Seed custom PC parts (just taking the first object if you have only one set)
  if (CustomPcBuildData.length > 0) {
    const docRef = await addDoc(customRef, CustomPcBuildData[0]);
    console.log(`✅ Uploaded custom build data (ID: ${docRef.id})`);
  }

  console.log("🎉 All data seeded.");
}
