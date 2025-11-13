export default {
  title: '便利アプリ一覧',
  description: '日常で役立つ様々なツールを集めました。すべて無料でご利用いただけます。',
  searchPlaceholder: 'アプリを検索...',
  categories: {
    all: 'すべて',
    health: '健康',
    money: 'お金',
    tools: 'ツール',
  },
  apps: {
    bmiCalculator: {
      name: 'BMI計算機',
      description: 'あなたの肥満度をチェック',
    },
    bmrCalculator: {
      name: '基礎代謝(BMR)計算機',
      description: '生命維持に必要なエネルギー量を計算',
    },
    loanSimulator: {
      name: 'ローン返済シミュレーション',
      description: '元利均等・元金均等の返済額を比較',
    },
    unitConverter: {
      name: '単位変換機',
      description: '長さ、重さ、温度など様々な単位を変換',
    },
  },
  noResults: {
    title: 'アプリが見つかりませんでした',
    description: '検索条件を変更してもう一度お試しください',
  },
  comingSoon: {
    title: 'より多くのアプリを準備中',
    description: '現在、さらに便利なツールを開発中です。近日中に新しいアプリを追加予定です。',
    badge: '開発中',
  },
} as const;
