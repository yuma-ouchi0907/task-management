# タスク管理アプリ

## 概要
タスクの管理、編集、削除、追加ができるアプリです。

## 使用技術
### フロントエンド
- TypeScript
    - 型チェックによって早期にバグを検知できる。それによって修正コストを抑えることができる。
    - 型があることでプログラムの可読性向上
- Next.js(React)
    - TypeScriptの親和性
    - 需要が高い
    - Reactはコンポーネント指向で再利用性が高い
- TailwindCSS

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


