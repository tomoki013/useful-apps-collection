import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { Locale } from "../../i18n-config";
import { getOptions } from "./settings";

// This function is used in Server Components to get the translation function (t)
// and the i18next instance.
export async function createTranslation(
  locale: Locale,
  ns: string | string[] = "common"
) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string) =>
          import(`./lang/${language}.json`)
      )
    )
    .init(getOptions(locale, ns));

  return {
    t: i18nInstance.getFixedT(locale, ns),
    i18n: i18nInstance,
  };
}