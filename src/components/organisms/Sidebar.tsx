"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

// TODO: i18n
const translations = {
    ja: {
        sidebarTitle: 'ツールボックス',
        health: '健康',
        bmiCalculator: 'BMI計算機',
        calculators: '計算機',
        converters: '変換機',
        comingSoon: '近日公開...',
    },
    en: {
        sidebarTitle: 'Toolbox',
        health: 'Health',
        bmiCalculator: 'BMI Calculator',
        calculators: 'Calculators',
        converters: 'Converters',
        comingSoon: 'Coming soon...',
    },
}

const Sidebar = () => {
    const params = useParams();
    const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang || 'en';
    const t = lang === 'ja' ? translations.ja : translations.en;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t.sidebarTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>{t.health}</AccordionTrigger>
                        <AccordionContent>
                            <nav className="grid gap-1 px-2">
                                <Link
                                    href={`/${lang}/bmi-calculator`}
                                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                >
                                    {t.bmiCalculator}
                                </Link>
                            </nav>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>{t.calculators}</AccordionTrigger>
                        <AccordionContent>
                            <p className="px-4 text-sm text-muted-foreground">{t.comingSoon}</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>{t.converters}</AccordionTrigger>
                        <AccordionContent>
                             <p className="px-4 text-sm text-muted-foreground">{t.comingSoon}</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}

export default Sidebar
