import { InitOptions } from "i18next";

// サポートする言語とデフォルト言語
export const fallbackLng = "ja";
export const locales = [fallbackLng, "en"];
export const defaultNS = "common"; // デフォルトのNamespace

// 共通オプション
export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS
): InitOptions {
  return {
    // debug: true, // デバッグ用
    supportedLngs: locales,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

// サーバーサイド（ミドルウェア、サーバーコンポーネント）用オプション
export const serverSideOptions = (
  lng: string,
  ns: string | string[] = defaultNS
): InitOptions => {
  return {
    ...getOptions(lng, ns),
    backend: {
      // 翻訳JSONファイルのパス（サーバーのローカルパス）
      // 【修正】src/locales を指すように変更
      loadPath: `${process.cwd()}/src/i18n/locales/{{lng}}/{{ns}}.json`,
    },
    preload: [fallbackLng, ...locales.filter((l) => l !== fallbackLng)],
  };
};

// クライアントサイド（クライアントコンポーネント）用オプション
export const clientSideOptions: InitOptions = {
  ...getOptions(),
  // クライアントでのみ `LanguageDetector` を使用
  detection: {
    order: ["path", "cookie", "htmlTag", "localStorage", "navigator"],
    caches: ["cookie"],
  },
  // 【削除】`resourcesToBackend` で import() を使うため、
  // `backend.loadPath` の設定は不要
  /*
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  */
};
