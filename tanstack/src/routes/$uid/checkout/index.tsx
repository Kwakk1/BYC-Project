import { FormattedPrice } from "@/helper/currency";
import { useCartStore } from "@/utils/cart";
import { useParams } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";

export const Route = createFileRoute("/$uid/checkout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useParams({ from: "/$uid/checkout/" });

  const cart = useCartStore((state) => state.cart);
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

  async function handlePurchaseSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Manually select both forms
    const billingForm = document.querySelector(
      'form[name="billingForm"]'
    ) as HTMLFormElement;
    const paymentForm = document.querySelector(
      'form[name="paymentForm"]'
    ) as HTMLFormElement;

    const billingData = new FormData(billingForm);
    const paymentData = new FormData(paymentForm);

    const fullName = `${billingData.get("firstName")} ${billingData.get("lastName")}`;

    const selectedPaymentMethod =
      paymentData.get("paynamics") ||
      paymentData.get("bankTransfer") ||
      paymentData.get("billEase") ||
      paymentData.get("gcash") ||
      paymentData.get("straightPayments");

    const invoiceData = {
      uid: user.uid,
      fullName,
      email: billingData.get("emailAddress"),
      address: {
        street: billingData.get("streetAddress"),
        city: billingData.get("townCity"),
        state: billingData.get("stateCountry"),
        zip: billingData.get("postCodeZip"),
        country: "Philippines",
      },
      contact: {
        mobile: billingData.get("mobile"),
        phone: billingData.get("phone"),
      },
      cart: cart.map((item) => ({
        ...item,
        price: item.discount,
        totalPrice: item.discount * item.quantity,
      })),
      total: totalCartValue,
      paymentMethod: selectedPaymentMethod,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "invoices"), invoiceData);
      alert("Purchase successful! Invoice stored.");
      clearCart();
    } catch (err) {
      console.error("Failed to store invoice:", err);
      alert("Something went wrong while saving the invoice.");
    }
  }

  return (
    <section style={{ padding: "110px" }} className="flex gap-5">
      <div
        style={{ padding: "20px" }}
        className="bg-white flex flex-1/2 flex-col gap-10"
      >
        <p className="text-4xl">Biling Details</p>
        <form name="billingForm">
          <div className="flex gap-10">
            <div className="flex w-full flex-col gap-1">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                style={{
                  border: "2px solid #90a1b9",
                  padding: "5px 10px 5px 10px",
                }}
              />
            </div>

            <div className="flex w-full flex-col gap-1">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                style={{
                  border: "2px solid #90a1b9",
                  padding: "5px 10px 5px 10px",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastName">Country / Region</label>
            <input
              type="text"
              name="lastName"
              style={{
                border: "2px solid #90a1b9",
                padding: "5px 10px 5px 10px",
              }}
              disabled
              defaultValue="Philippines"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="streetAddress">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              style={{
                border: "2px solid #90a1b9",
                padding: "5px 10px 5px 10px",
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="townCity">Town City</label>
            <input
              type="text"
              name="townCity"
              style={{
                border: "2px solid #90a1b9",
                padding: "5px 10px 5px 10px",
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="stateCountry">State / Country</label>
            <input
              type="text"
              name="stateCountry"
              style={{
                border: "2px solid #90a1b9",
                padding: "5px 10px 5px 10px",
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="postCodeZip">Postcode / ZIP</label>
            <input
              type="text"
              name="postCodeZip"
              style={{
                border: "2px solid #90a1b9",
                padding: "5px 10px 5px 10px",
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              name="mobile"
              style={{
                border: "2px solid #90a1b9",
                padding: "5px 10px 5px 10px",
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              style={{
                border: "2px solid #90a1b9",
                padding: "5px 10px 5px 10px",
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              name="emailAddress"
              style={{
                border: "2px solid #90a1b9",
                padding: "5px 10px 5px 10px",
              }}
            />
          </div>
        </form>
      </div>

      <div
        style={{ padding: "20px" }}
        className="bg-white flex-1/6 flex flex-col gap-10"
      >
        <p className="text-4xl">Your Order</p>
        <form
          name="paymentForm"
          onSubmit={handlePurchaseSubmit}
          className="flex flex-col h-full justify-between"
        >
          <div>
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "2px solid #777777",
                      paddingBottom: "10px",
                    }}
                    className="font-medium"
                  >
                    PRODUCT
                  </th>
                  <th
                    style={{
                      borderBottom: "2px solid #777777",
                      paddingRight: "50px",
                      paddingBottom: "10px",
                    }}
                    className="font-medium text-right"
                  >
                    SUBTOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((cart, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td
                      style={{ borderBottom: "2px solid #777777" }}
                      className="px-6 py-3"
                    >
                      <input
                        type="text"
                        name="pcTitle"
                        value={cart.title}
                        readOnly
                        style={{
                          pointerEvents: "none", // prevent interaction
                          border: "none", // remove border
                          background: "transparent", // make background look like plain text
                          color: "inherit", // inherit text color
                          font: "inherit", // inherit font styling
                          cursor: "default", // normal arrow cursor
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                      />
                    </td>
                    <td
                      style={{ borderBottom: "2px solid #777777" }}
                      className="px-6 py-3 text-blue-700"
                    >
                      <input
                        type="text"
                        name="pcPrice"
                        value={FormattedPrice(cart.discount)}
                        readOnly
                        className="text-right"
                        style={{
                          pointerEvents: "none", // prevent interaction
                          border: "none", // remove border
                          background: "transparent", // make background look like plain text
                          color: "inherit", // inherit text color
                          font: "inherit", // inherit font styling
                          cursor: "default", // normal arrow cursor
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between w-full">
              <p style={{ padding: "10px 0 10px 0" }}>TOTAL</p>
              <input
                type="text"
                name="pcPrice"
                value={FormattedPrice(totalCartValue)}
                readOnly
                className="text-right"
                style={{
                  paddingRight: "50px",
                  pointerEvents: "none", // prevent interaction
                  border: "none", // remove border
                  background: "transparent", // make background look like plain text
                  color: "inherit", // inherit text color
                  font: "inherit", // inherit font styling
                  cursor: "default", // normal arrow cursor
                }}
              />
            </div>
            <hr />
            <div className="flex">
              <input
                type="radio"
                name="paynamics"
                value="HTML"
                defaultChecked
              />
              <label style={{ padding: "10px 0px 10px 5px" }}>
                Paynamics Payment - Accepted Payements: (BDO and BPI Credit Card
                Installment), (Straight Payemnts Via Debit and Credit Card),
                (Over the counter ECPAY, Dragon pay SMpayment, Home Credit ETC.)
              </label>
            </div>
            <hr />
            <div className="flex">
              <input type="radio" name="bankTransfer" value="HTML" />
              <label style={{ padding: "10px 0px 10px 5px" }}>
                Direct bank transfer
              </label>
            </div>
            <hr />
            <div className="flex">
              <input type="radio" name="billEase" value="HTML" />
              <label style={{ padding: "10px 0px 10px 5px" }}>
                BillEase | Buy Now, Pay Later. No card required.
              </label>
            </div>
            <hr />
            <div className="flex">
              <input type="radio" name="gcash" value="HTML" />
              <label style={{ padding: "10px 0px 10px 5px" }}>
                Gcash via QR
              </label>
            </div>
            <hr />
            <div className="flex">
              <input type="radio" name="straightPayments" value="HTML" />
              <label style={{ padding: "10px 0px 10px 5px" }}>
                Straight Payments
              </label>
            </div>
            <hr />
          </div>

          <button
            style={{ padding: "8px", background: "#006aff" }}
            className="w-full"
          >
            <p className="text-lg text-white">Purchase</p>
          </button>
        </form>
      </div>
    </section>
  );
}
