// src/lib/calculators/bmi.ts

/**
 * BmiUnitSystem: 単位系（メートル法またはヤード・ポンド法）
 */
export type BmiUnitSystem = 'metric' | 'imperial';

/**
 * BmiMetricArgs: メートル法での計算に必要な引数
 * @property height - 身長 (cm)
 * @property weight - 体重 (kg)
 */
export interface BmiMetricArgs {
  height: number;
  weight: number;
}

/**
 * BmiImperialArgs: ヤード・ポンド法での計算に必要な引数
 * @property heightFt - 身長 (feet)
 * @property heightIn - 身長 (inches)
 * @property weight - 体重 (lbs)
 */
export interface BmiImperialArgs {
  heightFt: number;
  heightIn: number;
  weight: number;
}

/**
 * BmiArgs: calculateBmi関数に渡す引数の型
 */
export type BmiArgs = {
  unit: BmiUnitSystem;
  values: BmiMetricArgs | BmiImperialArgs;
};

/**
 * BmiCategory: BMIの判定カテゴリ
 */
export type BmiCategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

/**
 * BmiResult: 計算結果の型
 * @property bmi - 計算されたBMI値
 * @property category - 判定カテゴリ
 * @property idealWeight - 適正体重 (kg)
 */
export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  idealWeight: number;
}

/**
 * BMIの判定カテゴリを取得する
 * @param bmi - BMI値
 * @returns BmiCategory - 判定カテゴリ
 */
const getBmiCategory = (bmi: number): BmiCategory => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

/**
 * 適正体重を計算する（BMI 22を基準とする）
 * @param heightM - 身長 (m)
 * @returns number - 適正体重 (kg)
 */
const calculateIdealWeight = (heightM: number): number => {
  return 22 * heightM * heightM;
};

/**
 * BMIを計算し、カテゴリと適正体重を返す
 * @param args - BmiArgs (単位系と入力値)
 * @returns BmiResult | null - 計算結果または計算できない場合はnull
 */
export const calculateBmi = (args: BmiArgs): BmiResult | null => {
  const { unit, values } = args;

  let heightM: number; // 身長 (m)
  let weightKg: number; // 体重 (kg)

  if (unit === 'metric') {
    const { height, weight } = values as BmiMetricArgs;
    if (height <= 0 || weight <= 0) return null;
    heightM = height / 100;
    weightKg = weight;
  } else {
    const { heightFt, heightIn, weight } = values as BmiImperialArgs;
    if (heightFt <= 0 && heightIn <= 0 || weight <= 0) return null;
    const totalInches = heightFt * 12 + heightIn;
    heightM = totalInches * 0.0254; // インチをメートルに変換
    weightKg = weight * 0.453592; // ポンドをキログラムに変換
  }

  if (heightM <= 0 || weightKg <= 0) return null;

  const bmi = weightKg / (heightM * heightM);
  const category = getBmiCategory(bmi);
  const idealWeight = calculateIdealWeight(heightM);

  return {
    bmi: parseFloat(bmi.toFixed(1)), // 小数点第1位まで
    category,
    idealWeight: parseFloat(idealWeight.toFixed(1)), // 小数点第1位まで
  };
};
