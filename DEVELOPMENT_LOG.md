# DEVELOPMENT_LOG.md - 開発ログ

このドキュメントは、「便利計算ツールボックス」プロジェクトの開発履歴、実装内容、そして得られた知見を記録するためのものです。

---

## 2025-11-12

### 担当者
- Jules

### 実装内容
- **国際化 (i18n) 基盤の`next-international`への移行:**
  - `next-international`ライブラリを導入し、i18n基盤を刷新。
  - `init`コマンドが利用できなかったため、公式ドキュメントを参考に手動で`src/app/i18n`ディレクトリと設定ファイル (`client.ts`, `server.ts`) を作成。
  - プロジェクトルートに`middleware.ts`を配置し、`ja`と`en`のロケールに対応したURLリライトを設定。
- **翻訳ファイルの分離と型安全性向上:**
  - 各コンポーネント (`BmiCalculator`, `BmrCalculator`, `Sidebar`, `Header`, `LoanSimulator`, `UnitConverter`, `ContactPage`, `AppListPage`, `HomePage`, `Footer`) に内蔵されていた翻訳オブジェクトを`src/app/i18n/locales`配下に集約・分割。
  - `common`, `bmi-calculator`, `bmr-calculator`, `loan-simulator`, `unit-converter`, `contact`, `apps`, `home`といった名前空間で翻訳ファイルを管理。
- **コンポーネントの書き換え:**
  - `src/app/[lang]/layout.tsx`に`I18nProviderClient`をセットアップ。
  - 全てのクライアントコンポーネントで、従来の`useLanguage`フックと`translations`オブジェクトを廃止し、`next-international`の`useI18n`フックに置き換え。
  - サーバーコンポーネント (`page.tsx`) で`getI18n`を使用するように修正。
  - `Header`コンポーネントの言語切り替え機能を`useChangeLocale`と`useCurrentLocale`フックを使って再実装。
- **クリーンアップ:**
  - 不要になった`src/contexts/LanguageProvider.tsx`を削除。
  - `src/app/layout.tsx`から`LanguageProvider`の呼び出しを削除。

### 発生した問題・課題
- `next-international`の`init`コマンド (`pnpm next-international init`, `pnpm exec next-international init`, `npx next-international init`) が、パッケージがローカルにインストールされているにもかかわらず「command not found」エラーとなり実行できなかった。
- おそらくライブラリのバージョンアップに伴い`init`コマンドが非推奨または廃止されたと推測される。

### 解決策
- 公式ドキュメントを検索し、App Router向けの最新のセットアップ手順を確認。`init`コマンドに頼らず、`client.ts`, `server.ts`, `middleware.ts`などの設定ファイルを手動で作成することで対応した。

### 得られた知見・次のアクション
- ライブラリのCLIツールが期待通りに動作しない場合、バージョン差異によるコマンドの変更・廃止を疑い、速やかに公式ドキュメントで最新の情報を確認することが重要である。
- 手動でのセットアップ手順を理解することで、CLIツールがない、または動作しない状況でも柔軟に対応できる。

---

## 2025-11-09

### 担当者
- Jules

### 実装内容
- **ローン返済シミュレーションのバグ修正:**
  - `src/components/organisms/calculators/LoanSimulator.tsx` にて、計算実行前に入力値のバリデーション（数値チェック、正の値であるか）を追加し、不正な値によるクラッシュを防止。
- **単位変換機機能の実装:**
  - **計算ロジックの追加:** `src/lib/calculators/unitConverter.ts` を新規作成。「長さ」「重さ」「面積」「体積」「温度」の5カテゴリに対応した変換ロジックを、拡張性の高いデータ構造で実装。
  - **UIコンポーネントの作成:** `src/components/organisms/calculators/UnitConverter.tsx` を新規作成。カテゴリ、変換元、変換先を選択する`Select`と入力用の`Input`を配置し、入力値が変更されるたびに即座に結果が表示されるUIを実装。`useLocalStorage`で状態を永続化。
  - **ページの追加とルーティング:** `src/app/[lang]/(calculators)/unit-converter/page.tsx` を作成し、単位変換機ページをアプリケーションに追加。
- **共通コンポーネントとUIの改修:**
  - **サイドバーの更新:** `src/components/organisms/Sidebar.tsx` を修正し、「日常生活」カテゴリを新設。その中に単位変換機へのリンクを追加した。
  - **AppCardコンポーネントの改修:** `src/components/ui/app-card.tsx` をリファクタリング。`comingSoon` propが`true`の場合に、`Link`ではなく`div`で囲み、クリックできないスタイル（`opacity-50`, `cursor-not-allowed`）を適用するように変更。
  - **アプリ一覧ページの更新:** `src/app/[lang]/apps/page.tsx` を更新し、「単位変換機」を`comingSoon: true`で追加。他の既存計算機の`comingSoon`フラグを`false`に変更した。

### 発生した問題・課題
- 特になし。コンポーネントの構造やロジックの分離が適切であったため、スムーズに実装を進めることができた。

### 解決策
- N/A

### 得られた知見・次のアクション
- 機能追加の典型的なワークフロー（ロジック実装 → UIコンポーネント作成 → ページ作成 → ナビゲーション更新）を確立できた。
- `comingSoon`のようなUIの状態をpropsで管理する手法は、機能の段階的なリリースに有効であることを確認した。

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
- `ls` コマンドのパス引数をシングルクォーテーションで囲むことで、特殊文字のエラーを回避した。

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
- `mkdir` コマンドのパス引数をシングルクォーテーションで囲むことで、特殊文字のエラーを回避した。

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
