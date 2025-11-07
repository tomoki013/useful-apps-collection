'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BmrArgs, calculateBmrMifflin } from '@/lib/calculators/bmr';

// Translations
const translations = {
  ja: {
    title: '基礎代謝量 (BMR) 計算機',
    gender: '性別',
    male: '男性',
    female: '女性',
    age: '年齢',
    height: '身長 (cm)',
    weight: '体重 (kg)',
    calculate: '計算する',
    resultTitle: '計算結果',
    bmr: 'あなたの基礎代謝量',
    unit: 'kcal/日',
    formula: '計算式: ミフリン・セントジョー方程式を採用',
  },
  en: {
    title: 'Basal Metabolic Rate (BMR) Calculator',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    age: 'Age',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    calculate: 'Calculate',
    resultTitle: 'Result',
    bmr: 'Your Basal Metabolic Rate',
    unit: 'kcal/day',
    formula: 'Formula: Based on the Mifflin-St Jeor equation.',
  },
};

interface BmrFormState {
  gender: 'male' | 'female';
  age: string;
  height: string;
  weight: string;
}

export const BmrCalculator = () => {
  const params = useParams();
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang || 'en';
  const t = lang === 'ja' ? translations.ja : translations.en;

  const [formState, setFormState] = useLocalStorage<BmrFormState>('bmr-form', {
    gender: 'male',
    age: '30',
    height: '170',
    weight: '65',
  });

  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };

  const handleGenderChange = (value: 'male' | 'female') => {
    setFormState({ ...formState, gender: value });
  };

  const handleCalculate = () => {
    const { gender, age, height, weight } = formState;
    const bmrArgs: BmrArgs = {
      gender,
      age: parseInt(age, 10),
      height: parseFloat(height),
      weight: parseFloat(weight),
    };
    const calculationResult = calculateBmrMifflin(bmrArgs);
    setResult(calculationResult);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gender Selection */}
        <div className="space-y-2">
          <Label>{t.gender}</Label>
          <RadioGroup value={formState.gender} onValueChange={handleGenderChange} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">{t.male}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">{t.female}</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">{t.age}</Label>
            <Input id="age" type="number" value={formState.age} onChange={handleInputChange} placeholder="例: 30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">{t.height}</Label>
            <Input id="height" type="number" value={formState.height} onChange={handleInputChange} placeholder="例: 170" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">{t.weight}</Label>
            <Input id="weight" type="number" value={formState.weight} onChange={handleInputChange} placeholder="例: 65" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <Button onClick={handleCalculate}>{t.calculate}</Button>

        <AnimatePresence>
          {result !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-4 border rounded-lg bg-muted/40"
            >
              <h3 className="text-lg font-semibold mb-2">{t.resultTitle}</h3>
              <div className="flex justify-between items-baseline text-2xl font-bold">
                <span>{t.bmr}:</span>
                <span>
                  {result} <span className="text-sm font-normal">{t.unit}</span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-4 text-xs text-center text-muted-foreground">{t.formula}</p>
      </CardFooter>
    </Card>
  );
};
