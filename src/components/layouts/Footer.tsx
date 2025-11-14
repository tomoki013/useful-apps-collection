"use client";

import Link from "next/link";
import { Mail, Zap } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useTranslation } from "@/i18n/client";

const Footer = () => {
  const { t, i18n } = useTranslation(["footer", "common"]);
  const lang = i18n.language;

  const footerSections = [
    {
      title: t("sections.services.title"),
      links: [
        { name: t("sections.services.links.apps"), href: `/${lang}/apps` },
      ],
    },
    {
      title: t("sections.siteInfo.title"),
      links: [
        {
          name: t("sections.siteInfo.links.about"),
          href: `/${lang}/about`,
        },
        {
          name: t("sections.siteInfo.links.privacy"),
          href: `/${lang}/privacy-policy`,
        },
        {
          name: t("sections.siteInfo.links.terms"),
          href: `/${lang}/terms-of-service`,
        },
        {
          name: t("sections.siteInfo.links.contact"),
          href: `/${lang}/contact`,
        },
      ],
    },
    {
      title: t("sections.support.title"),
      links: [
        { name: t("sections.support.links.help"), href: `/${lang}/help` },
        { name: t("sections.support.links.faq"), href: `/${lang}/faq` },
        { name: t("sections.support.links.guide"), href: `/${lang}/guide` },
        {
          name: t("sections.support.links.feedback"),
          href: `/${lang}/feedback`,
        },
      ],
    },
  ];

  const contactInfo = [{ icon: Mail, text: "gaomuyouxi81@gmail.com" }];

  const socialLinks = [
    {
      icon: (
        <FaGithub className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
      ),
      href: "https://github.com/tomoki013/useful-apps-collection/",
      label: "GitHub",
    },
    // {
    //   icon: (
    //     <FaTwitter className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
    //   ),
    //   href: "#",
    //   label: "Twitter",
    // },
    {
      icon: (
        <FaLinkedin className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
      ),
      href: "https://www.linkedin.com/in/tomoki-takagi-5b08a738b/",
      label: "LinkedIn",
    },
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
                {t("title")}
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">{t("description")}</p>

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
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => {
              return (
                <Link
                  key={index}
                  href={social.href}
                  className="w-9 h-9 bg-muted hover:bg-accent rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  {social.icon}
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
