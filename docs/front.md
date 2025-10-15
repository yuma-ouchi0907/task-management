## Next.js のプロジェクト立ち上げ方法(memo)

```bash
# プロジェクトを立ち上げたいフォルダ配下で以下コマンドを実行
# 上記コマンドを実行すると、TypeScriptを使用するかなどの質問がされる
npx create-next-app@latest プロジェクト名
```

## フォルダ構成

- **app/**

  - この配下のディレクトリが URL ルーティングに対応（例: `app/tasks/` → `/tasks`）
  - `layout.tsx`: 全ページ共通のレイアウト（例：<Header /> の表示など）
  - `page.tsx`: ルート（ホーム）画面の本体
  - `@modal/`: 並列ルート（モーダル）を管理する専用ディレクトリ

- **app/tasks/**

  - タスク一覧など、タスク機能に関するページを格納
  - `page.tsx`: タスク一覧画面（例：/tasks）
  - `types.ts`: タスク機能に関する型定義（Task 型など）
  - `_components/`: タスク画面専用の UI コンポーネント（例：TaskCard, TaskForm）

- **app/@modal/tasks/[taskid]/**

  - 特定のタスク詳細をモーダルで表示する並列ルート
  - `[taskid]/page.tsx`: URL 付きモーダル（例：/tasks?modal=abc123）

- **components/**

  - アプリ全体で使いまわせる汎用コンポーネント（例：Header, Modal, Button など）

- **hooks/**

  - カスタムフックを定義するディレクトリ（例：useTaskData, useModalState など）

- **types/**

  - アプリケーション全体で共通して利用する型定義を格納（例：User, ApiResponse, Error など）

- **utils/**

  - 日付の整形やデータ変換など、汎用的な関数群を格納するユーティリティディレクトリ

- **styles/**

  - グローバル CSS や Tailwind のベース設定を管理
  - `globals.css`: Tailwind の @import 設定と全体スタイル（テーマカラーなど）

- **public/**

  - 静的ファイル（画像、フォントなど）を格納（例：public/images/）

---

## コード品質ツールについて

このプロジェクトでは、コードの品質と可読性を保つために **ESLint** と**Prettier** を導入

- **ESLint**: コードの「品質」を保つ（構文チェックなど）
- **Prettier**: コードの「整形」を行う（フォーマットを統一）

---

## ESLint

### 概要

- JavaScript/TypeScript の構文チェックやルール違反を検出するツール
- バグを早期に見つけたり、コードスタイルを揃えるのに役立つ

### 設定

- Next.js プロジェクトを作成すると、以下が自動で設定される
  - `eslint` と `eslint-config-next` が devDependencies に追加される
  - `eslint.config.mjs` ファイルが作成される
- VSCode 拡張機能: **dbaeumer.vscode-eslint**

### 実行方法

```bash
npm run lint       # チェックのみ
npx eslint . --fix # 自動修正あり
```

## Prettier

### 概要

- コードの「フォーマット」を自動で整えるツール

### 設定

1. package.json があるフォルダで以下を実行
   `npm install -D prettier prettier-plugin-tailwindcss`
2. .prettierrc を作成（整形ルールを記載）
3. .prettierignore を作成（整形対象から除外するファイルを指定）
4. VSCode 拡張機能: **esbenp.prettier-vscode**

### 実行方法

```bash
npx prettier --check . # 整形が必要か確認
npx prettier --write . # 実際に整形
```
