# タスク管理アプリ

## 概要
タスクの管理、編集、削除、追加ができるアプリです。

## 使用技術
### フロントエンド
- Next.js(React)
- TypeScript
- TailwindCSS

### バックエンド
- FastAPI(Python)

## 環境構築
### リポジトリ取得とフロントエンド起動
```
git clone https://github.com/yuma-ouchi0907/task-management.git
cd task-management/frontend
npm install # 依存関係のインストール
npm run dev # 開発サーバーを起動(http://localhost:3000 にアクセスして動作確認)
```

## Node.jsとnpmの管理方法
### Voltaを使用
**必ずVoltaをインストールした上で開発してください。**
#### 選定理由
- Rust製のため他のバージョン管理ツールより高速だから
- `volta pin`でプロジェクトメンバーのバージョンを容易に揃えることができるから

#### Voltaインストール
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

#### Node.js/npmのインストール(こちらの処理は不要)
```
volta install node # 最新の安定版Node.jsがインストールされる
volta install npm@11.2.0 # npm v11.2.0をインストール
```

#### プロジェクトでのバージョン固定(こちらの処理は不要)
```
cd frontend
volta pin node@22.20.0
```
### Next.jsのプロジェクト立ち上げ方法(これはやらない)
```
npx create-next-app@latest プロジェクト名
上記コマンドを実行すると、TypeScriptを使用するかなどの質問がされる
```
