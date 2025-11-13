// src/app/[lang]/(calculators)/bmi-calculator/page.tsx

import { BmiCalculator } from "@/components/organisms/calculators/BmiCalculator";
import { Metadata } from "next";

// TODO: i18n
export const metadata: Metadata = {
  title: "BMI Calculator | Convenient Calculation Toolbox",
  description:
    "Calculate your Body Mass Index (BMI) using metric or imperial units.",
};

const BmiCalculatorPage = () => {
  return (
    <div className="py-8">
      <BmiCalculator />
    </div>
  );
};

export default BmiCalculatorPage;
