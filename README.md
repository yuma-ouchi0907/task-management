# タスク管理アプリ

## 概要
タスクの管理、編集、削除、追加ができるアプリです。

## 一覧画面
<img width="1710" height="899" alt="スクリーンショット 2025-12-17 0 19 45" src="https://github.com/user-attachments/assets/5f5539b6-9d4f-416d-a038-e9b7ef262a4a" />

## タスク追加画面
<img width="1710" height="899" alt="スクリーンショット 2025-12-17 0 21 03" src="https://github.com/user-attachments/assets/e658dc6c-b9c2-454b-97ca-94256844394b" />

### エラー画面
<img width="1710" height="899" alt="スクリーンショット 2025-12-17 0 22 16" src="https://github.com/user-attachments/assets/d4d80a29-12eb-4c84-9b84-4525114a4fd4" />

## タスク詳細画面
<img width="1710" height="899" alt="スクリーンショット 2025-12-17 0 23 32" src="https://github.com/user-attachments/assets/1a1eb72e-5e25-4b61-8ebb-fd3def642130" />

## タスク削除画面
<img width="1710" height="899" alt="スクリーンショット 2025-12-17 0 24 29" src="https://github.com/user-attachments/assets/5e83bf56-9dd0-40a0-82c8-e1673b1109a1" />

## 使用技術

### フロントエンド
- TypeScript:"^5"
    - 型チェックによって早期にバグを検知できる。それによって修正コストを抑えることができる。
    - 型があることでプログラムの可読性向上
- Next.js:"15.5.4"(React:"19.1.0")
    - TypeScriptの親和性
    - 需要が高い
    - Reactはコンポーネント指向で再利用性が高い
- TailwindCSS:"^4"
- shadcn/ui
- lucide-react: "^0.552.0"

### バックエンド
- FastAPI(Python)(未実装）

### コード整形/コードフォーマット
- Prettier(保存時に自動適用されるようvscode設定済み)
- ESLint(コード品質のチェック)

## Node.jsとnpmの管理方法
### Voltaを使用
#### Voltaとは
- Node.jsやJavaScriptのパッケージマネージャ(npm, yarnなど)のバージョンをシンプルに管理するためのコマンドラインツール

#### 選定理由
- Rust製のため他のバージョン管理ツールより高速だから
- `volta pin`でプロジェクトメンバーのバージョンを容易に揃えることができるから

**必ずVoltaをインストールした上で開発してください。**
#### Voltaインストール方法
- macOS(Homebrew)
```
brew install volta
volta -v # バージョンが表示されればOK
```
- windows(winget)
```
winget install Volta.Volta
volta -v # バージョンが表示されればOK
```

#### Node.js/npmのインストール
```
volta install node # 最新の安定版Node.jsがインストールされる
```

## 環境構築
### リポジトリ取得とフロントエンド起動
```
git clone https://github.com/yuma-ouchi0907/task-management.git
cd task-management/frontend
npm install # 依存関係のインストール
npm run dev # 開発サーバーを起動(http://localhost:3000 にアクセスして動作確認)
```


