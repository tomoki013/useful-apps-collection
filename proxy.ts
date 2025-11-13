import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match as localeMatcher } from "@formatjs/intl-localematcher";
import { locales, fallbackLng } from "./src/i18n/settings";

// ヘッダーから最適なロケールを取得
function getLocale(request: NextRequest): string {
  const headers = Object.fromEntries(request.headers.entries());
  // Accept-Language ヘッダーを取得
  const languages = new Negotiator({ headers }).languages();

  try {
    // サポート言語と照合
    return localeMatcher(languages, locales, fallbackLng);
  } catch (e) {
    return fallbackLng;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // publicファイルやAPI、Next.js内部パスをスキップ
  // 【修正】/locales (翻訳ファイル) へのパスもスキップ対象に追加
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/locales") || // <-- 追加
    pathname.startsWith("/public") ||
    pathname.includes(".") // favicon.ico や .svg などを想定
  ) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 言語プレフィックスがない場合
  if (pathnameIsMissingLocale) {
    // 最適な言語を検出
    const locale = getLocale(request);

    // /ja/pathname のようにリダイレクト
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  // ミドルウェアを実行しないパス
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|locales).*)", // <-- |locales を追加
  ],
};
