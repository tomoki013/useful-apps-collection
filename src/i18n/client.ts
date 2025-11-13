'use client';

import i18next from 'i18next';
import { useTranslation as useTranslationOrg, initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { clientSideOptions, locales } from './settings';
import { useParams } from 'next/navigation';

// クライアントでのi18next初期化
i18next
.use(initReactI18next)
.use(LanguageDetector)
.use(resourcesToBackend((language: string, namespace: string) =>
// ブラウザから動的にJSONをインポート
import(`../../../public/locales/${language}/${namespace}.json`)
))
.init({
...clientSideOptions,
});

// カスタム useTranslation フック
export function useTranslation(ns?: string | string[], options: { keyPrefix?: string } = {}) {
const ret = useTranslationOrg(ns, options);
const { i18n } = ret;

// URLの[lang]パラメータを取得
const params = useParams();
const lang = params.lang as string;

// URLの言語とi18nextの言語が異なる場合は同期させる
if (locales.includes(lang) && i18n.resolvedLanguage !== lang) {
i18n.changeLanguage(lang);
}

return ret;
}