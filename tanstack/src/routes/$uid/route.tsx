import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import "./styles.css";
import { doSignOut, getUser, initAuth } from "../../../config/auth";
import { seedDatabase } from "../../../config/seedDatabase";

export const Route = createFileRoute("/$uid")({
  beforeLoad: async () => {
    await initAuth();

    const user = getUser();

    if (!user) {
      throw redirect({ to: "/login-register" });
    }

    return { user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const user = useParams({ from: "/$uid" }); // Directly get the current user
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await doSignOut(); // Sign out the user
    navigate({ to: "/login-register" }); // Redirect to login/register page
  };

  async function handleSeedDatabase() {
    try {
      await seedDatabase();
      alert("Database seeded successfully!");
    } catch (error) {
      console.error("Error seeding database:", error);
      alert("Failed to seed the database. Check the console for details.");
    }
  }

  return (
    <div className="shop-page">
      <header>
        <nav className="navbar section-content">
          <a href="#" className="nav-logo">
            <h2 className="logo-text">🖥️ Build Your Computer</h2>
          </a>
          {/* <button onClick={handleSeedDatabase} className="nav-link">
            Seed Database
          </button> */}
          <ul className="nav-menu">
            <button id="menu-close-button" className="fas fa-times"></button>

            <Link
              to="/$uid/shop/amd"
              params={{ uid: user?.uid as string }}
              className="nav-link"
            >
              <li className="nav-item">Shop</li>
            </Link>

            <Link
              to="/$uid/shopping-cart"
              params={{ uid: user?.uid as string }}
              className="nav-link"
            >
              <li className="nav-item">🛒 Shopping Cart</li>
            </Link>
            {user ? (
              <>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Log In
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Sign Up
                  </a>
                </li>
              </>
            )}
          </ul>
          <button id="menu-open-button" className="fas fa-bars"></button>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
