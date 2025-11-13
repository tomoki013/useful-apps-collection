"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BmiUnitSystem, calculateBmi, BmiResult } from "@/lib/calculators/bmi";
import { useTranslation } from "@/i18n/client";

interface BmiFormState {
  unit: BmiUnitSystem;
  heightCm: string;
  weightKg: string;
  heightFt: string;
  heightIn: string;
  weightLbs: string;
}

export const BmiCalculator = () => {
  const { t } = useTranslation(["bmi-calculator", "common"]);

  const [formState, setFormState] = useLocalStorage<BmiFormState>("bmi-form", {
    unit: "metric",
    heightCm: "170",
    weightKg: "65",
    heightFt: "5",
    heightIn: "7",
    weightLbs: "143",
  });

  const [result, setResult] = useState<BmiResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

  const handleUnitChange = (value: BmiUnitSystem) => {
    setFormState({ ...formState, unit: value });
  };

  const handleCalculate = () => {
    const { unit, heightCm, weightKg, heightFt, heightIn, weightLbs } =
      formState;
    const calculationResult = calculateBmi({
      unit,
      values:
        unit === "metric"
          ? { height: parseFloat(heightCm), weight: parseFloat(weightKg) }
          : {
              heightFt: parseFloat(heightFt),
              heightIn: parseFloat(heightIn),
              weight: parseFloat(weightLbs),
            },
    });
    setResult(calculationResult);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Unit System Selection */}
        <div className="space-y-2">
          <Label>{t("unitSystem")}</Label>
          <RadioGroup
            value={formState.unit}
            onValueChange={handleUnitChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="metric" id="metric" />
              <Label htmlFor="metric">{t("metric")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="imperial" id="imperial" />
              <Label htmlFor="imperial">{t("imperial")}</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Input Fields */}
        {formState.unit === "metric" ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heightCm">{t("height")} (cm)</Label>
              <Input
                id="heightCm"
                type="number"
                value={formState.heightCm}
                onChange={handleInputChange}
                placeholder="例: 170"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weightKg">{t("weight")} (kg)</Label>
              <Input
                id="weightKg"
                type="number"
                value={formState.weightKg}
                onChange={handleInputChange}
                placeholder="例: 65"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t("height")}</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="heightFt"
                  type="number"
                  value={formState.heightFt}
                  onChange={handleInputChange}
                  placeholder="ft"
                />
                <Input
                  id="heightIn"
                  type="number"
                  value={formState.heightIn}
                  onChange={handleInputChange}
                  placeholder="in"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weightLbs">{t("weight")} (lbs)</Label>
              <Input
                id="weightLbs"
                type="number"
                value={formState.weightLbs}
                onChange={handleInputChange}
                placeholder="例: 143"
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <Button onClick={handleCalculate}>{t("calculate")}</Button>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-4 border rounded-lg bg-muted/40"
            >
              <h3 className="text-lg font-semibold mb-2">
                {t("result.title")}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t("result.yourBmi")}:</span>
                  <span className="font-bold">{result.bmi}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("result.category")}:</span>
                  <span className="font-bold">
                    {t(`categories.${result.category}`)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t("result.idealWeight")}:</span>
                  <span className="font-bold">{result.idealWeight} kg</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
};
