
type Unit = {
  name: string;
  symbol: string;
};

type ConversionFactors = {
  [key: string]: number;
};

type TemperatureConversion = (value: number) => number;

type TemperatureConversions = {
  [from: string]: {
    [to: string]: TemperatureConversion;
  };
};

type Category = {
  name: string;
  baseUnit: string;
  units: { [key: string]: Unit };
  conversions: ConversionFactors | TemperatureConversions;
};

export const unitConverterConfig: { [key: string]: Category } = {
  length: {
    name: "Length",
    baseUnit: "m",
    units: {
      m: { name: "Meter", symbol: "m" },
      km: { name: "Kilometer", symbol: "km" },
      cm: { name: "Centimeter", symbol: "cm" },
      mm: { name: "Millimeter", symbol: "mm" },
      mi: { name: "Mile", symbol: "mi" },
      yd: { name: "Yard", symbol: "yd" },
      ft: { name: "Foot", symbol: "ft" },
      in: { name: "Inch", symbol: "in" },
    },
    conversions: {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      mi: 1609.34,
      yd: 0.9144,
      ft: 0.3048,
      in: 0.0254,
    },
  },
  weight: {
    name: "Weight",
    baseUnit: "g",
    units: {
      g: { name: "Gram", symbol: "g" },
      kg: { name: "Kilogram", symbol: "kg" },
      mg: { name: "Milligram", symbol: "mg" },
      t: { name: "Tonne", symbol: "t" },
      lb: { name: "Pound", symbol: "lb" },
      oz: { name: "Ounce", symbol: "oz" },
    },
    conversions: {
      g: 1,
      kg: 1000,
      mg: 0.001,
      t: 1000000,
      lb: 453.592,
      oz: 28.3495,
    },
  },
  area: {
    name: "Area",
    baseUnit: "m2",
    units: {
      m2: { name: "Square Meter", symbol: "m²" },
      km2: { name: "Square Kilometer", symbol: "km²" },
      ha: { name: "Hectare", symbol: "ha" },
      ft2: { name: "Square Foot", symbol: "ft²" },
      ac: { name: "Acre", symbol: "ac" },
    },
    conversions: {
      m2: 1,
      km2: 1000000,
      ha: 10000,
      ft2: 0.092903,
      ac: 4046.86,
    },
  },
  volume: {
    name: "Volume",
    baseUnit: "l",
    units: {
      l: { name: "Liter", symbol: "L" },
      ml: { name: "Milliliter", symbol: "mL" },
      m3: { name: "Cubic Meter", symbol: "m³" },
      gal: { name: "Gallon", symbol: "gal" },
      qt: { name: "Quart", symbol: "qt" },
      pt: { name: "Pint", symbol: "pt" },
      cup: { name: "Cup", symbol: "cup" },
      oz: { name: "Fluid Ounce", symbol: "oz" },
    },
    conversions: {
      l: 1,
      ml: 0.001,
      m3: 1000,
      gal: 3.78541,
      qt: 0.946353,
      pt: 0.473176,
      cup: 0.24,
      oz: 0.0295735,
    },
  },
  temperature: {
    name: "Temperature",
    baseUnit: "c",
    units: {
      c: { name: "Celsius", symbol: "°C" },
      f: { name: "Fahrenheit", symbol: "°F" },
      k: { name: "Kelvin", symbol: "K" },
    },
    conversions: {
      c: {
        f: (c) => (c * 9) / 5 + 32,
        k: (c) => c + 273.15,
        c: (c) => c,
      },
      f: {
        c: (f) => ((f - 32) * 5) / 9,
        k: (f) => ((f - 32) * 5) / 9 + 273.15,
        f: (f) => f,
      },
      k: {
        c: (k) => k - 273.15,
        f: (k) => ((k - 273.15) * 9) / 5 + 32,
        k: (k) => k,
      },
    },
  },
};

export const convert = (
  value: number,
  fromUnit: string,
  toUnit: string,
  category: string
): number => {
  const config = unitConverterConfig[category];
  if (!config) {
    throw new Error(`Invalid category: ${category}`);
  }

  if (category === "temperature") {
    const tempConversions = config.conversions as TemperatureConversions;
    const conversionFunc = tempConversions[fromUnit]?.[toUnit];
    if (conversionFunc) {
      return conversionFunc(value);
    }
    throw new Error(`Invalid temperature conversion from ${fromUnit} to ${toUnit}`);
  } else {
    const conversions = config.conversions as ConversionFactors;
    const fromFactor = conversions[fromUnit];
    const toFactor = conversions[toUnit];
    if (fromFactor === undefined || toFactor === undefined) {
      throw new Error(`Invalid unit in category ${category}`);
    }
    const valueInBaseUnit = value * fromFactor;
    return valueInBaseUnit / toFactor;
  }
};
