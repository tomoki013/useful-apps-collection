"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import { useTranslation } from "@/i18n/client";

const Sidebar = () => {
    const { t, i18n } = useTranslation('apps');
    const lang = i18n.language;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('sidebarTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>{t('categories.health')}</AccordionTrigger>
                        <AccordionContent>
                            <nav className="grid gap-1 px-2">
                                <Link
                                    href={`/${lang}/bmi-calculator`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {t('tools.bmiCalculator')}
                                </Link>
                                <Link
                                    href={`/${lang}/bmr-calculator`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {t('tools.bmrCalculator')}
                                </Link>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>{t('categories.money')}</AccordionTrigger>
                        <AccordionContent>
                            <nav className="grid gap-1 px-2">
                                <Link
                                    href={`/${lang}/loan-simulator`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {t('tools.loanSimulator')}
                                </Link>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>{t('categories.everydayLife')}</AccordionTrigger>
                        <AccordionContent>
                            <nav className="grid gap-1 px-2">
                                <Link
                                    href={`/${lang}/unit-converter`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {t('tools.unitConverter')}
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
