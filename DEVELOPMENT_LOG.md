# DEVELOPMENT_LOG.md - 開発ログ

このドキュメントは、「便利計算ツールボックス」プロジェクトの開発履歴、実装内容、そして得られた知見を記録するためのものです。

---

## 2025-11-08

### 担当者
- Jules

### 実装内容
- **ローン返済シミュレーター機能の実装**
  - **計算ロジックの追加:** `src/lib/calculators/loan.ts` を新規作成。「元利均等返済」と「元金均等返済」の2つの計算ロジックを実装した (`calculateEqualPayment`, `calculateEqualPrincipalPayment`)。
  - **UIコンポーネントの作成:**
    - `src/components/organisms/calculators/LoanSimulator.tsx` を新規作成。借入額、利率、期間、返済方式を入力し、計算結果をアニメーション表示するUIを実装。`useLocalStorage` を利用して入力値を永続化。
    - `src/components/ui/app-card.tsx` を新規作成。アプリ一覧ページで利用する再利用可能なカードコンポーネントとして実装。
  - **ページの追加とルーティング:** `src/app/[lang]/(calculators)/loan-simulator/page.tsx` を作成し、ローンシミュレーターページをアプリケーションに追加。
  - **サイドバーとアプリ一覧の更新:**
    - `src/components/organisms/Sidebar.tsx` を修正し、「お金」カテゴリを新設し、ローンシミュレーターへのリンクを追加。
    - `src/app/[lang]/apps/page.tsx` をリファクタリングし、`AppCard` コンポーネントを使用するように変更。MVPスコープに合わせて表示するアプリを「BMI計算機」「基礎代謝(BMR)計算機」「ローン返済シミュレーション」に更新した。

### 発生した問題・課題
- 特になし。過去の経験から、シェルの特殊文字を含むパスの扱いは問題なく行えた。

### 解決策
- N/A

### 得られた知見・次のアクション
- コンポーネントの再利用（`AppCard`）とロジックの分離（`loan.ts`）を徹底することで、コードの見通しが良くなり、メンテナンス性が向上することを再確認した。

---

## 2025-11-07

### 担当者
- Jules

### 実装内容
- **BMR（基礎代謝量）計算機機能の実装**
  - **計算ロジックの追加:** `src/lib/calculators/bmr.ts` を新規作成し、ミフリン・セントジョー方程式に基づいたBMR計算ロジック `calculateBmrMifflin` を実装。
  - **UIコンポーネントの作成:** `src/components/organisms/calculators/BmrCalculator.tsx` を新規作成。`BmiCalculator` を参考に、`Card`、`RadioGroup`、`Input` を使用してUIを構築。`useLocalStorage` フックで入力値を永続化し、`framer-motion` で結果をアニメーション表示するようにした。
  - **ページの追加とルーティング:** `src/app/[lang]/(calculators)/bmr-calculator/page.tsx` を作成し、BMR計算機ページをアプリケーションに追加。
  - **サイドバーの更新:** `src/components/organisms/Sidebar.tsx` を修正し、「健康」カテゴリ内にBMR計算機へのナビゲーションリンクを追加。国際化対応も行った。

### 発生した問題・課題
- `ls` コマンドでNext.jsのルートグループ `(calculators)` を含むディレクトリをリストしようとした際に、シェルの特殊文字として解釈されエラーが複数回発生した。

### 解決策
- `ls` コマンドのパス引数をシングルクォートで囲むことで、特殊文字のエラーを回避した。

### 得られた知見・次のアクション
- シェルで特殊文字（`()` など）を含むパスを扱う際は、クォーテーションで適切にエスケープすることの重要性を再認識した。コマンド実行前に入念な確認を行う。

---

## 2025-11-06

### 担当者
- Jules

### 実装内容
- **国際化 (i18n) 基盤の構築**
  - Next.jsのApp Routerを利用し、パスベースのルーティング (`/ja`, `/en`) を導入。
  - `src/app/[lang]` ディレクトリを作成し、既存のページコンポーネントを移行。
  - `src/app/[lang]/layout.tsx` を新設し、言語ごとの共通レイアウトを定義。
  - `src/contexts/LanguageProvider.tsx` を作成し、言語状態をグローバルに管理。
  - ヘッダーに言語切り替え用の`Select`コンポーネントを実装し、パスとUIが連動するようにした。
- **共通機能とレイアウトの実装**
  - アニメーション用のライブラリとして `framer-motion` を導入。
  - `localStorage` を利用して状態を永続化するための `useLocalStorage` カスタムフックを `src/hooks` に作成。
  - `src/components/organisms/Sidebar.tsx` を作成し、`Accordion` コンポーネントを導入。
  - `src/app/[lang]/layout.tsx` を更新し、デスクトップでは2カラム（サイドバー＋メインコンテンツ）、モバイルではハンバーガーメニューで開閉するサイドバーレイアウトを実装した。
- **BMI計算機機能の実装**
  - 計算ロジックを `src/lib/calculators/bmi.ts` に分離して実装。メートル法とヤード・ポンド法の両方に対応。
  - `src/components/organisms/calculators/BmiCalculator.tsx` にUIコンポーネントを作成。`useLocalStorage` を利用して入力値を永続化し、`framer-motion` で結果をアニメーション表示。
  - `src/app/[lang]/(calculators)/bmi-calculator/page.tsx` を作成し、新しい計算機ページをアプリケーションに追加。
  - `src/components/organisms/Sidebar.tsx` を更新し、「健康」カテゴリとBMI計算機へのリンクを追加。

### 発生した問題・課題
- shadcn/uiの `Select` コンポーネントがプロジェクトに存在しなかったため、`Sidebar` の `Accordion` と同様に手動で追加する必要があった。
- 当初の実装では、Task 2とTask 3が漏れていたため、コードレビューで指摘を受け、追加実装を行った。
- `mkdir` コマンドでNext.jsのルートグループ `(calculators)` を含むディレクトリを作成しようとした際に、シェルの特殊文字として解釈されエラーが発生した。

### 解決策
- shadcn/uiのドキュメントを参考に、`Select` と `Accordion` コンポーネントのソースコードを `src/components/ui` ディレクトリに手動で追加した。
- レビューフィードバックに基づき、`framer-motion` のインストール、`useLocalStorage` フックの実装、サイドバーレイアウトの作成、開発ログの更新を完了させた。
- `mkdir` コマンドのパス引数をシングルクォートで囲むことで、特殊文字のエラーを回避した。

### 得られた知見・次のアクション
- shadcn/uiのコンポーネントは、CLIで追加するのが基本だが、手動での追加方法も理解しておくことで、柔軟な対応が可能になる。
- 大規模なタスクに取り組む際は、要件を細分化し、各タスクが完了しているかをセルフチェックするプロセスを強化する必要がある。
- シェルで特殊文字（`()` など）を含むパスを扱う際は、クォーテーションで適切にエスケープすることが重要である。

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
