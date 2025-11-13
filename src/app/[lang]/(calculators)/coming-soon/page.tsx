// src/app/[lang]/(calculators)/coming-soon/page.tsx

import { Metadata } from "next";

// TODO: i18n
export const metadata: Metadata = {
  title: "Coming Soon | Convenient Calculation Toolbox",
  description:
    "More tools are coming soon!",
};

const ComingSoonPage = () => {
  return (
    <div className="py-8">
      <p>More tools are coming soon!</p>
    </div>
  );
};

export default ComingSoonPage;
