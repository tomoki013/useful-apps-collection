'use client';

import { useState } from 'react';
import { Search, Filter, Grid3X3, HeartPulse, Dumbbell, Landmark, Recycle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AppCard } from '@/components/ui/app-card';
import { useI18n } from '@/app/i18n/client';

const AppListPage = () => {
    const { t } = useI18n();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const apps = [
        {
            name: t('apps.apps.bmiCalculator.name'),
            description: t('apps.apps.bmiCalculator.description'),
            icon: <HeartPulse />,
            category: t('apps.categories.health'),
            href: '/bmi-calculator',
            color: '#10B981',
            comingSoon: false,
        },
        {
            name: t('apps.apps.bmrCalculator.name'),
            description: t('apps.apps.bmrCalculator.description'),
            icon: <Dumbbell />,
            category: t('apps.categories.health'),
            href: '/bmr-calculator',
            color: '#3B82F6',
            comingSoon: false,
        },
        {
            name: t('apps.apps.loanSimulator.name'),
            description: t('apps.apps.loanSimulator.description'),
            icon: <Landmark />,
            category: t('apps.categories.money'),
            href: '/loan-simulator',
            color: '#F97316',
            comingSoon: false,
        },
        {
            name: t('apps.apps.unitConverter.name'),
            description: t('apps.apps.unitConverter.description'),
            icon: <Recycle />,
            category: t('apps.categories.tools'),
            href: '/unit-converter',
            color: '#8B5CF6',
            comingSoon: true,
        },
    ];

    const categories = ['all', 'health', 'money', 'tools'];

    const filteredApps = apps.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             app.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || app.category === t(`apps.categories.${selectedCategory}`);
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    {t('apps.title')}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {t('apps.description')}
                </p>
            </div>

            {/* Search and Filter */}
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-border/20">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                            type="text"
                            placeholder={t('apps.searchPlaceholder')}
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
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                    className={selectedCategory === category ? 
                                        "bg-primary hover:bg-primary/90" : 
                                        "bg-background/80 hover:bg-accent border-border text-muted-foreground"
                                    }
                                >
                                    {t(`apps.categories.${category}`)}
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
                        {t('apps.noResults.title')}
                    </h3>
                    <p className="text-muted-foreground">
                        {t('apps.noResults.description')}
                    </p>
                </div>
            )}

            {/* Coming Soon Notice */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 text-center border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                    {t('apps.comingSoon.title')}
                </h3>
                <p className="text-muted-foreground mb-6">
                    {t('apps.comingSoon.description')}
                </p>
                <Badge variant="outline" className="bg-background/50">
                    {t('apps.comingSoon.badge')}
                </Badge>
            </div>
        </div>
    );
}

export default AppListPage;
