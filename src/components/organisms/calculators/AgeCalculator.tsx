// src/components/organisms/calculators/AgeCalculator.tsx
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateAge } from "@/lib/calculators/age";
import { motion } from "framer-motion";

export const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  const handleCalculate = () => {
    const today = new Date().toISOString().split("T")[0];
    const calculatedAge = calculateAge(birthDate, today);
    setAge(calculatedAge);
  };

  const formattedAge = useMemo(() => {
    return `${age.years} years, ${age.months} months, ${age.days} days`;
  }, [age]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="birthDate">Your Date of Birth</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <Button onClick={handleCalculate}>Calculate Age</Button>
          {birthDate && (
            <motion.div
              key={formattedAge}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-2xl font-bold"
            >
              {formattedAge}
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
