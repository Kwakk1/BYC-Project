// import { createFileRoute, redirect } from "@tanstack/react-router";
// import { getAuth } from "firebase/auth";

// export const Route = createFileRoute("/$uid/shop/amd")({
//   component: RouteComponent,
//   beforeLoad: async () => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     console.log("user", user);
//     console.log("auth", auth);

//     if (!user) {
//       throw redirect({ to: "/login-register" });
//     }
//   },
// });

// function RouteComponent() {
//   return <div>Hello "/shopamd/"!</div>;
// }
