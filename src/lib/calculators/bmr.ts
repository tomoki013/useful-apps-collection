// src/lib/calculators/bmr.ts

/**
 * BmrArgs: Arguments required for BMR calculation.
 * @property gender - Gender ('male' or 'female')
 * @property age - Age in years
 * @property height - Height in cm
 * @property weight - Weight in kg
 */
export interface BmrArgs {
  gender: 'male' | 'female';
  age: number;
  height: number;
  weight: number;
}

/**
 * Calculates the Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation.
 * @param args - BmrArgs object containing gender, age, height, and weight.
 * @returns The calculated BMR value (kcal/day), or null if the input is invalid.
 */
export const calculateBmrMifflin = (args: BmrArgs): number | null => {
  const { gender, age, height, weight } = args;

  if (age <= 0 || height <= 0 || weight <= 0) {
    return null;
  }

  let bmr: number;

  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return parseFloat(bmr.toFixed(0)); // Return as a whole number
};
