import Header from "@/components/Header";
import "./globals.css";

type RootLayoutProps = {
  // React.ReactNodeは「Reactで使えるものならなんでもOK！」って意味の型.
  children: React.ReactNode;
};

export default function RootLayout({
  // childrenは各ページの中身が入る場所.
  children,
}: RootLayoutProps) {
  return (
    <html lang="ja">
      <body>
        <Header /> {/* 全ページ共通のヘッダー */}
        <main>{children}</main>
      </body>
    </html>
  );
}
