# GEMINI.md - 便利計算ツールボックス 開発ガイド

このドキュメントは、AIアシスタント（Google Gemini）が「便利計算ツールボックス」プロジェクトの開発を行う際のガイドラインを定めたものです。開発作業を開始する前に、必ずこのドキュメントの内容を理解してください。

## 1. プロジェクト概要

**目的:** 日常の様々な計算ニーズを一つのウェブサイトで満たす、高速で直感的なUI/UXを持つツールボックスを提供する。
**ターゲット:** スマートフォンとPCのウェブブラウザからアクセスする一般ユーザー。
**技術的特徴:**
- Next.js (App Router) を用いたサーバーサイドレンダリング(SSR)と静的サイト生成(SSG)の活用。
- ダークモード、国際化 (i18n) 対応。
- localStorageを利用したユーザー入力値の永続化。

## 2. 遵守すべき基本原則

1.  **要件定義の遵守:** すべての実装は、提供された「要件定義書」「外部設計書」「内部設計書」に厳密に従ってください。不明な点がある場合は、ユーザーに確認を求めてください。
2.  **ディレクトリ構成の維持:** `internal_design_v1.1.txt`に定義されたディレクトリ構成を必ず維持してください。新しいファイルを作成する際は、適切な場所に配置する必要があります。
3.  **コンポーネント設計思想:**
    *   **Atomic Design:** コンポーネントは `Atoms`, `Molecules`, `Organisms` の粒度で設計・実装します。
        *   `components/ui/`: **Atoms** (Shadcn/uiが生成する最小単位のUI部品)
        *   `components/organisms/`: **Organisms** (機能単位で自立したUIパーツ)
    *   **関心の分離:** 計算ロジックはUIコンポーネントから完全に分離し、`/lib/calculators/` 内のユーティリティ関数として実装してください。UIコンポーネントは、状態管理とUIのレンダリングに専念します。
4.  **状態管理:**
    *   **ローカル状態:** `useState`, `useReducer` を使用します。
    *   **グローバル状態:** `React Context API` を使用します（例: `ThemeProvider`）。大規模な状態管理ライブラリ（Reduxなど）は導入しません。
5.  **コーディング規約:**
    *   **TypeScript:** 静的型付けを最大限に活用し、`any` 型の使用は避けてください。
    *   **Next.js App Router の props:** `params` のようなサーバーコンポーネントのpropsは、以下のように型付けしてください。
        ```typescript
        (props: { params: Promise<{ lang: string }> })
        ```
    *   **Prettier:** コードフォーマットはPrettierに準拠します。
    *   **ESLint:** 設定済みのESLintルールに従ってください。
6.  **開発ログの記録:**
    *   開発完了後、実装した内容、発生した問題と解決策、得られた知見などを必ずルートディレクトリの `DEVELOPMENT_LOG.md` に追記してください。これはプロジェクトの継続的な改善に不可欠なプロセスです。

## 3. 技術スタック

| 分類             | 技術            | 役割・ルール                                               |
| ---------------- | --------------- | ---------------------------------------------------------- |
| フレームワーク     | Next.js (App Router) | サイト全体の構築、`/[lang]/...` のパスベースルーティング  |
| 言語             | TypeScript      | 型安全性の確保                                             |
| スタイリング     | Tailwind CSS    | ユーティリティファーストのCSS設計                          |
| UIコンポーネント | Shadcn/ui       | アクセシブルで一貫性のあるUI部品のベースとして使用         |
| アニメーション   | Framer Motion   | 軽快なUI/UX向上のためのインタラクションに使用            |

## 4. 主なファイル・ディレクトリ構成

```
.
├── /app
│   ├── /[lang]                 # 国際化対応の動的ルート
│   │   ├── (calculators)       # 計算機ページのグループ
│   │   │   ├── bmi-calculator/page.tsx
│   │   │   └── ...
│   │   ├── layout.tsx          # メインレイアウト
│   │   └── page.tsx            # トップページ
│   └── global.css
├── /components
│   ├── /ui/                    # (Atoms) Shadcn/uiによるUI部品
│   └── /organisms/             # (Organisms) 複合コンポーネント
│       ├── Header.tsx
│       └── calculators/
│           └── BmiCalculator.tsx
├── /contexts                   # React Contextの定義
│   └── ThemeProvider.tsx
├── /hooks                      # カスタムフック
│   └── useLocalStorage.ts
├── /lib
│   ├── /calculators/           # ★計算ロジックはここに集約
│   │   ├── bmi.ts
│   │   ├── bmr.ts
│   │   ├── loan.ts
│   │   └── index.ts            # バレルファイル
│   └── utils.ts
└── DEVELOPMENT_LOG.md          # ★開発ログ
```

## 5. 実装時のチェックリスト

- [ ] 新しい計算ツールを追加する際、計算ロジックは `/lib/calculators/` に作成したか？
- [ ] UIコンポーネントは `/components/organisms/calculators/` に作成したか？
- [ ] ルーティングは `/app/[lang]/(calculators)/` 内に設定したか？
- [ ] `useLocalStorage`フックを使用して入力値を永続化する処理を実装したか？
- [ ] ダークモードに対応しているか？（Tailwind CSSの`dark:`プレフィックス）
- [ ] 国際化対応は行われているか？（テキストはハードコーディングせず、i18nライブラリ経由で取得）
- [ ] 開発完了後、`DEVELOPMENT_LOG.md` に記録を残したか？
