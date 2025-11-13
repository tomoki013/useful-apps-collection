"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useLocalStorage from "@/hooks/useLocalStorage";
import { calculateEqualPayment, calculateEqualPrincipalPayment, LoanCalculationResult } from "@/lib/calculators/loan";
import { useI18n } from "@/app/i18n/client";

type RepaymentMethod = "equal-payment" | "equal-principal";

type LoanResult = LoanCalculationResult & {
  firstMonthPayment?: number;
  lastMonthPayment?: number;
};

const LoanSimulator = () => {
  const { t } = useI18n();
  const [amount, setAmount] = useLocalStorage("loan-amount", "1000000");
  const [annualRate, setAnnualRate] = useLocalStorage("loan-rate", "1.5");
  const [period, setPeriod] = useLocalStorage("loan-period", "10");
  const [repaymentMethod, setRepaymentMethod] = useLocalStorage<RepaymentMethod>("loan-method", "equal-payment");
  const [result, setResult] = useState<LoanResult | null>(null);

  const handleCalculate = () => {
    const numAmount = Number(amount);
    const numAnnualRate = Number(annualRate);
    const numPeriod = Number(period);

    if (isNaN(numAmount) || isNaN(numAnnualRate) || isNaN(numPeriod) || numAmount <= 0 || numAnnualRate < 0 || numPeriod <= 0) {
      setResult(null);
      return;
    }

    const loanArgs = {
      amount: numAmount,
      annualRate: numAnnualRate,
      period: numPeriod,
    };

    if (repaymentMethod === "equal-payment") {
      setResult(calculateEqualPayment(loanArgs));
    } else {
      setResult(calculateEqualPrincipalPayment(loanArgs));
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">{t('loan-simulator.title')}</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="amount">{t('loan-simulator.amount')}</Label>
            <Input id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="annualRate">{t('loan-simulator.annualRate')}</Label>
            <Input id="annualRate" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="period">{t('loan-simulator.period')}</Label>
            <Input id="period" value={period} onChange={(e) => setPeriod(e.target.value)} />
          </div>
          <div>
            <Label>{t('loan-simulator.repaymentMethod')}</Label>
            <RadioGroup value={repaymentMethod} onValueChange={(value) => setRepaymentMethod(value as RepaymentMethod)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="equal-payment" id="equal-payment" />
                <Label htmlFor="equal-payment">{t('loan-simulator.equalPayment')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="equal-principal" id="equal-principal" />
                <Label htmlFor="equal-principal">{t('loan-simulator.equalPrincipal')}</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Button onClick={handleCalculate} className="mt-6">
          {t('loan-simulator.calculate')}
        </Button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <h3 className="text-xl font-bold">{t('loan-simulator.resultTitle')}</h3>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
              <div>
                <Label>{repaymentMethod === 'equal-payment' ? t('loan-simulator.monthlyPayment') : t('loan-simulator.firstMonthPayment')}</Label>
                <p className="text-2xl font-bold">{result.monthlyPayment.toLocaleString()} {t('loan-simulator.yen')}</p>
              </div>
              {repaymentMethod === 'equal-principal' && result.lastMonthPayment && (
                <div>
                  <Label>{t('loan-simulator.lastMonthPayment')}</Label>
                  <p className="text-2xl font-bold">{result.lastMonthPayment.toLocaleString()} {t('loan-simulator.yen')}</p>
                </div>
              )}
              <div>
                <Label>{t('loan-simulator.totalRepayment')}</Label>
                <p className="text-2xl font-bold">{result.totalRepayment.toLocaleString()} {t('loan-simulator.yen')}</p>
              </div>
              <div>
                <Label>{t('loan-simulator.totalInterest')}</Label>
                <p className="text-2xl font-bold">{result.totalInterest.toLocaleString()} {t('loan-simulator.yen')}</p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoanSimulator;
