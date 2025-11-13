import common from './common';
import bmiCalculator from './bmi-calculator';
import bmrCalculator from './bmr-calculator';
import loanSimulator from './loan-simulator';
import unitConverter from './unit-converter';
import contact from './contact';
import apps from './apps';
import home from './home';

export default {
  common,
  'bmi-calculator': bmiCalculator,
  'bmr-calculator': bmrCalculator,
  'loan-simulator': loanSimulator,
  'unit-converter': unitConverter,
  contact,
  apps,
  home,
} as const;
