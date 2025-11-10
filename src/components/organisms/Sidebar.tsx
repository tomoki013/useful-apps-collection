"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/i18n/client";

const Sidebar = ({ lang }: { lang: string }) => {
  const { t } = useTranslation(lang, "common");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("sidebar.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>{t("sidebar.health")}</AccordionTrigger>
            <AccordionContent>
              <nav className="grid gap-1 px-2">
                <Link
                  href={`/${lang}/bmi-calculator`}
                  className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                >
                  {t("apps_page.app_cards.bmi.name")}
                </Link>
                <Link
                  href={`/${lang}/bmr-calculator`}
                  className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                >
                  {t("apps_page.app_cards.bmr.name")}
                </Link>
              </nav>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>{t("sidebar.money")}</AccordionTrigger>
            <AccordionContent>
              <nav className="grid gap-1 px-2">
                <Link
                  href={`/${lang}/loan-simulator`}
                  className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                >
                  {t("apps_page.app_cards.loan.name")}
                </Link>
              </nav>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>{t("sidebar.calculators")}</AccordionTrigger>
            <AccordionContent>
              <p className="px-4 text-sm text-muted-foreground">
                {t("sidebar.coming_soon")}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>{t("sidebar.everyday_life")}</AccordionTrigger>
            <AccordionContent>
              <nav className="grid gap-1 px-2">
                <Link
                  href={`/${lang}/unit-converter`}
                  className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                >
                  {t("apps_page.app_cards.unit_converter.name")}
                </Link>
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
