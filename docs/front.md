## Next.jsのプロジェクト立ち上げ方法(memo)
```
# プロジェクトを立ち上げたいフォルダ配下で以下コマンドを実行
# 上記コマンドを実行すると、TypeScriptを使用するかなどの質問がされる
npx create-next-app@latest プロジェクト名
```

## フォルダの構成
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

