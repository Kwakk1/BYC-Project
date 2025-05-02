import { FormattedPrice } from "@/helper/currency";
import { useCartStore } from "@/utils/cart";
import { useCustomBuildStore } from "@/utils/customBuildStore";
import { useParams } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
import emailjs from "emailjs-com"; // Import EmailJS

export const Route = createFileRoute("/$uid/checkout/")({
    component: RouteComponent,
});

function RouteComponent() {
    const user = useParams({ from: "/$uid/checkout/" });

    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);

    const selectedComponents = useCustomBuildStore(
        (state) => state.selectedComponents
    );
    const clearBuild = useCustomBuildStore((state) => state.clearBuild);

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

    const customTotalPrice = Object.values(selectedComponents).reduce(
        (sum, component) => sum + component.price,
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

        // Validate the forms
        if (!billingForm.checkValidity() || !paymentForm.checkValidity()) {
            alert("Please fill out all required fields.");
            return;
        }

        const billingData = new FormData(billingForm);
        const paymentData = new FormData(paymentForm);

        const fullName = `${billingData.get("firstName")} ${billingData.get("lastName")}`;
        const email = billingData.get("email") as string;

        const selectedPaymentMethod =
            paymentData.get("paynamics") ||
            paymentData.get("bankTransfer") ||
            paymentData.get("billEase") ||
            paymentData.get("gcash") ||
            paymentData.get("straightPayments");

        if (!email) {
            alert("Email address is missing.");
            return;
        }

        const invoiceData = {
            uid: user.uid,
            fullName,
            email,
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
            customBuild: Object.entries(selectedComponents).map(
                ([key, component]) => ({
                    componentKey: key,
                    name: component.name,
                    price: component.price,
                })
            ),
            total: totalCartValue + customTotalPrice,
            paymentMethod: selectedPaymentMethod,
            createdAt: serverTimestamp(),
        };

        try {
            // Store invoice in Firestore
            const result = await addDoc(
                collection(db, "invoices"),
                invoiceData
            );
            console.log("Invoice stored with ID:", result);
            console.log("Invoice stored with ID:", result.id);

            if (!email) {
                alert("Email address is missing.");
                return;
            }

            // Send email using EmailJS
            const emailTemplateParams = {
                order_id: result.id,
                to_name: fullName,
                email: email, // Ensure this matches the template variable
                price: FormattedPrice(totalCartValue + customTotalPrice),
                payment_method: selectedPaymentMethod,
                cart_items: cart
                    .map((item) => `${item.title} (x${item.quantity})`)
                    .join(", "),
                custom_build: Object.entries(selectedComponents)
                    .map(
                        ([key, component]) =>
                            `${component.name} (${FormattedPrice(component.price)})`
                    )
                    .join(", "),
            };
            console.log(emailTemplateParams);

            await emailjs.send(
                "service_nwe8mgz",
                "template_uk9o6zz",
                emailTemplateParams,
                "JszHWtF69l_-7Fzea"
            );

            alert("Purchase successful! Invoice stored and email sent.");
            clearCart();
            if (Object.keys(selectedComponents).length > 0) {
                clearBuild();
            }
        } catch (err) {
            console.error("Failed to store invoice or send email:", err);
            alert(
                "Something went wrong while saving the invoice or sending the email."
            );
        }
    }

    return (
        <section style={{ padding: "110px" }} className="flex gap-5">
            <div
                style={{ padding: "20px" }}
                className="bg-white flex flex-1/2 flex-col gap-10"
            >
                <p className="text-4xl">Billing Details</p>
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
                                required
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
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="countryRegion">Country / Region</label>
                        <input
                            type="text"
                            name="countryRegion"
                            style={{
                                border: "2px solid #90a1b9",
                                padding: "5px 10px 5px 10px",
                            }}
                            disabled
                            defaultValue="Philippines"
                            required
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
                            required
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
                            required
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
                            required
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
                            required
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
                            required
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
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            style={{
                                border: "2px solid #90a1b9",
                                padding: "5px 10px 5px 10px",
                            }}
                            required
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
                                {/* Display items from the cart */}
                                {cart.map((cartItem, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td
                                            style={{
                                                borderBottom:
                                                    "2px solid #777777",
                                            }}
                                            className="px-6 py-3"
                                        >
                                            {cartItem.title}
                                        </td>
                                        <td
                                            style={{
                                                borderBottom:
                                                    "2px solid #777777",
                                            }}
                                            className=" text-blue-700"
                                        >
                                            {FormattedPrice(
                                                cartItem.discount *
                                                    cartItem.quantity
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {/* Display custom PC build components */}
                                {Object.entries(selectedComponents).map(
                                    ([key, component], index) => (
                                        <tr
                                            key={`custom-${index}`}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td
                                                style={{
                                                    borderBottom:
                                                        "2px solid #777777",
                                                }}
                                                className="px-6 py-3"
                                            >
                                                {key}: {component.name}
                                            </td>
                                            <td
                                                style={{
                                                    borderBottom:
                                                        "2px solid #777777",
                                                }}
                                                className="text-blue-700"
                                            >
                                                {FormattedPrice(
                                                    component.price
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>

                        {/* Display total price */}
                        <div className="flex justify-between w-full">
                            <p style={{ padding: "10px 0 10px 0" }}>TOTAL</p>
                            <p
                                className="text-right items-center flex"
                                style={{
                                    paddingRight: "60px",
                                    fontWeight: "bold",
                                }}
                            >
                                {FormattedPrice(
                                    totalCartValue + customTotalPrice
                                )}
                            </p>
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
                                Paynamics Payment - Accepted Payements: (BDO and
                                BPI Credit Card Installment), (Straight Payemnts
                                Via Debit and Credit Card), (Over the counter
                                ECPAY, Dragon pay SMpayment, Home Credit ETC.)
                            </label>
                        </div>
                        <hr />
                        <div className="flex">
                            <input
                                type="radio"
                                name="bankTransfer"
                                value="HTML"
                            />
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
                            <input
                                type="radio"
                                name="straightPayments"
                                value="HTML"
                            />
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
