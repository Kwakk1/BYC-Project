import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import type { PcBuild } from "./model";

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
    discount: 1929,
    originalPrice: 2229,
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
    discount: 2799,
    originalPrice: 3199,
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
    discount: 649,
    originalPrice: 749,
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
    discount: 3499,
    originalPrice: 3999,
  },
  {
    category: "INTEL PC BUILD",
    title: "INTEL Ryzen Pro Gaming PC",
    image: "/images/PC5.png",
    os: "Windows 11 Home",
    cpu: "INTEL Ryzen™ 7 7800X3D CPU",
    gpu: "INTEL Radeon RX 7800 XT - 16GB",
    motherboard: "ASUS PRIME B650M-A AX6 II",
    ram: "32GB DDR5-6000MHz RAM",
    storage: "2TB Crucial M.2 NVMe SSD",
    discount: 1929,
    originalPrice: 2229,
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
    discount: 2799,
    originalPrice: 3199,
  },
  {
    category: "INTEL PC BUILD",
    title: "INTEL Ryzen Pro Gaming PC",
    image: "/images/PC7.png",
    os: "Windows 11 Home",
    cpu: "INTEL Ryzen™ 5 5600G",
    gpu: "Radeon Vega 7 Integrated Graphics",
    motherboard: "Gigabyte B550M DS3H",
    ram: "16GB DDR4-3200MHz RAM",
    storage: "1TB Crucial NVMe SSD",
    discount: 649,
    originalPrice: 749,
  },
  {
    category: "INTEL PC BUILD",
    title: "INTEL Ryzen Pro Gaming PC",
    image: "/images/PC8.png",
    os: "Windows 11 Pro",
    cpu: "INTEL Ryzen™ 9 7900X",
    gpu: "NVIDIA RTX 4080 - 16GB",
    motherboard: "ASUS ROG Crosshair X670E",
    ram: "64GB DDR5-6000MHz RAM",
    storage: "2TB Gen 4 NVMe SSD + 4TB HDD",
    discount: 3499,
    originalPrice: 3999,
  },
];

// Function to seed the database
export async function seedDatabase() {
  const buildsRef = collection(db, "pcBuilds");

  for (const build of AllPcBuild) {
    const docRef = await addDoc(buildsRef, build);
    console.log(`✅ Uploaded: ${build.title} (ID: ${docRef.id})`);
  }

  console.log("🎉 All builds uploaded.");
}
