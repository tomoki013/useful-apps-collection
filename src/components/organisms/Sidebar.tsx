"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useScopedI18n, useCurrentLocale } from "@/i18n/client"

const Sidebar = () => {
    const t = useScopedI18n("sidebar")
    const lang = useCurrentLocale()
    const apps = useScopedI18n("apps_page.app_cards")

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>{t('health')}</AccordionTrigger>
                        <AccordionContent>
                            <nav className="grid gap-1 px-2">
                                <Link
                                    href={`/${lang}/bmi-calculator`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {apps('bmi.name')}
                                </Link>
                                <Link
                                    href={`/${lang}/bmr-calculator`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {apps('bmr.name')}
                                </Link>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>{t('money')}</AccordionTrigger>
                        <AccordionContent>
                            <nav className="grid gap-1 px-2">
                                <Link
                                    href={`/${lang}/loan-simulator`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {apps('loan.name')}
                                </Link>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>{t('calculators')}</AccordionTrigger>
                        <AccordionContent>
                            <p className="px-4 text-sm text-muted-foreground">{t('coming_soon')}</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>{t('everyday_life')}</AccordionTrigger>
                        <AccordionContent>
                            <nav className="grid gap-1 px-2">
                                <Link
                                    href={`/${lang}/unit-converter`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {apps('unit_converter.name')}
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
