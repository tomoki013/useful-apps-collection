// src/app/[lang]/(calculators)/character-counter/page.tsx

import { Metadata } from "next";

// TODO: i18n
export const metadata: Metadata = {
  title: "Character Counter | Convenient Calculation Toolbox",
  description:
    "Count the number of characters in the entered text.",
};

const CharacterCounterPage = () => {
  return (
    <div className="py-8">
      <p>Character Counter coming soon!</p>
    </div>
  );
};

export default CharacterCounterPage;
