import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  return (
    <a href={href} className="block">
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
    </a>
  );
};
