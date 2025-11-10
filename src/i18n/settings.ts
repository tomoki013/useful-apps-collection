export const fallbackLng = "ja";
export const languages = [fallbackLng, "en"];
export const defaultNS = "common";

export function getOptions(lang = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng: lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
