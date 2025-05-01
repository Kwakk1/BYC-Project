import type { PcBuild } from "../../config/model";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchPcBuilds() {
  const buildsRef = collection(db, "pcBuilds");
  const snapshot = await getDocs(buildsRef);
  const builds = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as PcBuild),
  }));
  return builds;
}
