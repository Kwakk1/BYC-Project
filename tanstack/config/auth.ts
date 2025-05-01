import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
}

let currentUser: User | null = null;

const initAuth = () =>
  new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
        };
        // Store the user in localStorage
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } else {
        currentUser = null;
        localStorage.removeItem("currentUser");
      }
      resolve(auth);
    });
  });

const getUser = () => {
  if (!currentUser) {
    // Retrieve the user from localStorage if not already set
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
    }
  }
  return currentUser;
};

export { initAuth, getUser };

export async function doCreateUserWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    return result;
  } catch (error: any) {
    console.error("Error during registration:", error);
    throw error;
  }
}

export async function doSignInWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
      })
    );
    return result;
  } catch (error: any) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function doSignInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
      })
    );
    return result;
  } catch (error: any) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
}

export async function doSignOut() {
  try {
    await auth.signOut();
    localStorage.removeItem("currentUser"); // Clear the user from localStorage
  } catch (error: any) {
    console.error("Error during sign out:", error);
    throw error;
  }
}
