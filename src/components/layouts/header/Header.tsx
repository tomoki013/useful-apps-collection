'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';
import { useI18n, useChangeLocale, useCurrentLocale } from '@/app/i18n/client';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const { t } = useI18n();
    const changeLocale = useChangeLocale();
    const lang = useCurrentLocale();

    useEffect(() => {
        setMounted(true);
    }, []);

    const navigation = [
        { name: t('common.header.navigation.home'), href: `/${lang}` },
        { name: t('common.header.navigation.apps'), href: `/${lang}/apps` },
        { name: t('common.header.navigation.contact'), href: `/${lang}/contact` },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (!mounted) {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href={`/${lang}`} className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {t('common.header.logo.text')}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </nav>
                    
                    {/* Language & Theme Toggles & Mobile Menu Button */}
                    <div className="flex items-center space-x-2">
                        {/* Language Selector */}
                        <Select onValueChange={(newLang) => changeLocale(newLang as 'ja' | 'en')} defaultValue={lang}>
                            <SelectTrigger className="w-auto h-9 p-0 border-none bg-transparent hover:bg-accent focus:ring-0">
                                <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                                    <Globe className="w-4 h-4" />
                                    <span className="sr-only">{t('common.header.language.toggle.tooltip')}</span>
                                </Button>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ja">{t('common.header.language.japanese')}</SelectItem>
                                <SelectItem value="en">{t('common.header.language.english')}</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            className="w-9 h-9 p-0 hover:bg-accent"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            )}
                            <span className="sr-only">{t('common.header.theme.toggle.tooltip')}</span>
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden w-9 h-9 p-0"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? (
                                <X className="w-4 h-4" />
                            ) : (
                                <Menu className="w-4 h-4" />
                            )}
                            <span className="sr-only">{t('common.header.menu.open.tooltip')}</span>
                        </Button>
                    </div>
                </div>
                    
                {/* Mobile Navigation */}
                <div
                    className={cn(
                        "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                        isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    <nav className="py-4 space-y-2 border-t border-border/40">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
