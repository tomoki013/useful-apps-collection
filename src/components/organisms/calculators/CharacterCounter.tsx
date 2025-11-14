"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/client";

export const CharacterCounter = ({ lang }: { lang: string }) => {
  const { t } = useTranslation("character-counter");
  const [text, setText] = useState("");

  const count = text.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("placeholder")}
            className="h-48"
          />
          <div className="flex items-center justify-between">
            <p>
              {t("characterCount")}: {count}
            </p>
            <Button onClick={() => setText("")} variant="outline">
              {t("clear")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
