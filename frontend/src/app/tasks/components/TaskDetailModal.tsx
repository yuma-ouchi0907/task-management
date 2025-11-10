import { TaskType } from "../type";

type TaskDetailModalType = {
  task: TaskType;
  onCloseModal: () => void;
};

export default function TaskDetailModal({
  task,
  onCloseModal,
}: TaskDetailModalType) {
  return (
    <>
      <div className="relative z-10" role="dialog" aria-modal="true">
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className="flex min-h-full items-center justify-center p-4"
            onClick={onCloseModal}
          >
            <div
              // modalの内側をクリックしても閉じないようにする
              onClick={(e) => e.stopPropagation()}
              className="relative transform overflow-hidden rounded-lg bg-[var(--bg-surface2)] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      id="dialog-title"
                      className="text-base font-semibold text-[var(--text-primary)]"
                    >
                      {task.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-[var(--text-primary)]">
                        {task.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
