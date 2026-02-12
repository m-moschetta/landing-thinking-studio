import { Analytics } from "@vercel/analytics/react";
import Landing from "./components/Landing";

export default function App() {
  return (
    <>
      <Landing />
      <Analytics />
    </>
  );
}
