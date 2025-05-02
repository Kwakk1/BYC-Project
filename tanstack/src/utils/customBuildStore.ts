import { create } from "zustand";
import { persist } from "zustand/middleware";

type SelectedComponent = {
  name: string;
  price: number;
};

type CustomBuildStore = {
  selectedComponents: Record<string, SelectedComponent>;
  totalPrice: number;
  addComponent: (componentKey: string, component: SelectedComponent) => void;
  clearBuild: () => void;
};

export const useCustomBuildStore = create<CustomBuildStore>()(
  persist(
    (set) => ({
      selectedComponents: {},
      totalPrice: 0,
      addComponent: (componentKey, component) =>
        set((state) => {
          const updatedComponents = {
            ...state.selectedComponents,
            [componentKey]: component,
          };

          const updatedTotalPrice = Object.values(updatedComponents).reduce(
            (total, comp) => total + comp.price,
            0
          );

          return {
            selectedComponents: updatedComponents,
            totalPrice: updatedTotalPrice,
          };
        }),
      clearBuild: () =>
        set({
          selectedComponents: {},
          totalPrice: 0,
        }),
    }),
    {
      name: "custom-build-storage",
    }
  )
);
