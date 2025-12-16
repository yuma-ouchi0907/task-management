export function validateTaskForm(input: {
  title: string;
  startDate?: string;
  endDate?: string;
  dueDate?: string;
}) {
  const errors: Record<string, string> = {};

  if (!input.title.trim()) errors.title = "タイトルを入力してください。";
  if (!input.startDate) errors.startDate = "開始日を選択してください。";
  if (!input.endDate) errors.endDate = "終了日を選択してください。";
  if (!input.dueDate) errors.dueDate = "締切日を選択してください。";

  return errors;
}
