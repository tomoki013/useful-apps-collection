'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Zap } from 'lucide-react';
import { useI18n, useScopedI18n, useCurrentLocale } from '@/i18n/client';

const Footer = () => {
    const t = useI18n();
    const ts = useScopedI18n('footer.sections');
    const lang = useCurrentLocale();
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: ts('service.title'),
            links: [
                { name: ts('service.links.apps'), href: `/${lang}/apps` },
                { name: ts('service.links.calculator'), href: `/${lang}/apps` },
                { name: ts('service.links.timer'), href: `/${lang}/apps` },
                { name: ts('service.links.text_converter'), href: `/${lang}/apps` },
            ]
        },
        {
            title: ts('company.title'),
            links: [
                { name: ts('company.links.about'), href: `/${lang}/about` },
                { name: ts('company.links.privacy'), href: `/${lang}/privacy` },
                { name: ts('company.links.terms'), href: `/${lang}/terms` },
                { name: ts('company.links.contact'), href: `/${lang}/contact` },
            ]
        },
        {
            title: ts('support.title'),
            links: [
                { name: ts('support.links.help'), href: `/${lang}/help` },
                { name: ts('support.links.faq'), href: `/${lang}/faq` },
                { name: ts('support.links.guide'), href: `/${lang}/guide` },
                { name: ts('support.links.feedback'), href: `/${lang}/feedback` },
            ]
        }
    ];

    const contactInfo = [
        { icon: Mail, text: t('footer.contact.email') },
        { icon: Phone, text: t('footer.contact.phone') },
        { icon: MapPin, text: t('footer.contact.address') },
    ];

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="bg-background border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href={`/${lang}`} className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {t('footer.title')}
                            </span>
                        </Link>
                        <p className="text-muted-foreground max-w-md">
                            {t('footer.description')}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2">
                            {contactInfo.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <Icon className="w-4 h-4" />
                                        <span>{item.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                      
                    {/* Footer Links */}
                    {footerSections.map((section, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                
                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('footer.copyright', { year: currentYear }) }} />
                    
                    {/* Social Links */}
                    <div className="flex items-center space-x-4">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <Link
                                    key={index}
                                    href={social.href}
                                    className="w-9 h-9 bg-muted hover:bg-accent rounded-lg flex items-center justify-center transition-colors group"
                                    aria-label={social.label}
                                >
                                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
