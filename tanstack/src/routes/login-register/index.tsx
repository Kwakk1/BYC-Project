import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import "./styles.css";
import { useState } from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  getUser,
  initAuth,
} from "../../../config/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";

export const Route = createFileRoute("/login-register/")({
  beforeLoad: async () => {
    await initAuth();

    const user = getUser();

    if (user) {
      throw redirect({ to: "/$uid/shop/amd", params: { uid: user.uid } });
    }

    return { user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [isActive, setIsActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");
  const [isError, setIsError] = useState("");

  const { navigate } = useRouter();

  async function handleGoogleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsError("");

    try {
      await doSignInWithGoogle();
      setIsSuccess("Google Sign-In successful!, You can now log in.");
    } catch (err: any) {
      setIsError(err.message || "An error occurred during Google Sign-In.");
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log(email, password);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsSuccess("Registration successful! You can now log in.");
    } catch (err: any) {
      setIsError(err.message || "An error occurred during registration.");
    }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const data = await doSignInWithEmailAndPassword(email, password);
      navigate({ to: "/$uid/shop/amd", params: { uid: data.user.uid } });
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setIsError("User not found. Please register an account first.");
      } else if (err.code === "auth/wrong-password") {
        setIsError("Invalid credentials. Please try again.");
      } else {
        setIsError(err.message || "An error occurred during login.");
      }
    }
  }

  return (
    <div className="registration-page">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon" onClick={handleGoogleSignIn}>
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registeration</span>
            <input type="text" name="firstName" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button>Sign Up</button>
            {isSuccess && <p className="text-green-500">{isSuccess}</p>}
            {isError && <p className="text-red-500">{isError}</p>}
          </form>
        </div>
        <div className="form-container log-in">
          <form onSubmit={handleLogin}>
            <h1>Log In</h1>
            <div className="social-icons">
              <a href="#" className="icon" onClick={handleGoogleSignIn}>
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email password</span>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <a href="#">Forget Your Password?</a>
            <button>Log In</button>
            {isError && <p className="text-red-500">{isError}</p>}
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button
                style={{ border: "2px solid white" }}
                id="login"
                onClick={() => setIsActive(false)}
              >
                Log In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                style={{ border: "2px solid white" }}
                id="register"
                onClick={() => setIsActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
