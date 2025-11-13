import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type AppCardProps = {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  href: string;
  color: string;
  comingSoon?: boolean;
};

type CardContentInnerProps = Omit<AppCardProps, "href">;

const CardContentInner = ({ name, description, icon, category, color, comingSoon }: CardContentInnerProps) => (
  <Card className="h-full">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="text-3xl" style={{ color }}>
          {icon}
        </div>
        {comingSoon && <Badge>Coming Soon</Badge>}
      </div>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Badge variant="outline">{category}</Badge>
    </CardContent>
  </Card>
);

export const AppCard = ({ name, description, icon, category, href, color, comingSoon }: AppCardProps) => {
  const cardContentProps = { name, description, icon, category, color, comingSoon };

  if (comingSoon) {
    return (
      <div className={cn("opacity-50 cursor-not-allowed")}>
        <CardContentInner {...cardContentProps} />
      </div>
    );
  }

  return (
    <Link href={href} className="block">
      <CardContentInner {...cardContentProps} />
    </Link>
  );
};
