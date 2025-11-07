'use client';

import { useState } from 'react';
import { Search, Filter, Grid3X3, HeartPulse, Dumbbell, Landmark, Recycle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AppCard } from '@/components/ui/app-card';
import { useScopedI18n, useCurrentLocale } from '@/i18n/client';

const AppListPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const ts = useScopedI18n('apps_page');
    const lang = useCurrentLocale();

    const apps = [
        {
            name: ts('app_cards.bmi.name'),
            description: ts('app_cards.bmi.description'),
            icon: <HeartPulse />,
            category: ts('categories.health'),
            href: `/${lang}/bmi-calculator`,
            color: '#10B981',
            comingSoon: false,
        },
        {
            name: ts('app_cards.bmr.name'),
            description: ts('app_cards.bmr.description'),
            icon: <Dumbbell />,
            category: ts('categories.health'),
            href: `/${lang}/bmr-calculator`,
            color: '#3B82F6',
            comingSoon: false,
        },
        {
            name: ts('app_cards.loan.name'),
            description: ts('app_cards.loan.description'),
            icon: <Landmark />,
            category: ts('categories.money'),
            href: `/${lang}/loan-simulator`,
            color: '#F97316',
            comingSoon: false,
        },
        {
            name: ts('app_cards.unit_converter.name'),
            description: ts('app_cards.unit_converter.description'),
            icon: <Recycle />,
            category: ts('categories.tools'),
            href: `/${lang}/unit-converter`,
            color: '#8B5CF6',
            comingSoon: true,
        },
    ];

    const categories = [
        { key: 'all', name: ts('categories.all') },
        { key: 'health', name: ts('categories.health') },
        { key: 'money', name: ts('categories.money') },
        { key: 'tools', name: ts('categories.tools') },
    ];

    const filteredApps = apps.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             app.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || app.category === categories.find(c => c.key === selectedCategory)?.name;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    {ts('title')}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {ts('description')}
                </p>
            </div>

            {/* Search and Filter */}
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-border/20">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                            type="text"
                            placeholder={ts('search_placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-background/80 border-border focus:border-primary focus:ring-primary"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-muted-foreground" />
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category.key}
                                    variant={selectedCategory === category.key ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category.key)}
                                    className={selectedCategory === category.key ?
                                        "bg-primary hover:bg-primary/90" : 
                                        "bg-background/80 hover:bg-accent border-border text-muted-foreground"
                                    }
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
                  
            {/* Apps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.map((app, index) => (
                    <AppCard
                        key={index}
                        name={app.name}
                        description={app.description}
                        icon={app.icon}
                        category={app.category}
                        href={app.href}
                        color={app.color}
                        comingSoon={app.comingSoon}
                    />
                ))}
            </div>
            
            {/* No Results */}
            {filteredApps.length === 0 && (
                <div className="text-center py-16">
                    <Grid3X3 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                        {ts('no_results.title')}
                    </h3>
                    <p className="text-muted-foreground">
                        {ts('no_results.description')}
                    </p>
                </div>
            )}

            {/* Coming Soon Notice */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 text-center border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                    {ts('coming_soon.title')}
                </h3>
                <p className="text-muted-foreground mb-6">
                    {ts('coming_soon.description')}
                </p>
                <Badge variant="outline" className="bg-background/50">
                    {ts('coming_soon.badge')}
                </Badge>
            </div>
        </div>
    );
}

export default AppListPage;
