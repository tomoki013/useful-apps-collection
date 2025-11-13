export default {
  title: 'Useful Apps List',
  description: 'A collection of various tools useful in daily life. All are available for free.',
  searchPlaceholder: 'Search for apps...',
  categories: {
    all: 'All',
    health: 'Health',
    money: 'Money',
    tools: 'Tools',
  },
  apps: {
    bmiCalculator: {
      name: 'BMI Calculator',
      description: 'Check your obesity level',
    },
    bmrCalculator: {
      name: 'Basal Metabolic Rate (BMR) Calculator',
      description: 'Calculate the energy required to maintain life',
    },
    loanSimulator: {
      name: 'Loan Repayment Simulator',
      description: 'Compare equal payment and equal principal repayments',
    },
    unitConverter: {
      name: 'Unit Converter',
      description: 'Convert various units such as length, weight, and temperature',
    },
  },
  noResults: {
    title: 'No apps found',
    description: 'Please change the search criteria and try again',
  },
  comingSoon: {
    title: 'More apps are on the way',
    description: 'We are currently developing more useful tools. New apps will be added soon.',
    badge: 'In Development',
  },
} as const;
