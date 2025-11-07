export type LoanArgs = {
  amount: number;
  annualRate: number;
  period: number;
};

export type LoanCalculationResult = {
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  payments: { month: number; principal: number; interest: number; balance: number }[];
};

/**
 * 元利均等返済 (Equal Payment)
 */
export const calculateEqualPayment = ({ amount, annualRate, period }: LoanArgs): LoanCalculationResult => {
  if (amount <= 0 || annualRate < 0 || period <= 0) {
    return { monthlyPayment: 0, totalRepayment: 0, totalInterest: 0, payments: [] };
  }

  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = period * 12;

  if (monthlyRate === 0) {
    const monthlyPayment = amount / numberOfPayments;
    return {
      monthlyPayment,
      totalRepayment: amount,
      totalInterest: 0,
      payments: Array.from({ length: numberOfPayments }, (_, i) => ({
        month: i + 1,
        principal: monthlyPayment,
        interest: 0,
        balance: amount - (i + 1) * monthlyPayment,
      })),
    };
  }

  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalRepayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalRepayment - amount;

  const payments = [];
  let balance = amount;
  for (let i = 1; i <= numberOfPayments; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;
    payments.push({
      month: i,
      principal: Math.round(principal),
      interest: Math.round(interest),
      balance: Math.round(balance),
    });
  }

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalRepayment: Math.round(totalRepayment),
    totalInterest: Math.round(totalInterest),
    payments,
  };
};

/**
 * 元金均等返済 (Equal Principal Payment)
 */
export const calculateEqualPrincipalPayment = ({
  amount,
  annualRate,
  period,
}: LoanArgs): LoanCalculationResult & { firstMonthPayment: number; lastMonthPayment: number } => {
  if (amount <= 0 || annualRate < 0 || period <= 0) {
    return {
      monthlyPayment: 0,
      firstMonthPayment: 0,
      lastMonthPayment: 0,
      totalRepayment: 0,
      totalInterest: 0,
      payments: [],
    };
  }

  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = period * 12;
  const principalPayment = amount / numberOfPayments;

  const payments = [];
  let balance = amount;
  let totalInterest = 0;

  for (let i = 1; i <= numberOfPayments; i++) {
    const interest = balance * monthlyRate;
    balance -= principalPayment;
    payments.push({
      month: i,
      principal: Math.round(principalPayment),
      interest: Math.round(interest),
      balance: Math.round(balance),
    });
    totalInterest += interest;
  }

  const firstMonthPayment = principalPayment + amount * monthlyRate;
  const lastMonthPayment = principalPayment + (amount / numberOfPayments) * monthlyRate;
  const totalRepayment = amount + totalInterest;

  return {
    monthlyPayment: Math.round(firstMonthPayment), // As a representative value
    firstMonthPayment: Math.round(firstMonthPayment),
    lastMonthPayment: Math.round(lastMonthPayment),
    totalRepayment: Math.round(totalRepayment),
    totalInterest: Math.round(totalInterest),
    payments,
  };
};
