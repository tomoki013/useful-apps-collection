"use client";

import { useTranslation } from "@/i18n/client";

interface GuideSection {
  title: string;
  content: string;
}

const GuidePage = () => {
  const { t } = useTranslation("guide");
  const sections = t("sections", { returnObjects: true }) as GuideSection[];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center">{t("title")}</h1>
      <div className="space-y-8">
        {Array.isArray(sections) &&
          sections.map((section, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <p className="text-lg leading-relaxed">{section.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GuidePage;
