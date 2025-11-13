// src/app/[lang]/(calculators)/password-generator/page.tsx

import { PasswordGenerator } from "@/components/organisms/calculators/PasswordGenerator";
import { Metadata } from "next";

// TODO: i18n
export const metadata: Metadata = {
  title: "Password Generator | Convenient Calculation Toolbox",
  description:
    "Generate a secure password with customizable options.",
};

const PasswordGeneratorPage = () => {
  return (
    <div className="py-8">
      {/* <PasswordGenerator /> */}
      <p>Password Generator coming soon!</p>
    </div>
  );
};

export default PasswordGeneratorPage;
