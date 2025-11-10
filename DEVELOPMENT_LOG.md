# DEVELOPMENT_LOG.md - 開発ログ

このドキュメントは、「便利計算ツールボックス」プロジェクトの開発履歴、実装内容、そして得られた知見を記録するためのものです。

---

## 2025-11-10

### 担当者
- Jules

### 実装内容
- **国際化 (i18n) の全面的な再実装:**
  - ユーザーからの指示に基づき、`locales` が `undefined` となる根本的な問題を解決するため、i18n関連の構成をゼロから再実装した。
  - **1. 設定のリセット:** 問題の切り分けを容易にするため、既存の `src/middleware.ts` と `src/app/[lang]/layout.tsx` を一度削除。
  - **2. Middlewareの再実装:** `next-international` の公式ドキュメントに準拠し、`src/middleware.ts` を再作成。`ja` と `en` のロケールを定義し、デフォルトを `ja` に設定。
  - **3. ルートレイアウトの再実装:** `src/app/[lang]/layout.tsx` を再作成。Next.js App Routerの規約に従い、`params` propを同期的に処理するように修正。これにより、`lang` パラメータが `I18nProviderClient` に正しく渡されるようになり、`undefined` ロケールエラーを解決。
  - **4. Linterエラーの修正:** `src/app/[lang]/page.tsx` 内で `lang` パラメータが未使用であるとのLinter警告が出ていたため、`eslint-disable-next-line` コメントを追加して対応。

### 発生した問題・課題
- 再実装後、PlaywrightによるE2Eテストで一貫して `404` エラーが発生し、デバッグが難航した。
- **原因の特定:**
  - 1. 当初、Next.js 15の仕様変更を疑い、`layout.tsx` の `params` を `Promise` として `await` で処理しようとしたが、これが間違いであり、Next.jsのエラーを引き起こしていた。
  - 2. コードレビューでの指摘を受け、`params` は同期オブジェクトとして扱うのが正しいことを確認し修正。
  - 3. それでも `404` が解消されなかったが、最終的に `.next` ディレクトリ内に古いビルドキャッシュが残存し、ルーティング情報を破壊していたことが根本原因であると特定した。

### 解決策
- `rm -rf .next` コマンドでビルドキャッシュを完全に削除し、開発サーバーを再起動することで、ルーティングが正常に機能するようになり、`404` エラーが解消された。

### 得られた知見・次のアクション
- **Next.jsのデバッグ:** App Routerで原因不明のルーティングエラー（特に `404`）に遭遇した場合、コードの修正だけでなく、`.next` キャッシュの削除が極めて有効なトラブルシューティング手段であることを再認識した。
- **Propsの型:** Next.jsのバージョンや設定によって `params` のようなpropsの扱い（同期的か非同期的か）が異なる可能性がある。公式ドキュメントやエラーメッセージを注意深く確認することの重要性を学んだ。
- **テストの重要性:** Playwrightテストが最終的に `404` という根本原因を突き止めるための重要な手がかりとなった。単純な単体テストだけでなく、E2Eテストが全体の結合性を保証する上で不可欠である。

---

## 2025-11-10

### 担当者
- Jules

### 実装内容
- **`next-international` の `undefined` ロケールエラーの修正:**
  - **原因:** `src/app/[lang]/layout.tsx` と `src/app/[lang]/page.tsx` が、Next.jsの動的ルートセグメントから渡される `params` propを正しく受け取っていなかったため、`next-international` が現在のロケールを解決できずにいた。
  - **修正対応:**
    1. `src/app/[lang]/layout.tsx` の `RootLayout` コンポーネントが、propsとして `params: { lang: string }` を同期的に受け取るようにシグネチャを修正。
    2. `src/app/[lang]/page.tsx` の `Home` コンポーネントが、同様に `params: { lang: string }` を受け取るようにシグネチャを修正。

### 発生した問題・課題
- 当初、ユーザーの指示と `GEMINI.md` の記述に基づき `params` を `Promise` として扱おうとしたが、これはNext.js App Routerの仕様とは異なり、エラーの原因となっていた。

### 解決策
- `layout.tsx` と `page.tsx` が動的ルートセグメント (`[lang]`) の値を同期的なpropsとして明示的に受け取るように修正することで、`getScopedI18n` が確実にロケールを特定できるようにした。

### 得られた知見・次のアクション
- Next.jsのサーバーコンポーネントにおいて、`params` のようなpropsは、コンポーネント描画時にすでに解決済みの同期的なオブジェクトとして扱われることを再確認した。ユーザーの指示やドキュメントに不明な点がある場合は、公式ドキュメントと照らし合わせて検証することの重要性を学んだ。

---

## 2025-11-09

### 担当者
- Jules

### 実装内容
- **`next-international` のロケールエラー修正:**
  - **原因:** ルート (`/`) に配置された `src/app/layout.tsx` が `[lang]` パラメータを受け取らないため、`next-international` が現在のロケールを `undefined` と認識し、エラーが発生していた。
  - **修正対応:**
    1. `src/app/[lang]/layout.tsx` に `src/app/layout.tsx` の機能（`ThemeProvider`、グローバルなメタデータ、フォント設定など）を全て統合。
    2. `<html>` タグに `lang={lang}` を正しく渡すように修正。
    3. 不要になった `src/app/layout.tsx` を削除し、レイアウト定義を `src/app/[lang]/layout.tsx` に一本化。
    4. `src/middleware.ts` の `createI18nMiddleware` に `urlMappingStrategy: 'redirect'` を追加し、ロケールのないURLからデフォルトロケールへ正しくリダイレクトされるように修正。

### 発生した問題・課題
- Next.js App Routerのファイルベースルーティングにおいて、`[lang]` のような動적セグメントを持つルートとその親ルートに同時に `layout.tsx` が存在すると、意図しないレンダリングやpropsの欠落が発生する。
- Playwrightでのテスト時に、`next-international` がリダイレクトループを引き起こし、テストが失敗することがあった。

### 解決策
- ルーティングの最上位コンポーネントである `src/app/[lang]/layout.tsx` に、アプリケーション全体のレイアウト設定を集約することで、`lang` パラメータが一貫してコンポーネントツリーに渡るようにした。
- `urlMappingStrategy: 'redirect'` を使用することで、`next-international` のリダイレクト機能を活用し、ロケールプレフィックスのないURLへのアクセスを正しく処理できるようにした。

### 得られた知見・次のアクション
- App Routerでi18nを実装する際は、ルートレイアウト (`src/app/layout.tsx`) を使わず、動的セグメント (`src/app/[lang]/layout.tsx`) をアプリケーションのエントリーポイントとして設計することが、ロケール関連のエラーを防ぐためのベストプラクティスであることを学んだ。
- `next-international` を使用する際は、`urlMappingStrategy` の設定が重要であり、特にテスト環境での動作に影響を与える可能性があることを理解した。

---

## 2025-11-09

### 担当者
- Jules

### 実装内容
- **i18nミドルウェアの修正とレイアウトのリファクタリング:**
  - **リダイレクト問題の解決:** `src/middleware.ts` の `createI18nMiddleware` の設定に `urlMappingStrategy: 'redirect'` を追加し、ルートURL (`/`) からデフォルトロケール (`/ja`) へのリダイレクトが正しく機能するように修正。
  - **`params.lang` 警告の解消:** `src/app/[lang]/layout.tsx` をリファクタリング。クライアントサイドのロジック（状態管理やUI）を新しい `src/app/components/layouts/MainLayout.tsx` コンポーネントに分離。`src/app/[lang]/layout.tsx` はサーバーコンポーネントに戻し、`I18nProviderClient` で `MainLayout` をラップするだけのシンプルな構成に変更。これにより、クライアントコンポーネント内でのサーバーサイド `params` への直接アクセスがなくなり、警告が解消された。
- **開発ガイドラインの更新:**
  - `GEMINI.md` のコーディング規約セクションに、サーバーコンポーネントで `params` props を受け取る際の型定義の方法を追記。

### 発生した問題・課題
- i18nリファクタリング後、`urlMappingStrategy` が `'rewrite'` のままだったため、ロケールプレフィックスのないURLへのアクセス時に自動的なリダイレクトが行われず、コンテンツは表示されるもののURLが更新されない状態だった。
- クライアントコンポーネント (`'use client'`) 内でサーバーサイドから渡される `params` を直接利用していたため、Next.jsが警告を出力していた。

### 解決策
- `urlMappingStrategy` を `'redirect'` に変更することで、URLが常にロケールプレフィックスを持つように強制した。
- コンポーネントの関心を分離するリファクタリングを実施。`params` を受け取る親レイアウトをサーバーコンポーネントのままにし、状態を持つUI部分をクライアントコンポーネントとして切り出すことで、propsの受け渡しを適切に行った。

### 得られた知見・次のアクション
- `next-international` において、URLにロケールプレフィックスを一貫して表示させたい場合は、`urlMappingStrategy: 'redirect'` が適切な選択肢であることを学んだ。
- Next.js (App Router) では、サーバーコンポーネントとクライアントコンポーネントの境界を明確に意識し、propsの受け渡しを設計することが、警告の抑制とパフォーマンスの最適化につながることを再確認した。

---

## 2025-11-10

### 担当者
- Jules

### 実装内容
- **i18nミドルウェアの不具合修正:**
  - `next-international` へのリファクタリング後にページが開けなくなっていた問題を修正。
  - **ミドルウェアの作成:** `src/middleware.ts` を新規作成し、`createI18nMiddleware` を設定。これにより、リクエストが適切なロケールパス (`/ja`, `/en`) に正しくルーティングされるようになった。
  - **競合の解消:** ルートレイアウト (`src/app/layout.tsx`) に残っていた古い `LanguageProvider` を削除。
  - **不要ファイルの削除:** 旧i18n実装の `src/contexts/LanguageProvider.tsx` を削除し、コードベースをクリーンアップ。

### 発生した問題・課題
- i18nの大規模リファクタリング後、ルーティングを処理するMiddlewareが存在しなかったため、パスベースのルーティングが機能せず、全ページで404エラーが発生していた。
- 古い `LanguageProvider` が新しい `I18nProviderClient` と競合する可能性があった。

### 解決策
- `next-international` の要件に従い、必須であるルーティングMiddlewareを追加した。
- 不要になった古いContext関連のコードを完全に削除し、競合の可能性を排除した。

### 得られた知見・次のアクション
- `next-international` のようなパスベースのi18nライブラリを導入する際は、リクエストを振り分けるためのMiddlewareの実装が不可欠であることを理解した。
- 大規模なリファクタリング後は、関連する古いコードが残存していないか、依存関係を念入りに確認することが品質保証の観点から重要である。

---

## 2025-11-10

### 担当者
- Jules

### 実装内容
- **国際化 (i18n) の本格リファクタリング:**
  - **ライブラリ導入:** Next.js 14 (App Router) と親和性の高い `next-international` を導入し、国際化の基盤を構築。
  - **翻訳ファイルの外部化:** `src/i18n/lang/ja.json` と `src/i18n/lang/en.json` を作成し、これまでコンポーネント内にハードコーディングされていた全てのUIテキスト（日本語・英語）を外部ファイルに分離。
  - **i18nプロバイダーの設定:** `src/app/[lang]/layout.tsx` に `I18nProviderClient` を設定し、アプリケーション全体で翻訳が利用できるように構成。
  - **コンポーネントのリファクタリング:** 以下のコンポーネント群を対象に、ハードコードされたテキストを `next-international` が提供するフック (`useI18n`, `getI18n` など) を使った動的なテキスト取得に全面的に書き換え。
    - `Header`, `Footer`, `Sidebar`
    - `Home (page.tsx)`, `apps/page.tsx`, `contact/page.tsx`
    - `BmiCalculator`, `BmrCalculator`, `LoanSimulator`, `UnitConverter`
    - `app-card.tsx`
  - **既存の言語管理ロジックの削除:** `LanguageProvider` や各コンポーネント内の独自言語判定ロジックを削除し、`next-international` の機能に統一。

### 発生した問題・課題
- リファクタリング対象のファイル数が多く、コンポーネントの種類（サーバー/クライアント）によって使用するフックが異なる (`getI18n` vs `useI18n`) ため、注意深い作業が求められた。
- `UnitConverter.tsx` が当初見当たらず混乱したが、再度ファイルリストを確認して発見し、無事リファクタリングを完了できた。

### 解決策
- 各コンポーネントの `'use client'` の有無を基準に、適切なi18nフックを選択して適用した。
- ファイルが見つからない問題に対しては、`ls`コマンドでディレクトリ構造を再確認し、冷静に対処した。

### 得られた知見・次のアクション
- `next-international` を利用することで、App Router環境におけるi18n対応を、サーバーコンポーネントとクライアントコンポーネントの両方で効率的に実装できることを確認した。
- 大規模なリファクタリング作業では、対象ファイルをリスト化し、一つずつ着実に作業を進める計画性が重要であることを再認識した。

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
  - `src/app/[lang]/layout.tsx` を更新し、デスクトップでは2カラム（サイドバー＋メインコンテンツ）、モバイルではハンガーメニューで開閉するサイドバーレイアウトを実装した。
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
