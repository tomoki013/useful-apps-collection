"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLocalStorage from "@/hooks/useLocalStorage";
import { unitConverterConfig, convert } from "@/lib/calculators/unitConverter";
import { motion } from "framer-motion";

const UnitConverter = () => {
  const [category, setCategory] = useLocalStorage("unit-category", "length");
  const [fromUnit, setFromUnit] = useLocalStorage("unit-from", "m");
  const [toUnit, setToUnit] = useLocalStorage("unit-to", "ft");
  const [inputValue, setInputValue] = useLocalStorage("unit-input", "1");
  const [outputValue, setOutputValue] = useState("");

  const categories = Object.keys(unitConverterConfig);
  const units = unitConverterConfig[category]?.units || {};

  useEffect(() => {
    if (unitConverterConfig[category]) {
      const unitKeys = Object.keys(unitConverterConfig[category].units);
      if (!unitKeys.includes(fromUnit)) {
        setFromUnit(unitKeys[0]);
      }
      if (!unitKeys.includes(toUnit)) {
        setToUnit(unitKeys[1] || unitKeys[0]);
      }
    }
  }, [category, fromUnit, toUnit, setFromUnit, setToUnit]);

  useEffect(() => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      try {
        const result = convert(numValue, fromUnit, toUnit, category);
        setOutputValue(result.toLocaleString());
      } catch (error) {
        if (error instanceof Error) {
          setOutputValue(error.message);
        }
      }
    } else {
      setOutputValue("");
    }
  }, [inputValue, fromUnit, toUnit, category]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unit Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {unitConverterConfig[cat].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>
                    {unit.name} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>
                    {unit.name} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <motion.div
              key={outputValue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                value={outputValue}
                readOnly
                placeholder="Result"
                className="font-bold"
              />
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitConverter;
