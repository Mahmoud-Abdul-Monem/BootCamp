import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";

type Props = {};

export default function TaskList({ }: Props) {
    const { tasks, searchQuery } = useTasks();

    const query = searchQuery.trim().toLowerCase();

    const filteredWithIndex = tasks
        .map((task, originalIndex) => ({ task, originalIndex }))
        .filter(({ task }) => {
            if (!query) return true;
            const matchTitle = task.title.toLowerCase().includes(query);
            const matchDesc = (task.desc ?? "").toLowerCase().includes(query);
            return matchTitle || matchDesc;
        });

    if (tasks.length === 0) {
        return (
            <div className="bg-white rounded-[12px] border border-gray-100 p-6 text-center text-sm text-[#464555]">
                No tasks yet. Add your first task above!
            </div>
        );
    }

    if (filteredWithIndex.length === 0) {
        return (
            <div className="bg-white rounded-[12px] border border-gray-100 p-6 text-center text-sm text-[#464555]">
                No matching tasks found for "{searchQuery}".
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {filteredWithIndex.map(({ task, originalIndex }) => (
                <TaskItem
                    key={originalIndex}
                    task={task}
                    index={originalIndex}
                />
            ))}
        </div>
    );
}