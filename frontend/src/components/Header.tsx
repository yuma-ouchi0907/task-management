export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 w-[dvh100] items-center justify-between border-b border-[var(--border-primary)] bg-[var(--bg-base)] px-4 py-2">
      <h1 className="cursor-default text-3xl leading-12 font-bold">
        タスク管理
      </h1>
    </header>
  );
}
