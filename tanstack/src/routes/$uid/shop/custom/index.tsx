import { fetchCustomPcBuilds } from "@/api/pcBuilds";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useCustomBuildStore } from "@/utils/customBuildStore";
import { use, useState } from "react";
import { FormattedPrice } from "@/helper/currency";

export const Route = createFileRoute("/$uid/shop/custom/")({
  loader: async () => {
    const customPcBuilds = await fetchCustomPcBuilds();
    return customPcBuilds;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const customPcBuilds = useLoaderData({ from: "/$uid/shop/custom/" });

  const totalPrice = useCustomBuildStore((state) => state.totalPrice);
  const addComponent = useCustomBuildStore((state) => state.addComponent);
  const clearBuild = useCustomBuildStore((state) => state.clearBuild);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  function toggleDropdown(dropdownId: string) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.classList.toggle("show");
    }
  }

  function handleSelect(
    componentKey: string,
    optionName: string,
    price: number
  ) {
    setSelectedOptions((prev) => ({
      ...prev,
      [componentKey]: optionName,
    }));

    // Add the selected component to Zustand store
    addComponent(componentKey, { name: optionName, price });
  }

  return (
    <section className="custom-pc-section" style={{ paddingBottom: "50px" }}>
      <div className="section-content">
        <h1 className="builder-title">CUSTOM PC BUILDER</h1>

        <form className="builder-container">
          <div className="builder-left">
            {customPcBuilds.map((custom) => (
              <div key={custom.id} className="custom-build gap-5 flex flex-col">
                {Object.entries(custom).map(([key, value]) => {
                  if (key === "id") return null;

                  if (
                    value &&
                    typeof value === "object" &&
                    "image" in value &&
                    "options" in value
                  ) {
                    const title = key.replace(/([A-Z])/g, " $1").toUpperCase();

                    return (
                      <div key={key} className="part-selection">
                        <div className="part-icons">
                          <img
                            src={value.image}
                            alt={title}
                            className="part-icon"
                          />
                        </div>
                        <div className="dropdown-container w-full relative">
                          <div className="dropdown relative w-full">
                            <div
                              className="dropdown-select w-full px-5 py-3 bg-white border-none rounded-md cursor-pointer text-lg font-bebas flex justify-between items-center relative"
                              onClick={() =>
                                toggleDropdown(`${key}-dropdown-${custom.id}`)
                              }
                            >
                              {selectedOptions[key] || title}
                            </div>
                            <div
                              id={`${key}-dropdown-${custom.id}`}
                              className="dropdown-menu hidden absolute top-full left-0 right-0 bg-white rounded-b-md z-10 max-h-52 overflow-y-auto shadow-md"
                            >
                              {value.options.map((item, index) => (
                                <div
                                  key={index}
                                  className="dropdown-item px-5 py-3 cursor-pointer font-poppins text-sm hover:bg-gray-100 flex items-center gap-3"
                                  onClick={() =>
                                    handleSelect(key, item.name, item.price)
                                  }
                                >
                                  <span>
                                    {item.name} - ₱{item.price}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            ))}
          </div>

          <div className="cart-container">
            <div className="cart-total">
              <span>Total:</span>
              <span>₱{totalPrice.toLocaleString()}</span>
            </div>
            <button
              type="button"
              className="cart-btn add-btn"
              onClick={() => {
                alert("Custom build added to cart!");
              }}
            >
              Add to cart
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
