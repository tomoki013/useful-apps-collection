import { getTranslation } from "@/i18n/server";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { t } = await getTranslation(lang, "discount-calculator");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const DiscountCalculatorPage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const { t } = await getTranslation(lang, "coming-soon");
  return (
    <div className="py-8">
      <p>{t("title")}</p>
    </div>
  );
};

export default DiscountCalculatorPage;
