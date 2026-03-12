import { Analytics } from "@vercel/analytics/react";
import Landing from "./components/Landing";
import LandingMinimal from "./components/LandingMinimal";

const isChat = window.location.hostname.startsWith("chat.");

export default function App() {
  return (
    <>
      {isChat ? <LandingMinimal /> : <Landing />}
      <Analytics />
    </>
  );
}
