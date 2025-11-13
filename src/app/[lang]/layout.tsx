
import { Menu, X } from 'lucide-react';
import { I18nProviderClient } from '@/app/i18n/client';
import LangLayoutClient from './layout-client';


export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;

  return (
    <I18nProviderClient locale={lang}>
      <LangLayoutClient>
        {children}
      </LangLayoutClient>
    </I18nProviderClient>
  );
}
