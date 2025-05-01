import {
  createFileRoute,
  Link,
  Outlet,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/$uid/shop")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useParams({ from: "/$uid/shop" });

  return (
    <section className="shop-section-content">
      <div className="category-nav">
        <Link to="/$uid/shop/amd" params={{ uid: user.uid }}>
          <li className="category-btn">AMD PC BUILD</li>
        </Link>
        <Link to="/$uid/shop/intel" params={{ uid: user.uid }}>
          <li className="category-btn">INTEL PC BUILD</li>
        </Link>
        <Link to="/$uid/shop/custom" params={{ uid: user.uid }}>
          <li className="category-btn">CUSTOM PC BUILD</li>
        </Link>
      </div>

      <Outlet />
    </section>
  );
}
