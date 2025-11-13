// src/app/[lang]/(calculators)/world-clock/page.tsx

import { WorldClock } from "@/components/organisms/calculators/WorldClock";
import { Metadata } from "next";

// TODO: i18n
export const metadata: Metadata = {
  title: "World Clock | Convenient Calculation Toolbox",
  description:
    "Check the current time in different cities around the world.",
};

const WorldClockPage = () => {
  return (
    <div className="py-8">
      {/* <WorldClock /> */}
      <p>World Clock coming soon!</p>
    </div>
  );
};

export default WorldClockPage;
