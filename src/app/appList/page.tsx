'use client';

import { useState } from 'react';
import { Search, Filter, Grid3X3, Calculator, Clock, Type, PaletteIcon, QrCode, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AppCard } from '@/components/ui/app-card';

const AppListPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const apps = [
        {
            name: '計算機',
            description: '基本的な四則演算から関数計算まで対応した高機能計算機',
            icon: Calculator,
            category: 'ツール',
            href: '/apps/calculator',
            color: 'from-blue-500 to-blue-600',
            comingSoon: true
        },
        {
            name: 'タイマー',
            description: 'ポモドーロテクニックにも対応したカスタマイズ可能なタイマー',
            icon: Clock,
            category: '生産性',
            href: '/apps/timer',
            color: 'from-green-500 to-green-600',
            comingSoon: true
        },
        {
            name: 'テキスト変換',
            description: '大文字・小文字変換、全角・半角変換など様々なテキスト処理',
            icon: Type,
            category: 'ツール',
            href: '/apps/text-converter',
            color: 'from-purple-500 to-purple-600',
            comingSoon: true
        },
        {
            name: 'カラーパレット',
            description: 'カラーコードの確認やパレット生成ができるデザインツール',
            icon: PaletteIcon,
            category: 'デザイン',
            href: '/apps/color-palette',
            color: 'from-pink-500 to-pink-600',
            comingSoon: true
        },
        {
            name: 'QRコード生成',
            description: 'テキストやURLからQRコードを簡単に生成',
            icon: QrCode,
            category: 'ツール',
            href: '/apps/qr-generator',
            color: 'from-indigo-500 to-indigo-600',
            comingSoon: true
        },
        {
            name: 'ファイル変換',
            description: '画像、PDF、音声ファイルなどの形式変換',
            icon: Download,
            category: 'ユーティリティ',
            href: '/apps/file-converter',
            color: 'from-orange-500 to-orange-600',
            comingSoon: true
        }
    ];

    const categories = ['all', 'ツール', '生産性', 'デザイン', 'ユーティリティ'];

    const filteredApps = apps.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             app.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    便利アプリ一覧
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    日常で役立つ様々なツールを集めました。すべて無料でご利用いただけます。
                </p>
            </div>

            {/* Search and Filter */}
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-border/20">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="アプリを検索..."
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
                                    {category === 'all' ? 'すべて' : category}
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
                        アプリが見つかりませんでした
                    </h3>
                    <p className="text-muted-foreground">
                        検索条件を変更してもう一度お試しください
                    </p>
                </div>
            )}

            {/* Coming Soon Notice */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 text-center border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                    より多くのアプリを準備中
                </h3>
                <p className="text-muted-foreground mb-6">
                    現在、さらに便利なツールを開発中です。近日中に新しいアプリを追加予定です。
                </p>
                <Badge variant="outline" className="bg-background/50">
                    開発中
                </Badge>
            </div>
        </div>
    );
}

export default AppListPage;
