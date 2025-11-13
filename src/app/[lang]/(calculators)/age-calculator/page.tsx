// src/app/[lang]/(calculators)/age-calculator/page.tsx

import { AgeCalculator } from "@/components/organisms/calculators/AgeCalculator";
import { Metadata } from "next";

// TODO: i18n
export const metadata: Metadata = {
  title: "Age Calculator | Convenient Calculation Toolbox",
  description:
    "Calculate your age based on your date of birth.",
};

const AgeCalculatorPage = () => {
  return (
    <div className="py-8">
      {/* <AgeCalculator /> */}
      <p>Age Calculator coming soon!</p>
    </div>
  );
};

export default AgeCalculatorPage;
