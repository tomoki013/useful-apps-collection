"use client";

import { useTranslation } from "@/i18n/client";
import Link from "next/link";

const AboutPage = () => {
  const { t } = useTranslation("about");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{t("title")}</h1>
      <p className="mb-8 text-lg text-center">{t("introduction")}</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          {t("missionTitle")}
        </h2>
        <p>{t("missionContent")}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          {t("featuresTitle")}
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>{t("featureSimple")}</li>
          <li>{t("featureFree")}</li>
          <li>{t("featureNoInstall")}</li>
          <li>{t("featureModernStack")}</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          {t("techStackTitle")}
        </h2>
        <p>{t("techStackContent")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          {t("contactTitle")}
        </h2>
        <p>
          {t("contactContent")}{" "}
          <Link href="/contact" className="text-blue-500 hover:underline">
            {t("contactLink")}
          </Link>
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
