# DEVELOPMENT_LOG.md - 開発ログ

このドキュメントは、「便利計算ツールボックス」プロジェクトの開発履歴、実装内容、そして得られた知見を記録するためのものです。

---

## 2025-11-03

### 担当者
- Google Gemini

### 実装内容
- **プロジェクト構造の`src`ディレクトリ化**
  - プロジェクトのソースコードを管理するため、`src`ディレクトリを導入。
  - `app`, `components`, `lib` ディレクトリを`src`内に移動。
  - `tsconfig.json` の`paths`エイリアスと`include`パスを更新し、新しい構造に対応。
  - `tailwind.config.ts` を新規作成し、Tailwind CSSが`src`内のファイルをスキャンできるように`content`パスを設定。

### 発生した問題・課題
- 当初、`postcss.config.mjs`でTailwindのコンテンツパスを設定する想定だったが、実際には`tailwind.config.ts`で設定する必要があった。プロジェクトに同ファイルが存在しなかったため、新規作成が必要だった。

### 解決策
- `tailwind.config.ts`を作成し、`src`ディレクトリ以下のコンポーネントやページファイルを指すようにコンテンツパスを正しく設定した。

### 得られた知見・次のアクション
- Next.jsプロジェクトにおいて、Tailwind CSSのコンテンツパス設定は`tailwind.config.ts`（または.js）で行われることを再確認した。今後のパス関連のリファクタリングでは、この設定ファイルの確認を必須とする。

---

## 2025-XX-XX

### 担当者
- Google Gemini

### 実装内容
- **（例）BMI計算機コンポーネントの作成**
  - `components/organisms/calculators/BmiCalculator.tsx` を作成。
  - `lib/calculators/bmi.ts` に計算ロジックを実装。
  - `app/[lang]/(calculators)/bmi-calculator/page.tsx` にルーティングを設定。
- **（例）ダークモード対応の修正**
  - `contexts/ThemeProvider.tsx` のlocalStorage連携部分のバグを修正。

### 発生した問題・課題
- （例）ヤード・ポンド法とメートル法の単位変換ロジックで、特定のケースで計算誤差が生じる問題があった。

### 解決策
- （例）`Decimal.js`のような高精度な計算ライブラリの導入も検討したが、今回は入力値のバリデーションを強化し、丸め処理を工夫することで対応した。

### 得られた知見・次のアクション
- （例）クライアントサイドでの精密な計算には注意が必要。今後、通貨換算などの金融計算を実装する際は、専用のライブラリ導入を必須とする。

---
