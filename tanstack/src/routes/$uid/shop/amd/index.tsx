import { fetchPcBuilds } from "@/api/pcBuilds";
import { FormattedPrice } from "@/helper/currency";
import { useCartStore } from "@/utils/cart";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/$uid/shop/amd/")({
  loader: async () => {
    const pcBuilds = await fetchPcBuilds();

    return pcBuilds;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const pcBuilds = useLoaderData({ from: "/$uid/shop/amd/" });
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="product-grid">
      {pcBuilds
        .filter((build) => build.category === "AMD PC BUILD")
        .map((build) => (
          <div key={build.id} className="card">
            <div className="badge">AMD PC BUILD</div>
            <img src={build.image} alt="PC" className="hero-image" />
            <h2 className="product-title">{build.title}</h2>
            <ul className="specs">
              <li>🪟 {build.os}</li>
              <li>🧠 {build.cpu}</li>
              <li>🎮 {build.gpu}</li>
              <li>🖥️ {build.motherboard}</li>
              <li>⚡ {build.ram}</li>
              <li>💾 {build.storage}</li>
            </ul>
            <div className="price-box">
              <span className="save">
                Save {build.originalPrice - build.discount}
              </span>
              <div className="price">
                <span className="current-price">
                  {FormattedPrice(build.discount)}
                </span>
                <span className="original-price">
                  {FormattedPrice(build.originalPrice)}
                </span>
              </div>
            </div>
            <button className="buy-btn" onClick={() => addToCart(build)}>
              BUY
            </button>
          </div>
        ))}
    </div>
  );
}
