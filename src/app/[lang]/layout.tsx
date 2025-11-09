import { I18nProviderClient } from '@/i18n/client';
import MainLayout from '@/app/components/layouts/MainLayout';

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <I18nProviderClient locale={lang}>
      <MainLayout>{children}</MainLayout>
    </I18nProviderClient>
  );
}
