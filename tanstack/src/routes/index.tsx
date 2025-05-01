import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: "/login-register",
    });
  },
  component: () => null, // or a loading spinner if you want
});
