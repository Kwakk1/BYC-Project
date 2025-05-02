import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { doSignOut, getUser } from "../../config/auth";
import { seedDatabase } from "../../config/seedDatabase";

export const Route = createFileRoute("/")({
    component: () => <RouteComponent />, // or a loading spinner if you want
});

function RouteComponent() {
    const user = getUser(); // Directly get the current user
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
            alert(
                "Failed to seed the database. Check the console for details."
            );
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
                    </button>  */}
                    <ul className="nav-menu">
                        <button
                            id="menu-close-button"
                            className="fas fa-times"
                        ></button>

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
                                    <button
                                        className="nav-link"
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/login-register"
                                        className="nav-link"
                                    >
                                        Log In
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="/login-register"
                                        className="nav-link"
                                    >
                                        Sign up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <button
                        id="menu-open-button"
                        className="fas fa-bars"
                    ></button>
                </nav>
            </header>
            <section style={{ paddingTop: "50px" }} className="hero-section">
                <div className="section-content">
                    <div className="hero-details">
                        <h2 className="title">
                            Build Your Dream PC here at BYC!
                        </h2>
                        <h3 className="subtitle">
                            Custom-Built PCs for Every Need — Power,
                            Performance, Precision!
                        </h3>
                        <p className="description">
                            At BYC, we specialize in crafting custom computers
                            tailored to your lifestyle, whether you're a gamer,
                            content creator, student, or professional. From
                            budget builds to high-performance rigs, we provide
                            top-quality parts, expert assembly, and exceptional
                            support. Choose your specs, get expert advice, and
                            experience the power of a PC built just for you.
                            Start your build today and unleash next-level
                            performance.
                        </p>

                        <div className="buttons">
                            <Link
                                to="/login-register"
                                className="button shop-now"
                            >
                                Shop Now
                            </Link>
                            <a href="#" className="button contact-us">
                                Contact Us
                            </a>
                        </div>
                    </div>
                    <div className="hero-image-wrapper">
                        <img
                            src="images/PC.png"
                            alt="Hero"
                            className="hero-image"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
