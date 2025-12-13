import { useRouter } from "next/navigation"; // ← 追加！
import { PlusIcon } from "@/app/tasks/components/icons";
import PrimaryButton from "@/app/tasks/components/ui/PrimaryButton";

export default function AddButton() {
  const router = useRouter();

  return (
    <PrimaryButton
      onClick={() => router.push("/tasks/new")}
      className="h-10 w-32"
    >
      <p>タスク追加</p>
      <PlusIcon />
    </PrimaryButton>
  );
}
