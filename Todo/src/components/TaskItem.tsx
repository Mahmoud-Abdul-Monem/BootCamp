import { useState, type FormEvent } from "react";
import editButton from "../assets/Container.svg";
import deleteButton from "../assets/delete.svg";
import { useTasks } from "../context/TaskContext";
import type { ITask } from "../types/task";

type Props = {
    task: ITask;
    index: number;
};

export default function TaskItem({ task, index }: Props) {
    const { toggleTask, deleteTask, updateTask } = useTasks();

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDesc, setEditDesc] = useState(task.desc ?? "");

    const handleStartEdit = () => {
        setEditTitle(task.title);
        setEditDesc(task.desc ?? "");
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setEditTitle(task.title);
        setEditDesc(task.desc ?? "");
        setIsEditing(false);
    };

    const handleSaveEdit = (e: FormEvent) => {
        e.preventDefault();
        if (!editTitle.trim()) return;
        updateTask(index, editTitle, editDesc);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <form
                onSubmit={handleSaveEdit}
                className="bg-white p-4 flex flex-col gap-2 rounded-[12px] border border-[#4F46E5]/40"
            >
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Task title..."
                    className="w-full text-[14px] font-medium text-[#131B2E] px-2.5 py-1.5 rounded-lg border border-slate-200 outline-0"
                />
                <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    placeholder="Description (optional)..."
                    className="w-full text-[12px] text-[#464555] px-2.5 py-1.5 rounded-lg bg-[#F2F3FF] outline-0"
                />
                <div className="flex justify-end gap-2 mt-1">
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-3 py-1 text-xs rounded-lg border border-slate-200 text-[#464555] hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-3 py-1 text-xs rounded-lg bg-[#4F46E5] text-white hover:opacity-95 cursor-pointer"
                    >
                        Save
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div className="bg-white p-4 flex items-center justify-between gap-4 rounded-[12px] border border-gray-100">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={() => toggleTask(index)}
                    className="w-4 h-4 shrink-0 rounded bg-[#faf8ff] checked:bg-[#4F46E5] cursor-pointer"
                />

                <div className="flex flex-col justify-center gap-0.5 min-w-0">
                    <h5
                        className={`text-[14px] font-medium ${task.isDone
                                ? "line-through text-slate-400"
                                : "text-[#131B2E]"
                            }`}
                    >
                        {task.title}
                    </h5>
                    {task.desc && (
                        <p
                            className={`text-[12px] whitespace-nowrap min-[728px]:whitespace-normal truncate min-[728px]:overflow-visible ${task.isDone
                                    ? "line-through text-slate-400"
                                    : "text-[#464555]"
                                }`}
                        >
                            {task.desc}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
                <button
                    type="button"
                    onClick={handleStartEdit}
                    className="p-1 hover:bg-gray-100 cursor-pointer rounded-md"
                >
                    <img className="h-4 w-4" src={editButton} alt="Edit" />
                </button>

                <button
                    type="button"
                    onClick={() => deleteTask(index)}
                    className="p-1 hover:bg-red-50 cursor-pointer rounded-md"
                >
                    <img className="h-4 w-4" src={deleteButton} alt="Delete" />
                </button>
            </div>
        </div>
    );
}