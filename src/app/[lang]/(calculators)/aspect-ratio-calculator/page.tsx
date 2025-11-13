// src/app/[lang]/(calculators)/aspect-ratio-calculator/page.tsx

import { AspectRatioCalculator } from "@/components/organisms/calculators/AspectRatioCalculator";
import { Metadata } from "next";

// TODO: i18n
export const metadata: Metadata = {
  title: "Aspect Ratio Calculator | Convenient Calculation Toolbox",
  description:
    "Calculate the aspect ratio of an image or video.",
};

const AspectRatioCalculatorPage = () => {
  return (
    <div className="py-8">
      {/* <AspectRatioCalculator /> */}
      <p>Aspect Ratio Calculator coming soon!</p>
    </div>
  );
};

export default AspectRatioCalculatorPage;
