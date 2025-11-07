import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/i18n/client";

export type AppCardProps = {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  href: string;
  color: string;
  comingSoon?: boolean;
};

export const AppCard = ({ name, description, icon, category, href, color, comingSoon }: AppCardProps) => {
  const t = useScopedI18n("apps_page.app_cards");
  const CardContentInner = () => (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-3xl" style={{ color }}>
            {icon}
          </div>
          {comingSoon && <Badge>{t('coming_soon')}</Badge>}
        </div>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="outline">{category}</Badge>
      </CardContent>
    </Card>
  );

  if (comingSoon) {
    return (
      <div className={cn("opacity-50 cursor-not-allowed")}>
        <CardContentInner />
      </div>
    );
  }

  return (
    <Link href={href} className="block">
      <CardContentInner />
    </Link>
  );
};
