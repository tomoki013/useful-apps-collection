"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useI18n, useCurrentLocale } from "@/app/i18n/client";

const Sidebar = () => {
    const { t } = useI18n();
    const lang = useCurrentLocale();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('common.sidebar.title')}</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>{t('common.sidebar.health')}</AccordionTrigger>
                        <AccordionContent>
                            <nav className="grid gap-1 px-2">
                                <Link
                                    href={`/${lang}/bmi-calculator`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {t('common.sidebar.health.bmi')}
                                </Link>
                                <Link
                                    href={`/${lang}/bmr-calculator`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {t('common.sidebar.health.bmr')}
                                </Link>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>{t('common.sidebar.money')}</AccordionTrigger>
                        <AccordionContent>
                            <nav className="grid gap-1 px-2">
                                <Link
                                    href={`/${lang}/loan-simulator`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {t('common.sidebar.money.loan')}
                                </Link>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>{t('common.sidebar.calculators')}</AccordionTrigger>
                        <AccordionContent>
                            <p className="px-4 text-sm text-muted-foreground">{t('common.sidebar.comingSoon')}</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>{t('common.sidebar.everyday')}</AccordionTrigger>
                        <AccordionContent>
                            <nav className="grid gap-1 px-2">
                                <Link
                                    href={`/${lang}/unit-converter`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {t('common.sidebar.everyday.unit')}
                                </Link>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}

export default Sidebar
