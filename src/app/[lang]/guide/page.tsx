"use client";

import { useTranslation } from "@/i18n/client";

const GuidePage = () => {
  const { t } = useTranslation("guide");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p>{t("content")}</p>
    </div>
  );
};

export default GuidePage;
