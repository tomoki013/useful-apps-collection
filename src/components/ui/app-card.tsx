'use client';

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useI18n } from "@/app/i18n/client";

export type AppCardProps = {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  href: string;
  color: string;
  comingSoon?: boolean;
};

const CardContentInner = ({ name, description, icon, category, color, comingSoon }: AppCardProps) => {
  const { t } = useI18n();
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-3xl" style={{ color }}>
            {icon}
          </div>
          {comingSoon && <Badge>{t('common.appCard.comingSoon')}</Badge>}
        </div>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="outline">{category}</Badge>
      </CardContent>
    </Card>
  );
};

export const AppCard = (props: AppCardProps) => {
  if (props.comingSoon) {
    return (
      <div className={cn("opacity-50 cursor-not-allowed")}>
        <CardContentInner {...props} />
      </div>
    );
  }

  return (
    <Link href={props.href} className="block">
      <CardContentInner {...props} />
    </Link>
  );
};
