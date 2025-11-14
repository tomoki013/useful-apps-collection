"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Grid3X3,
  HeartPulse,
  Dumbbell,
  Landmark,
  Recycle,
  Calculator,
  Clock,
  QrCode,
  Lock,
  Crop,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AppCard } from "@/components/ui/app-card";
import CategoryFilter from "@/components/organisms/CategoryFilter";
import { useTranslation } from "@/i18n/client";

interface App {
  name: string;
  description: string;
  category: string;
  href: string;
  comingSoon: boolean;
}

const AppListPage = () => {
  const { t } = useTranslation("apps");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const appList = t("appList", { returnObjects: true }) as App[];

  const apps = appList
    .sort((a, b) => (a.comingSoon ? 1 : -1) - (b.comingSoon ? 1 : -1) || a.name.localeCompare(b.name))
    .map((app) => {
      let icon;
      switch (app.href) {
        case "/bmi-calculator":
          icon = <HeartPulse />;
          break;
        case "/bmr-calculator":
          icon = <Dumbbell />;
          break;
        case "/loan-simulator":
          icon = <Landmark />;
          break;
        case "/unit-converter":
          icon = <Recycle />;
          break;
        case "/age-calculator":
          icon = <Calculator />;
          break;
        case "/world-clock":
          icon = <Clock />;
          break;
        case "/qr-code-generator":
          icon = <QrCode />;
          break;
        case "/password-generator":
          icon = <Lock />;
          break;
        case "/aspect-ratio-calculator":
          icon = <Crop />;
          break;
        default:
          icon = <Calculator />;
      }

      let color;
      switch (app.category) {
        case "health":
          color = "#10B981";
          break;
        case "money":
          color = "#F97316";
          break;
        case "tool":
          color = "#8B5CF6";
          break;
        default:
          color = "#3B82F6";
      }

      return { ...app, icon, color };
    });

  const categories = [
    "all",
    ...Array.from(new Set(apps.map((app) => app.category))),
  ];

  const translatedCategories = categories.map((category) => ({
    key: category,
    value: t(`categories.${category}`),
  }));

  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-border/20">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/80 border-border focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <CategoryFilter
              categories={translatedCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <AppCard
            key={app.name}
            name={app.name}
            description={app.description}
            icon={app.icon}
            category={t(`categories.${app.category}`)}
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
            {t("noResults.title")}
          </h3>
          <p className="text-muted-foreground">{t("noResults.description")}</p>
        </div>
      )}

      {/* Coming Soon Notice */}
      <div className="mt-16 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 text-center border border-border">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          {t("comingSoon.title")}
        </h3>
        <p className="text-muted-foreground mb-6">
          {t("comingSoon.description")}
        </p>
        <Badge variant="outline" className="bg-background/50">
          {t("comingSoon.badge")}
        </Badge>
      </div>
    </div>
  );
};

export default AppListPage;
