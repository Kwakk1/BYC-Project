import type { PcBuild } from "config/model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = PcBuild & { quantity: number };

type CartStore = {
  cart: CartItem[];
  addToCart: (pcBuild: PcBuild) => void;
  removeFromCart: (pcBuildId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (pcBuild) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === pcBuild.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === pcBuild.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            cart: [...state.cart, { ...pcBuild, quantity: 1 }],
          };
        }),
      removeFromCart: (pcBuildId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === pcBuildId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
      clearCart: () => {
        // Log before clearing to help with debugging
        console.log("Clearing cart from Zustand:", get().cart);

        // Clear Zustand state
        set({ cart: [] });

        // Remove the cart data from localStorage
        localStorage.removeItem("cart-storage");

        // Log after clearing to ensure that it worked
        console.log("Clearing cart completed:", get().cart);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
