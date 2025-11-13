"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Zap,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "サービス",
      links: [
        { name: "アプリ一覧", href: "/apps" },
        { name: "計算機", href: "/apps/calculator" },
        { name: "タイマー", href: "/apps/timer" },
        { name: "テキスト変換", href: "/apps/text-converter" },
      ],
    },
    {
      title: "会社情報",
      links: [
        { name: "会社概要", href: "/about" },
        { name: "プライバシーポリシー", href: "/privacy" },
        { name: "利用規約", href: "/terms" },
        { name: "お問い合わせ", href: "/contact" },
      ],
    },
    {
      title: "サポート",
      links: [
        { name: "ヘルプセンター", href: "/help" },
        { name: "よくある質問", href: "/faq" },
        { name: "使い方ガイド", href: "/guide" },
        { name: "フィードバック", href: "/feedback" },
      ],
    },
  ];

  const contactInfo = [
    { icon: Mail, text: "contact@example.com" },
    { icon: Phone, text: "03-1234-5678" },
    { icon: MapPin, text: "東京都渋谷区" },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                便利アプリ集
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              日常生活や仕事で役立つ便利なツールを無料で提供しています。
              すべてのアプリはブラウザ上で動作し、インストール不要でご利用いただけます。
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-muted-foreground"
                  >
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
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
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
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} 便利アプリ集. All rights reserved.
          </p>

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
};

export default Footer;
