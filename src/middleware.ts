import { NextRequest, NextResponse } from "next/server";
import { fallbackLng, languages } from "./i18n/settings";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const getLocale = (req: NextRequest): string => {
  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = languages;
  const languagesFromHeader = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();
  const defaultLocale = fallbackLng;

  try {
    return match(languagesFromHeader, locales, defaultLocale);
  } catch (e) {
    console.error(e);
    return defaultLocale;
  }
};

export const middleware = (req: NextRequest) => {
  const locale = getLocale(req);
  const pathname = req.nextUrl.pathname;

  const newUrl = new URL(req.url);

  if (pathname.startsWith(`/${locale}`)) {
    return NextResponse.next();
  }

  // Redirect if there is no locale
  newUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(newUrl);
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
