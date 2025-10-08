## Next.jsのプロジェクト立ち上げ方法(memo)
```bash
# プロジェクトを立ち上げたいフォルダ配下で以下コマンドを実行
# 上記コマンドを実行すると、TypeScriptを使用するかなどの質問がされる
npx create-next-app@latest プロジェクト名
```

## フォルダ構成
- **app/**
  - この配下のフォルダが URL となる（例: `app/tasks/` → `/tasks`）
  - `layout.tsx`: 全ページ共通レイアウト（Header, Footer などを定義）
  - `page.tsx`: メインページ本体

- **app/tasks/**  (例)
  - タスク関連のページ (`/tasks`)
  - `types.ts`: タスク機能専用の型定義
  - `_components/`: タスク機能専用のコンポーネント

- **components/**
  - 汎用的なコンポーネント（Button, Card, Modal など）

- **types/**
  - アプリ全体で共通して利用する型（例: User, ApiResponse など）

- **styles/**
  - `globals.css`: Tailwind のベース設定 & 全体スタイル

---

## コード品質ツールについて
このプロジェクトでは、コードの品質と可読性を保つために **ESLint** と**Prettier** を導入 
- **ESLint**: コードの「品質」を保つ（構文チェックなど）
- **Prettier**: コードの「整形」を行う（フォーマットを統一）

---

## ESLint

### 概要
- JavaScript/TypeScriptの構文チェックやルール違反を検出するツール
- バグを早期に見つけたり、コードスタイルを揃えるのに役立つ

### 設定
- Next.jsプロジェクトを作成すると、以下が自動で設定される
  - `eslint` と `eslint-config-next` が devDependenciesに追加される
  - `eslint.config.mjs` ファイルが作成される
- VSCode拡張機能: **dbaeumer.vscode-eslint**

### 実行方法
```bash
npm run lint       # チェックのみ
npx eslint . --fix # 自動修正あり
```

## Prettier

### 概要
- コードの「フォーマット」を自動で整えるツール

### 設定
1. package.jsonがあるフォルダで以下を実行
`npm install -D prettier prettier-plugin-tailwindcss`
2. .prettierrcを作成（整形ルールを記載）
3. .prettierignoreを作成（整形対象から除外するファイルを指定）
4. VSCode拡張機能: **esbenp.prettier-vscode**

### 実行方法
```bash
npx prettier --check . # 整形が必要か確認
npx prettier --write . # 実際に整形
```