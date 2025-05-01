import { FormattedPrice } from "@/helper/currency";
import { useCartStore } from "@/utils/cart";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
// import { getUser } from "config/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/$uid/shopping-cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useParams({ from: "/$uid/shopping-cart/" });

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  // Ensure that Zustand state and localStorage are in sync when the page loads
  useEffect(() => {
    const savedCart = localStorage.getItem("cart-storage");

    if (!savedCart) {
      // Reset Zustand cart state if localStorage is empty or corrupted
      useCartStore.setState({ cart: [] });
    }
  }, []);

  const totalCartValue = cart.reduce(
    (sum, item) => sum + item.discount * item.quantity,
    0
  );

  return (
    <div
      style={{ paddingBottom: "50px" }}
      className="shop-section-content flex flex-col gap-10"
    >
      <p className="text-white text-5xl">SHOPPING CART</p>
      {cart.length === 0 ? (
        <div className="bg-white w-full text-2xl text-center py-5">
          Your cart is empty.
        </div>
      ) : (
        <section className="flex justify-between gap-10">
          <div className="flex flex-10/12 flex-col gap-10">
            <table className="table-auto w-full h-fit bg-white text-left border-collapse border border-gray-300">
              <thead className="bg-blue-100 px-10">
                <tr>
                  <th
                    style={{ padding: "20px" }}
                    className="font-medium text-2xl text-gray-700"
                  >
                    PRODUCT
                  </th>
                  <th
                    style={{ padding: "20px" }}
                    className="font-medium text-2xl text-gray-700"
                  >
                    PRICE
                  </th>
                  <th
                    style={{ padding: "20px" }}
                    className="font-medium text-2xl text-gray-700"
                  >
                    QUANTITY
                  </th>
                  <th
                    style={{ padding: "20px" }}
                    className="font-medium text-2xl text-gray-700"
                  >
                    SUBTOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: "20px" }} className="text-xl">
                      {item.title}
                    </td>
                    <td style={{ padding: "20px" }} className="text-xl">
                      {FormattedPrice(item.discount)}
                    </td>
                    <td
                      style={{ padding: "20px" }}
                      className="items-center flex text-xl gap-5"
                    >
                      <p
                        className="nav-item cursor-pointer"
                        onClick={() => removeFromCart(item.id as string)}
                      >
                        -
                      </p>
                      <p className="nav-item">{item.quantity}</p>
                      <p
                        className="nav-item cursor-pointer"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </p>
                    </td>
                    <td style={{ padding: "20px" }} className="text-xl">
                      {FormattedPrice(item.discount * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={clearCart}>
              <p style={{ padding: "10px" }} className="bg-white text-xl">
                Clear all
              </p>
            </button>
          </div>

          <div
            style={{ padding: "30px" }}
            className="flex-1/4 flex flex-col gap-10 bg-white"
          >
            <p className="text-xl">Cart Totals</p>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{FormattedPrice(totalCartValue)}</p>
            </div>
            <p>Shipping</p>
            <p>Deliver to Store</p>
            <div>
              <p>Shipping options will be updated during checkout</p>
              <u className="text-blue-500">Calculate shipping</u>
            </div>
            <p>
              Choose a store for picking up your order on the Checkout page.
            </p>

            <div className="flex justify-between text-xl">
              <p>Total</p>
              <p>{FormattedPrice(totalCartValue)}</p>
            </div>

            <div className="flex flex-col">
              <Link
                to="/$uid/checkout"
                params={{ uid: user.uid }}
                style={{ padding: "8px" }}
                className="bg-blue-500 text-center"
              >
                <p className="text-white text-lg">Proceed to Checkout</p>
              </Link>
              <p
                style={{ padding: "8px" }}
                className="bg-slate-300 text-center text-blue-500 text-lg"
              >
                Print
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
